# CHAP - Playwright MCP pronto para OpenCode e VS Code

O projeto React foi mantido. Acrescentamos configuracoes de um servidor MCP oficial da Microsoft para automatizar o Chrome por meio de um agente de IA.

## Requisitos no seu computador (Windows)

- Node.js 20.19+ ou 22.12+ (Vite 7). Confirme com `node -v`.
- Google Chrome instalado (esta configuracao utiliza `--browser=chrome`).
- OpenCode instalado, se quiser usar o MCP pelo OpenCode. Alternativamente, use o chat de agente com MCP no VS Code.
- Internet na PRIMEIRA execucao do Playwright MCP: `npx` precisa obter `@playwright/mcp@latest` no npm; os arquivos do pacote MCP nao estao embutidos no ZIP.

## Iniciar o site (nao precisa do MCP para visualizar o site)

1. Extraia **todo** o arquivo ZIP, preservando a pasta `projetoDupla`.
2. Abra a pasta `projetoDupla`.
3. No Windows, clique duas vezes em **INICIAR_SITE.cmd**. Ele verifica se o Vite esta presente e, se nao estiver, tenta `npm.cmd install`.
4. Acesse a URL mostrada no terminal (normalmente `http://localhost:5173/`).

Tambem pode abrir um terminal na pasta do projeto e executar:

```powershell
npm.cmd install
npm.cmd run dev
```

**Observacao:** As dependencias originais `node_modules` foram mantidas no ZIP para aproveitar a instalacao existente no Windows. Se ocorrer um erro de dependencia, execute `npm.cmd install` para reconstruir a instalacao. Nao alteramos os arquivos React nem o `package.json`.

## Ativar o Playwright MCP no OpenCode

1. Abra um SEGUNDO terminal na pasta `projetoDupla` com o site rodando no primeiro terminal.
2. Execute `opencode mcp list` para verificar o servidor `playwright`.
3. Execute `opencode`, ou clique duas vezes em **INICIAR_OPENCODE.cmd**.
4. Peça ao agente: `Use o Playwright MCP para acessar http://localhost:5173, testar o menu, a selecao de produtos, o modal de compra e o FAQ. Teste tambem larguras de 375px, 768px e 1440px. Relate os resultados.`

O arquivo `opencode.json` na raiz ja configura o servidor. A configuracao segue o formato do OpenCode V1, tambem aceito pelo OpenCode V2 segundo a documentacao de migracao. Se sua versao do OpenCode apresentar erro de configuracao, consulte as documentacoes de MCP e migracao do OpenCode citadas abaixo.

## Usar o Playwright MCP no VS Code (opcional)

O arquivo `.vscode/mcp.json` ja esta pronto. Abra a pasta `projetoDupla` no VS Code e use um agente compativel com MCP (como o agente do GitHub Copilot). Na paleta de comandos, `MCP: List Servers` ou `MCP: Show Installed Servers`, dependendo da versao, permite iniciar/verificar o servidor.

**Importante:** Configurar `.vscode/mcp.json` nao habilita o MCP no terminal OpenCode. Para OpenCode, o arquivo relevante e `opencode.json` na raiz. Sao duas configuracoes para dois clientes diferentes; nao ha necessidade de usar ambos simultaneamente.

## O que e e o que NAO e esta integracao

- O MCP fica disponivel ao **assistente** (OpenCode/VS Code) para testes de navegador.
- O site React funciona normalmente com `npm run dev`, mesmo sem o MCP.
- Somente `npm run dev` **nao** inicia uma sessao de agente nem executa testes MCP. Para testes automatizados pelo agente, inicie o OpenCode e solicite o teste.
- O ZIP contem configuracao, nao inclui uma copia preinstalada do pacote npm do Playwright MCP. Nao foi possivel confirmar a conexao ao MCP no computador de destino.
- Isso nao cria um servidor MCP consumido pelos visitantes do site.

## Solucao de problemas

- `opencode nao encontrado`: instale o OpenCode e confirme `opencode --version` no terminal.
- `npx nao encontrado`: instale ou atualize o Node.js; reabra o terminal.
- `MCP disconnected` na primeira execucao: confirme internet, Chrome e `opencode mcp list` novamente depois de confirmar as permissoes; a obtencao do pacote pode demorar na primeira vez.
- PowerShell bloqueia `npm.ps1`: use `npm.cmd run dev` e `npm.cmd install`.
- Se a porta 5173 estiver ocupada, o Vite podera usar outra; informe ao agente a URL realmente exibida no terminal.

## Documentacao de referencia

- OpenCode (MCP V1): https://dev.opencode.ai/docs/mcp-servers/
- OpenCode V2 / migracao: https://opencode.ai/v2/docs/migrate-v1
- Playwright MCP oficial: https://github.com/microsoft/playwright-mcp
- VS Code MCP: https://code.visualstudio.com/docs/agent-customization/mcp-servers
