@echo off
setlocal
cd /d "%~dp0"
title CHAP - OpenCode com Playwright MCP
where opencode >nul 2>&1
if errorlevel 1 (
  echo [ERRO] OpenCode nao encontrado. Instale o OpenCode e confira opencode --version.
  pause
  exit /b 1
)
echo [CHAP] Verifique o MCP com: opencode mcp list
echo [CHAP] Para testar o site, deixe INICIAR_SITE.cmd rodando em outra janela.
echo.
call opencode
if errorlevel 1 echo [ERRO] O OpenCode terminou com erro.
pause
