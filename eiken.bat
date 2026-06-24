@echo off
title Eiken Speaking Simulator
echo ========================================
echo   Eiken Speaking Simulator
echo ========================================
echo.
echo このbatファイルと同じフォルダを
echo localhost:8080 でサーブします。
echo ブラウザが自動的に開きます。
echo 終了時はこの窓を閉じてください。
echo.

REM batファイル自身のディレクトリを取得
set "SRCDIR=%~dp0"
set "SRCDIR=%SRCDIR:~0,-1%"

REM WindowsパスをWSLパスに変換
for /f "delims=" %%i in ('wsl wslpath "%SRCDIR%"') do set "WSLPATH=%%i"

echo Serving: %WSLPATH%
echo.

start "" "http://localhost:8080/index.html"
wsl python3 -m http.server 8080 --directory "%WSLPATH%"
