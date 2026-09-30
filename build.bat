@cd /d "%~dp0pack" && (if not exist "..\output" mkdir "..\output") && (if exist "..\output\pack.zip" del /q "..\output\pack.zip") && 7z a -tzip "..\output\pack.zip" ".\*"
