# Estação Vegana — Front-end

## Stack
- **HTML5** semântico
- **Tailwind CSS** (via PostCSS)
- **TypeScript** (compilado pelo Vite)
- **Vite** como bundler e dev server

## Setup

```bash
npm install
npm run dev    # desenvolvimento
npm run build  # produção
```

## Estrutura de arquivos

```
estacao-vegana/
├── index.html               ← Home
├── produtos.html            ← Listagem
├── produto-detalhe.html     ← Detalhe
├── cesta.html               ← Carrinho
├── login.html               ← Login
├── src/
│   ├── css/main.css         ← Tailwind + design tokens
│   └── ts/
│       ├── main.ts          ← Compartilhado (menu, cart, toast)
│       ├── index.ts         ← Home
│       ├── produtos.ts      ← Listagem + filtros
│       ├── detalhe.ts       ← Detalhe do produto
│       └── cesta.ts         ← Carrinho
└── public/assets/           ← Imagens
```

## Tokens de cor

| Token           | Hex       |
|-----------------|-----------|
| verde-agua      | #2D8C72   |
| laranja         | #F5A05A   |
| off-white       | #FAFAF2   |
| verde-floresta  | #1A3D2E   |
| verde-menta     | #E8F5EE   |