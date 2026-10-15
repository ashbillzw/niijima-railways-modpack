param([ValidateSet('pack', 'test', 'all')][string]$Mode = 'pack')

$ErrorActionPreference = 'Stop'
$Repo = Split-Path $PSScriptRoot -Parent
$Build = Join-Path $Repo 'build'
$Cache = Join-Path $Build 'cache'
$Staging = Join-Path $Build 'staging'
$Utf8 = New-Object System.Text.UTF8Encoding($false)

function Invoke-Checked($Program, [string[]]$Arguments) {
    & $Program @Arguments | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "$Program failed (exit $LASTEXITCODE)." }
}

function Read-Index($Pack) {
    Get-Content -LiteralPath (Join-Path $Pack 'modrinth.index.json') -Raw -Encoding UTF8 | ConvertFrom-Json
}

function Write-Index($Pack, $Index) {
    [IO.File]::WriteAllText((Join-Path $Pack 'modrinth.index.json'), ($Index | ConvertTo-Json -Depth 100), $Utf8)
}

function Test-CachedFile($Path, $Entry) {
    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) { return $false }
    if ((Get-Item -LiteralPath $Path).Length -ne $Entry.fileSize) { return $false }
    foreach ($algorithm in @('sha1', 'sha512')) {
        if ((Get-FileHash -LiteralPath $Path -Algorithm $algorithm).Hash -ne $Entry.hashes.$algorithm) { return $false }
    }
    return $true
}

function Get-CachedFile($Entry) {
    if ($Entry.hashes.sha512 -notmatch '^[a-fA-F0-9]{128}$' -or $Entry.hashes.sha1 -notmatch '^[a-fA-F0-9]{40}$') {
        throw "Missing or invalid index hashes: $($Entry.path)"
    }
    $file = Join-Path $Cache $Entry.hashes.sha512.ToLowerInvariant()
    if (Test-CachedFile $file $Entry) {
        Write-Host "Cache: $($Entry.path)"
        return $file
    }
    $partial = "$file.$([guid]::NewGuid().ToString('N')).part"
    try {
        # Try each listed mirror once; do not retry the same slow or failed source.
        foreach ($url in $Entry.downloads) {
            try {
                Write-Host "Download: $url"
                Invoke-WebRequest -Uri $url -OutFile $partial -UseBasicParsing -TimeoutSec 60
                if (-not (Test-CachedFile $partial $Entry)) { throw 'Downloaded size or hash does not match the index.' }
                Move-Item -LiteralPath $partial -Destination $file -Force
                return $file
            } catch {
                Write-Warning "$url : $($_.Exception.Message)"
            }
        }
        throw "Download failed: $($Entry.path). Put the matching file at $file and run again."
    } finally {
        if (Test-Path -LiteralPath $partial) { Remove-Item -LiteralPath $partial }
    }
}

function Expand-Index($Pack, $Index, [bool]$AllFiles) {
    $remaining = @()
    foreach ($entry in $Index.files) {
        $modrinth = @($entry.downloads | Where-Object { ([uri]$_).Host -eq 'cdn.modrinth.com' })
        if (-not $AllFiles -and $modrinth.Count -gt 0) {
            $entry.downloads = $modrinth
            $remaining += $entry
            continue
        }
        $path = [string]$entry.path
        if (-not $path -or $path -match '[:\\]' -or $path.StartsWith('/') -or @($path.Split('/') | Where-Object { $_ -in @('', '.', '..') }).Count) {
            throw "Invalid index path: $path"
        }
        $cached = Get-CachedFile $entry
        $target = Join-Path (Join-Path $Pack 'overrides') $path
        # Existing overrides take precedence during installation; preserve them.
        if (-not (Test-Path -LiteralPath $target)) {
            New-Item -ItemType Directory -Path (Split-Path $target -Parent) -Force | Out-Null
            Copy-Item -LiteralPath $cached -Destination $target
        }
    }
    $Index.files = $remaining
    Write-Index $Pack $Index
}

function Compress-Pack($Pack, $Name, $Work) {
    $archive = Join-Path $Work 'pack.zip'
    Push-Location -LiteralPath $Pack
    try { Invoke-Checked '7z' @('a', '-tzip', $archive, '.\*') }
    finally { Pop-Location }
    $destination = Join-Path $Build $Name
    Move-Item -LiteralPath $archive -Destination $destination -Force
    Write-Host "Built: $destination"
}

function Build-Pack($Branch, $Suffix, $Label, [string]$Kind) {
    $work = Join-Path $Staging ([guid]::NewGuid().ToString('N'))
    New-Item -ItemType Directory -Path $work -Force | Out-Null
    try {
        $pack = Join-Path $work 'pack'
        if ($Branch) {
            $tar = Join-Path $work 'source.tar'
            Invoke-Checked 'git' @('-C', $Repo, 'archive', '--format=tar', "--output=$tar", "refs/heads/$Branch", 'pack')
            Invoke-Checked '7z' @('x', $tar, "-o$work", '-y')
        } else {
            Copy-Item -LiteralPath (Join-Path $Repo 'pack') -Destination $pack -Recurse
        }
        $index = Read-Index $pack
        if ($Branch) {
            $version = [string]$index.versionId
            if ($Suffix -and -not $version.EndsWith($Suffix)) { $version += $Suffix }
            $index.versionId = $version
            $index.name = "新岛铁道 v$version$Label"
            $extension = if ($Kind -eq 'modrinth') { 'mrpack' } else { 'zip' }
            $name = "$($index.name).$extension"
            if ($name.IndexOfAny([IO.Path]::GetInvalidFileNameChars()) -ge 0) { throw "Invalid output name: $name" }
            Write-Index $pack $index
        } else {
            $name = if ($Kind -eq 'test') { 'pack-test.zip' } else { 'pack.zip' }
        }
        if ($Kind -in @('test', 'modrinth')) { Expand-Index $pack $index ($Kind -eq 'test') }
        Compress-Pack $pack $name $work
    } finally {
        # Only remove the unique staging directory created by this invocation.
        $resolved = [IO.Path]::GetFullPath($work)
        $boundary = [IO.Path]::GetFullPath($Staging).TrimEnd('\') + '\'
        if (-not $resolved.StartsWith($boundary, [StringComparison]::OrdinalIgnoreCase)) { throw "Unexpected staging path: $work" }
        Remove-Item -LiteralPath $resolved -Recurse -Force
    }
}

# Allow local, offline function tests without running the build entry point.
if ($MyInvocation.InvocationName -eq '.') { return }
try {
    $legacyOutput = Join-Path $Repo 'output'
    if (Test-Path -LiteralPath $legacyOutput) {
        Write-Warning "旧打包目录仍存在：$legacyOutput。当前产物在 build/，请删除旧 output/；脚本不会自动删除。"
    }
    Get-Command 7z -ErrorAction Stop | Out-Null
    $variants = @(
        @{ Branch = 'master'; Suffix = ''; Label = '' },
        @{ Branch = 'admin-1.6'; Suffix = '.a'; Label = ' 管理员版' },
        @{ Branch = 'ashbill-1.6'; Suffix = '.ab'; Label = ' AshBill版' },
        @{ Branch = 'fcl-1.6'; Suffix = '.f'; Label = ' 高兼容性版（手机可用）' }
    )
    if ($Mode -eq 'all') {
        foreach ($variant in $variants) {
            & git -C $Repo show-ref --verify --quiet "refs/heads/$($variant.Branch)"
            if ($LASTEXITCODE -ne 0) { throw "Local branch missing: $($variant.Branch)" }
        }
    }
    New-Item -ItemType Directory -Path $Build, $Cache, $Staging -Force | Out-Null
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    if ($Mode -eq 'all') {
        foreach ($variant in $variants) { Build-Pack $variant.Branch $variant.Suffix $variant.Label 'pack' }
        Build-Pack 'master' '.m' '' 'modrinth'
    } else {
        Build-Pack '' '' '' $Mode
    }
    exit 0
} catch {
    Write-Host "Build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
