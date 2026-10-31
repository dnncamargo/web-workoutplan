# WorkoutPlan

Aplicação web responsiva para planejamento e acompanhamento de treinamento pessoal.

## Stack

- Next.js 16.4.3 (App Router)
- React 19.3.1
- TypeScript
- CSS Modules
- npm 10.9.2
- Node.js 22.x

## Documentação do projeto

- [Instruções obrigatórias para agentes](AGENTS.md)
- [Fluxo operacional de desenvolvimento](docs/DEVELOPMENT-WORKFLOW.md)
- [Especificação funcional do produto](docs/PRODUCT-SPECIFICATION.md)
- [Roteiro de implementação](docs/IMPLEMENTATION-ROADMAP.md)
- [Handoff para a próxima conversa](docs/HANDOFF-NEXT-CHAT.md)

## Requisitos e desenvolvimento local

Requisitos: Node.js 22.x e npm 10.9.2.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Após o lockfile estar versionado, prefira `npm ci` para instalação reproduzível.

## Verificações

```bash
npm run lint
npm run typecheck
npm run build
```

## Implantação

O projeto é conectado ao Vercel pelo GitHub. A branch `main` é a branch de produção e as alterações nela iniciam uma nova implantação.

- Framework: Next.js
- Root Directory: raiz do repositório
- Node.js: 22.x
- Install Command: `npm install --no-audit --no-fund`
- Build Command: `next build` (detecção automática do Next.js)

Consulte [o fluxo operacional](docs/DEVELOPMENT-WORKFLOW.md) antes de publicar alterações.

## Estrutura atual

- `src/app`: rotas e layout do App Router.
- `src/components`: componentes reutilizáveis da interface.
- `src/features`: módulos de domínio a serem adicionados conforme forem implementados.
- `src/lib`: integrações e utilitários.
- `docs`: especificações, roteiro e handoff.

## Estado atual

O scaffold Next.js e a estrutura visual responsiva estão no repositório. As telas de calendário, fichas, biblioteca e evolução são pontos de entrada ainda sem persistência.

A configuração do Firebase será feita em uma etapa posterior. Nenhuma chave de API ou credencial deve ser adicionada ao repositório.
