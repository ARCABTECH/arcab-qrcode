# ARCAB QRCode Redirect

Landing page de redirecionamento da ARCAB para uso em QR Codes.

Ao abrir a URL, o usuário vê uma animação curta e é redirecionado automaticamente para o site principal.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

[http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera o build de produção.
- `npm run start`: inicia o app em modo produção.
- `npm run lint`: executa o lint com ESLint.

## Estrutura principal

- `app/page.tsx`: entrada da página inicial.
- `components/redirect-animation.tsx`: animação e lógica de redirecionamento.
- `app/layout.tsx`: layout global e metadados.
- `app/globals.css`: estilos globais.
- `public/assets`: logos e assets visuais.

## Customização rápida

As configurações de redirecionamento ficam em `components/redirect-animation.tsx`:

- `REDIRECT_URL`: URL de destino.
- `REDIRECT_DELAY_MS`: tempo para redirecionar automaticamente.
- `FALLBACK_LINK_DELAY_MS`: tempo para exibir link manual de fallback.

## Deploy

Pode ser publicado em qualquer ambiente compatível com Next.js.

Fluxo recomendado:

1. `npm run build`
2. `npm run start` (teste local em modo produção)
