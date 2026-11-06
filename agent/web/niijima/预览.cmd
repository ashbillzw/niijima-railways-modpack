@echo off
chcp 65001 >nul
echo 活动页：http://127.0.0.1:18761/events/feedback-v1.6/
echo 独立反馈页：http://127.0.0.1:18761/feedback/
echo 按 Ctrl+C 停止本地预览。
python -m http.server 18761 --bind 127.0.0.1 --directory "%~dp0dist"
