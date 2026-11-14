param([int]$Port = 18762, [string]$MapHost = 'mc1.ashbill.com')
$ErrorActionPreference = 'Stop'
$runtime = Join-Path $env:TEMP 'niijima-v3-tools'
$nginx = Join-Path $runtime 'nginx-1.30.6'
if (!(Test-Path "$nginx/nginx.exe")) {
    New-Item -ItemType Directory -Force $runtime | Out-Null
    Invoke-WebRequest 'https://nginx.org/download/nginx-1.30.6.zip' -OutFile "$runtime/nginx.zip"
    Expand-Archive "$runtime/nginx.zip" -DestinationPath $runtime -Force
}
$dist = (Join-Path $PSScriptRoot 'dist').Replace('\', '/')
$config = @"
worker_processes 1;
events { worker_connections 256; }
http {
    include mime.types;
    default_type application/octet-stream;
    charset utf-8;
    access_log off;
    server {
        listen 127.0.0.1:$Port;
        location = / { return 302 /v3/; }
        location = /synology-root/minecraft/assets/rail-network/2026-11-14-plan.svg {
            alias "$dist/../deploy/rail-network/2026-11-14-plan.svg";
        }
        location /v3/ {
            alias "$dist/";
            index index.html;
            ssi on;
            add_header Cache-Control "no-store";
        }
        location / {
            limit_except GET { deny all; }
            proxy_pass https://${MapHost}:25572;
            proxy_set_header Host mc1.ashbill.com;
            proxy_ssl_server_name on;
            proxy_ssl_name mc1.ashbill.com;
        }
    }
}
"@
[IO.File]::WriteAllText("$nginx/conf/niijima.conf", $config, [Text.UTF8Encoding]::new($false))
$prefix = $nginx.Replace('\', '/') + '/'
& "$nginx/nginx.exe" -p $prefix -c conf/niijima.conf -t
if ($LASTEXITCODE -ne 0) { throw 'Nginx configuration check failed.' }
$runningPid = Get-Content "$nginx/logs/nginx.pid" -ErrorAction SilentlyContinue
if ($runningPid -and (Get-Process -Id $runningPid -ErrorAction SilentlyContinue)) {
    & "$nginx/nginx.exe" -p $prefix -c conf/niijima.conf -s reload
    if ($LASTEXITCODE -ne 0) { throw 'Nginx reload failed.' }
} else {
    Start-Process "$nginx/nginx.exe" -ArgumentList '-p', $prefix, '-c', 'conf/niijima.conf' -WorkingDirectory $nginx -WindowStyle Hidden
}
Write-Host "http://127.0.0.1:$Port/v3/"
Write-Host "Stop: & '$nginx/nginx.exe' -p '$prefix' -c conf/niijima.conf -s quit"
