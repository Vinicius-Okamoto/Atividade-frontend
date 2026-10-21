# CHAP — Landing Page de Produto

CHAP é uma marca fictícia de protetor labial com identidade urbana, visual robusto e proposta de cuidado cotidiano simples. Projeto 100% client-side, sem backend, APIs, cobrança ou coleta de dados pessoais.

## Integrantes
- [Nome do integrante 1]
- [Nome do integrante 2, se houver]

## Como executar
Requer Node.js 20.19+ ou 22.12+ e npm.

```sh
npm install
npm run dev
```

No PowerShell com scripts bloqueados, use `npm.cmd` no lugar de `npm`.

## Produção
```sh
npm run build
npm run preview
```

## Funcionalidades
- Navegação por âncoras e menu mobile com fechamento após seleção.
- Três variantes com estado compartilhado entre coleção e compra.
- Pedido unitário de R$ 24,90 e kit de R$ 64,90, ambos ilustrativos.
- Modal nativo com contenção de foco, Escape, fechamento pelo fundo, retorno de foco e confirmação fictícia. É possível iniciar outra simulação após fechar.
- FAQ controlado por botões acessíveis, com um item aberto por vez.
- Layout responsivo, foco visível e respeito à redução de movimento.

## Jornada de construção
### Ideia inicial
O PRD fornecido define o nome, produto e direção de arte. [Integrantes: registrar como a proposta surgiu, alternativas consideradas e motivos da escolha.]

### Pesquisa e referências
Referências efetivamente consultadas: `PRD_CHAP_Landing_Page.md` e `Moodboard da Marca CHAP.png`, fornecidos pelo usuário. O moodboard orientou as cores, o peso e inclinação tipográficos e a apresentação dos tubos. A montagem completa não foi usada como interface.

### Ferramentas utilizadas
React, Vite, CSS Modules, Node.js, npm e Nemotron 3 ultra free. [Integrantes: informar editor e outras ferramentas realmente utilizadas.]

### Arquitetura
Adaptação didática de Feature-Sliced Design (FSD):
- `app`: composição da aplicação e estilos globais.
- `pages/landing`: composição da página e fonte única dos estados de variante e oferta.
- `widgets`: header, hero e seções de conteúdo. As seções editoriais estão agrupadas em `content` para reduzir fragmentação; cada seção é um componente funcional.
- `features`: seleção de variante e simulação de compra.
- `entities/product/model`: dados locais dos três produtos e preço do kit.
- `shared`: representação reutilizável do tubo e formatação monetária.

As dependências apontam para camadas inferiores. Não há roteador nem gerenciador de estado externo.

### Uso de IA
A ferramenta utilizada para o desenvolvimento da aplicação, foi o Nemotron 3 ultra free, onde ele seguiu instruções de um prd passado pelo usuario.

### Evolução da solução
O diretório inicial estava vazio. A implementação adotou os tokens do PRD, fontes de sistema robustas e representações CSS locais dos tubos, sem depender de imagens remotas. Hero assimétrico, divisórias editoriais e acentos laranja traduzem a referência em uma página navegável. O modal usa `dialog` nativo para tratamento de teclado e foco. O PowerShell bloqueia `npm.ps1` neste ambiente; os comandos foram executados com `npm.cmd`.

### Resultado final
A implementação inclui todas as seções e os fluxos demonstrativos descritos. [Integrantes: registrar avaliação pessoal, aprendizados, ajustes após apresentação e melhorias desejadas.]

## Créditos de imagens e referências
Os produtos e a superfície gráfica são ilustrações em CSS criadas nesta implementação. Nenhuma fotografia de terceiros ou fonte remota foi incluída. O moodboard foi consultado como referência; seu arquivo não foi redistribuído. O logo é texto estilizado, sem reprodução vetorial exata. É opcional substituir os tubos por mockups locais autorizados em `public/assets/products/`, acrescentando créditos e textos alternativos.

## Verificações realizadas
`npm.cmd run build` concluído com sucesso. Verificações por Node confirmaram os três identificadores de variante, preços, formatação monetária, presença das âncoras e existência dos assets referenciados no HTML de produção. O ambiente exigiu permissão adicional de leitura para o carregamento da configuração Vite no caminho do OneDrive. Não houve teste em navegador nesta sessão; interações e responsividade precisam da conferência manual abaixo.

## Validação manual recomendada
1. Abrir o menu mobile, seguir um link e confirmar seu fechamento.
2. Selecionar cada variante na coleção e no resumo, conferindo sincronização.
3. Abrir pedido unitário e kit, conferir nome/preço e confirmar sucesso.
4. Fechar o modal por botão, Escape e fundo; conferir retorno do foco e contenção com Tab.
5. Expandir/recolher o FAQ pelo teclado.
6. Conferir larguras de 320, 768 e 1440 px, zoom e preferência de movimento reduzido.

## Publicação e entrega
O código está preparado para repositório público. [Integrantes: criar/publicar o repositório GitHub, inserir o link aqui e realizar a entrega no Moodle.] Nenhuma publicação externa foi realizada automaticamente.

## Aviso
Este site é uma demonstração acadêmica. Produto, benefícios, preços, avaliações e pedidos são fictícios. Não há compra, pagamento ou envio. FPS 30 é apenas um atributo conceitual não validado; não aparece como promessa nas embalagens CSS.
