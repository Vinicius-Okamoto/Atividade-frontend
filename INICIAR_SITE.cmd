@echo off
setlocal
cd /d "%~dp0"
title CHAP - Servidor React (Vite)

where node.exe >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado. Instale Node.js 20.19+ ou 22.12+.
  pause
  exit /b 1
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo [ERRO] npm nao encontrado. Verifique a instalacao do Node.js.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo [INFO] Instalando dependencias do projeto...
  call npm.cmd install
  if errorlevel 1 (
    echo [ERRO] Nao foi possivel instalar as dependencias.
    pause
    exit /b 1
  )
)

echo.
echo [CHAP] Iniciando o site. Abra a URL exibida abaixo no navegador.
echo [CHAP] Para usar o MCP, abra outro terminal e execute: opencode
echo.
call npm.cmd run dev
if errorlevel 1 (
  echo.
  echo [ERRO] Falha ao iniciar o servidor. Experimente executar npm.cmd install.
)
pause
