# Handoff — próxima conversa do WorkoutPlan

**Atualizado em:** 31/10/2026  
**Repositório:** https://github.com/dnncamargo/web-workoutplan  
**Branch principal verificada:** `main`  
**Último commit conhecido de main na auditoria:** `885e5ae24dc580253f803d3ec8a5fe109bac3c72` — `docs: document Vercel project configuration`

## Instrução inicial obrigatória para o próximo chat

Comece lendo, nesta ordem:

1. `AGENTS.md` — regras obrigatórias para qualquer agente;
2. `docs/DEVELOPMENT-WORKFLOW.md` — processo Codex/GitHub/PR/merge;
3. `docs/PRODUCT-SPECIFICATION.md` — decisões funcionais já tomadas;
4. `docs/IMPLEMENTATION-ROADMAP.md` — incrementos e critérios de aceitação;
5. `README.md` — setup e configuração atual;
6. este handoff.

Depois, inspecione o repositório real em `main`, não apenas os resumos deste documento. Verifique arquivos, scripts, rotas, componentes, configurações e histórico recente. Não peça ao usuário para repetir decisões registradas nestes documentos.

**O próximo chat deve trabalhar por meio de prompts para o agente GPT no Codex.** Não deve assumir a implementação diretamente no GitHub nem pedir ao usuário para colar diffs. Depois que o agente publicar a branch, faça a auditoria remota pelo GitHub.

## Produto — decisões já tomadas

- Uso pessoal: cada pessoa organiza o próprio treino; não é software de gestão de alunos.
- Aplicação web responsiva.
- Login Google.
- Firebase planejado: Authentication, Firestore e Storage.
- IA via OpenRouter, com preferência por DeepSeek Flash; o modelo precisa ser configurável.
- Biblioteca de exercícios assistida por IA, com revisão/aprovação do usuário.
- Planejamento por agrupamentos musculares, sem divisões tradicionais obrigatórias.
- Montagem de sessões em modo manual e com sugestões inteligentes.
- Séries diretas e participação indireta em métricas separadas.
- Exercício individual, bi-set e tri-set.
- Repetições fixas, até a falha e execução por tempo.
- Acompanhamento da qualidade das repetições.
- Carga fixa e drop set com reduções configuráveis.
- Técnicas avançadas com explicação breve e acesso a detalhes.
- Cronômetro integrado para exercícios cronometrados e intervalos.
- Calendário distingue treino programado e sessão realizada.
- Sessões realizadas preservam snapshot para não serem alteradas por edições futuras da ficha.
- Histórico e evolução muscular.

Consulte a especificação funcional para todos os detalhes.

## Estado do repositório na última auditoria remota

### Stack
- Next.js 16.4.3, App Router;
- React 19.3.1;
- TypeScript;
- CSS Modules;
- npm 10.9.2;
- Node.js 22.x.

### Estrutura visual já existente
- Dashboard Hoje em `src/app/page.tsx`;
- `/calendar`;
- `/workouts` e `/workouts/new`;
- `/exercises`;
- `/history`;
- `/settings`;
- layout responsivo em `src/components/layout/app-shell.tsx`;
- tokens CSS em `src/app/globals.css`;
- componente de ícones local em `src/components/ui/icon.tsx`.

As páginas funcionais ainda são placeholders. Não refaça o scaffold com `npx create-next-app`: o projeto Next.js já existe no repositório.

### Ambiente e serviços
- Projeto Vercel `web-workoutplan` conectado ao GitHub.
- Domínio padrão conhecido: https://web-workoutplan.vercel.app
- Root Directory: raiz do repositório.
- Node.js: 22.x.
- Install Command da Vercel: `npm install --no-audit --no-fund`.
- O último deploy conhecido de `main` estava `READY`; build Next.js, TypeScript e geração estática concluídos.
- Houve falhas iniciais usando pnpm (`ERR_INVALID_THIS` ao acessar o registry). npm resolveu a instalação. **Não troque de volta para pnpm sem evidência e teste local.**
- A integração Git da Vercel gera deploy de Preview/Production conforme branch e merge. Evitar pushes intermediários e commits por arquivo.
- Deployment Protection/SSO está habilitada na equipe para os domínios padrão; não desligar para facilitar testes.
- Firebase ainda não foi criado/configurado.
- Não há autenticação Firebase, Firestore, Storage ou integração OpenRouter implementados.
- A chave OpenRouter não foi fornecida nem configurada.
- Na última inspeção de `main`, não havia `package-lock.json`; confirmar localmente e no remoto. A primeira tarefa deve tornar a instalação reproduzível.

## Próximo incremento sugerido

**Incremento 0 — auditoria e estabilização do scaffold**, conforme `docs/IMPLEMENTATION-ROADMAP.md`.

O agente deve, na worktree local existente:
1. confirmar raiz, branch, status, HEAD e sincronização com `origin/main`;
2. verificar se há `package-lock.json`;
3. instalar dependências com npm;
4. executar lint, typecheck e build;
5. corrigir apenas problemas confirmados;
6. versionar lockfile e documentação de setup, se necessário;
7. publicar uma branch única quando estiver validada.

Não iniciar Firebase nem criar módulos de domínio nesse incremento. Após a auditoria do baseline, o próximo incremento será a configuração Firebase e a base de autenticação/segurança.

## Prompt inicial sugerido para o Codex

Copie o texto abaixo para o agente quando o repositório local estiver atualizado. O agente precisa permanecer na worktree já aberta.

```text
SESSION: REUSE CURRENT SESSION
REPOSITORY: dnncamargo/web-workoutplan
TASK: Incremento 0 — audit and stabilize the existing scaffold.

MANDATORY READING:
- AGENTS.md
- docs/DEVELOPMENT-WORKFLOW.md
- docs/PRODUCT-SPECIFICATION.md
- docs/IMPLEMENTATION-ROADMAP.md
- docs/HANDOFF-NEXT-CHAT.md
- README.md

WORKTREE POLICY:
Use only the already-open WorkoutPlan project worktree.
Do not run git worktree add.
Do not clone the repository into another folder.
Do not create a parallel checkout.
Do not discard, reset or hide pre-existing local changes.

FIRST ACTION:
Inspect pwd, repository root, git status, current branch, HEAD and origin/main.
Stop and report if the current directory is wrong, the worktree is unexpectedly dirty,
or main is not synchronized. Do not improvise around these conditions.

AUDIT BEFORE EDITING:
Inspect the actual project tree, package.json, lockfiles, Next.js configuration,
ESLint configuration, app routes, components, styles and existing tests.
Do not run npx create-next-app: the Next.js scaffold already exists.
Identify reusable code and any baseline issues before changing files.

BOUNDED SCOPE:
- Confirm whether package-lock.json exists.
- Use the currently selected npm toolchain and Node.js 22.x.
- Generate/update package-lock.json if missing, then verify npm ci works.
- Run npm run lint, npm run typecheck and npm run build.
- Fix only confirmed baseline issues with the smallest maintainable changes.
- Do not implement Firebase, authentication, Firestore, Storage, OpenRouter,
  exercise models or workout features in this increment.

QUALITY:
Prioritize reuse, readable code, explicit types and maintainability.
Avoid adding dependencies or abstractions without demonstrated need.
Keep documentation aligned with the actual setup.

VALIDATION:
Run npm ci, npm run lint, npm run typecheck, npm run build and git diff --check
as applicable. Report exact results; do not claim checks that were not run.

DELIVERY:
Create one descriptive feature/chore branch in this same worktree.
Commit coherent changes and push only once the increment is validated.
Do not open a PR and do not merge.
Return branch name, final commit SHA, changed files, reused code,
commands/results, and any remaining risks.
```

## Observações para a próxima conversa

- Não transformar o roadmap inteiro em uma única tarefa. Um incremento por vez.
- Não perguntar novamente se o produto é para uso pessoal: essa decisão está encerrada.
- Não sugerir gerenciamento de alunos, agenda profissional ou papéis de treinador.
- Não pedir diffs ao usuário: a auditoria será feita diretamente na branch remota.
- Não abrir PR antes da auditoria remota.
- Não iniciar a próxima implementação até o PR anterior estar integrado e o usuário confirmar a sincronização da `main` local.
