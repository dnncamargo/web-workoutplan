# WorkoutPlan

Aplicação web responsiva para planejamento e acompanhamento de treinamento pessoal.

## Stack
- Next.js 16.4.3 (App Router)
- React 19.3.1
- TypeScript
- CSS Modules
- pnpm 10.34.9

## Requisitos
- Node.js 22 ou superior
- Corepack habilitado
- pnpm 10.34.9 (fixado em package.json)

## Desenvolvimento local
```bash
corepack enable
pnpm install
pnpm dev
```

Abra http://localhost:3000.

## Verificações
```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Estrutura
- src/app: rotas e layout do App Router.
- src/components: componentes reutilizáveis da interface.
- src/features: módulos de domínio a serem adicionados conforme forem implementados.
- src/lib: integrações e utilitários.
- docs: especificações e decisões do projeto.

## Estado atual
Este commit inicial estabelece o scaffold do Next.js e a estrutura visual responsiva. As telas de calendário, fichas, biblioteca e evolução são pontos de entrada ainda sem persistência.

A configuração do Firebase será feita em uma etapa posterior. Nenhuma chave de API ou credencial deve ser adicionada ao repositório.
