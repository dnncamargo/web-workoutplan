# Fluxo operacional de desenvolvimento

Este documento define como usuário, agente Codex e ChatGPT trabalham juntos no repositório `dnncamargo/web-workoutplan`.

## Papéis

### Usuário
- Mantém o ambiente local e a worktree de trabalho.
- Atualiza a `main` local somente depois do merge do incremento anterior.
- Inicia a execução do agente GPT/Codex na sessão e no diretório de projeto existentes.
- Fornece credenciais ou configurações externas quando forem realmente necessárias.
- Decide sobre mudanças de escopo e acompanha o PR/merge.

### Agente GPT no Codex
- Executa a implementação no ambiente local já aberto.
- Lê primeiro `AGENTS.md` e os documentos relevantes.
- Audita o código existente e prioriza reutilização, legibilidade e manutenção.
- Trabalha em uma branch na mesma worktree.
- Testa, faz commit e publica a branch quando o incremento estiver pronto.
- Não abre PR nem faz merge por iniciativa própria.

### ChatGPT
- Planeja o incremento e prepara prompts completos para o agente.
- Não exige que o usuário copie e cole diffs: faz a auditoria diretamente na branch remota pelo GitHub.
- Verifica implementação, contratos, testes, riscos e aderência aos requisitos.
- Quando a branch estiver correta, prepara/abre o PR e conduz a revisão com o usuário.
- Não altera diretamente o código por padrão. Só faz alterações remotas quando o usuário pedir explicitamente.
- Não faz merge prematuro nem considera deploy como substituto de revisão de código.

## Ciclo obrigatório

```text
AUDIT → EVIDENCE → DECISION → PROMPT
      → IMPLEMENT (Codex, branch local)
      → TEST → COMMIT → PUSH
      → REMOTE REVIEW (ChatGPT/GitHub)
      → PR → REVIEW → MERGE
      → SYNC LOCAL MAIN → NEXT INCREMENT
```

### 1. Início de um incremento

O usuário deve começar com a `main` local atualizada após o merge anterior. O agente confirma o estado, sem descartar ou ocultar alterações:

```bash
pwd
git rev-parse --show-toplevel
git status --short --branch
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
```

Condições esperadas:
- diretório é a raiz de `web-workoutplan`;
- branch atual é `main`;
- `HEAD` coincide com `origin/main`;
- worktree está limpa.

Se alguma condição não for atendida, o agente deve parar, explicar a diferença e preservar o estado local. Não deve apagar alterações, trocar de branch de modo destrutivo ou criar outra worktree.

### 2. Prompt e execução

O ChatGPT prepara um prompt que:
- referencia `AGENTS.md` e os documentos do projeto;
- declara o objetivo e o que está fora do escopo;
- manda auditar o código real antes de decidir;
- exige reutilização antes de novas abstrações;
- explicita os testes e critérios de aceitação;
- proíbe uma nova worktree.

O agente cria uma branch usando a worktree atual. Não use `git worktree add`, clones auxiliares ou checkouts paralelos.

### 3. Validação local e publicação

O agente implementa e testa localmente. Mantém a branch local durante a iteração e evita publicar commits intermediários.

Quando estiver pronto:
- executa verificações pertinentes;
- revisa o diff e `git diff --check`;
- faz commit(s) coerentes;
- publica a branch em um push agrupado;
- informa branch, SHA, resumo e resultados.

### 4. Auditoria remota

O ChatGPT consulta o repositório e a branch no GitHub, sem pedir que o usuário envie diffs. A auditoria deve cobrir:
- alterações completas, não apenas o resumo do agente;
- coerência com o código atual e os contratos existentes;
- reutilização versus duplicação;
- tipagem, tratamento de erros e segurança;
- cobertura e qualidade dos testes;
- efeitos colaterais e regressões prováveis;
- documentação e critérios de aceitação.

Se houver problemas, o ChatGPT devolve um prompt de correção ao agente. O ciclo se repete na mesma branch e na mesma worktree.

### 5. PR, merge e sincronização

Quando a auditoria estiver aprovada:
- abrir PR da branch de trabalho para `main`;
- registrar no PR resumo, testes e riscos;
- revisar o PR;
- fazer merge somente depois da aprovação do incremento.

Depois do merge, o usuário atualiza a `main` local:

```bash
git switch main
git fetch origin
git pull --ff-only origin main
git status --short --branch
git rev-parse HEAD
git rev-parse origin/main
```

A próxima implementação só começa depois de confirmar `HEAD == origin/main` e worktree limpa.

## Política de deploys

A Vercel está conectada ao GitHub e usa a raiz do repositório:
- branch de trabalho publicada pode gerar Preview;
- merge em `main` pode gerar Production.

Para evitar consumo desnecessário de deploys:
- alterações de vários arquivos devem ser agrupadas em um único incremento/commit coerente;
- não publicar cada edição individual;
- não usar deploy manual para substituir testes locais;
- evitar pushes intermediários;
- validar lint, typecheck, testes e build antes do push final;
- não mudar configurações da Vercel sem necessidade.

Não se deve prometer que abrir um PR ou publicar uma branch não gerará deploy: isso depende da integração Git da Vercel. O fluxo apenas minimiza execuções redundantes.

## Padrão para prompts do Codex

Os prompts devem ser em texto simples, diretos e copiáveis. Incluir, no mínimo:

```text
SESSION: REUSE CURRENT SESSION
REPOSITORY: dnncamargo/web-workoutplan
WORKTREE: use only the already-open project worktree
PROHIBITED: do not run git worktree add; do not clone another checkout

FIRST:
1. Read AGENTS.md and the relevant docs.
2. Inspect pwd, repository root, branch, HEAD, origin/main and git status.
3. Audit the existing implementation before editing.
4. Identify reusable components, types, helpers, styles and tests.

TASK:
[one bounded implementation increment]

ACCEPTANCE:
[observable requirements]

VALIDATION:
[focused tests, npm run lint, npm run typecheck, npm run build as applicable]

DELIVERY:
Create/use a feature branch in the current worktree, commit coherent changes,
push the branch once ready, and report branch + SHA + tests.
Do not open a PR or merge.
```

Esse roteiro não substitui a análise técnica de cada tarefa: os arquivos e contratos reais sempre prevalecem sobre exemplos do prompt.
