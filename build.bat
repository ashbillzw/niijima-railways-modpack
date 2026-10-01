@echo off
cd /d "%~dp0"
python build.py
set "build_exit=%errorlevel%"
if not "%build_exit%"=="0" pause
exit /b %build_exit%
