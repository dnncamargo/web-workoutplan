# Instruções para agentes — WorkoutPlan

Estas instruções se aplicam a todo o repositório. Leia este arquivo antes de editar qualquer coisa.

## 1. Produto e limites

WorkoutPlan é uma aplicação de **treinamento pessoal**, destinada a uma pessoa organizar e acompanhar os próprios treinos. Não é um CRM de personal trainers, não gerencia alunos e não possui agenda de atendimentos.

O usuário entra com sua própria conta Google. Os dados privados devem ser isolados por UID. Consulte `docs/PRODUCT-SPECIFICATION.md` para os requisitos funcionais e decisões de produto.

## 2. Regra principal: auditar antes de implementar

Antes de alterar código:

1. Leia este arquivo, o README e os documentos relevantes em `docs/`.
2. Inspecione o estado real da branch, os arquivos envolvidos e o histórico recente.
3. Procure componentes, hooks, tipos, schemas, funções, estilos e testes já existentes que resolvam total ou parcialmente o problema.
4. Identifique o contrato atual e as dependências dos pontos que pretende alterar.
5. Apresente uma decisão baseada em evidências: reutilizar, estender ou criar algo novo.

Não assuma que um componente, endpoint, modelo ou funcionalidade existe apenas porque aparece no roadmap. O código presente na branch é a fonte da verdade.

## 3. Reutilização, legibilidade e manutenção

Prioridades, nesta ordem:

1. Reutilizar o que já existe e atende ao caso.
2. Estender abstrações existentes quando isso mantiver o contrato claro.
3. Criar uma nova abstração somente quando houver uma necessidade concreta e compreensível.
4. Manter o código simples, legível, tipado e fácil de testar.

Evite:
- duplicar componentes, funções, tipos, validações ou regras de negócio;
- criar camadas, providers, contextos, hooks genéricos ou sistemas de configuração sem necessidade demonstrável;
- introduzir dependências para resolver problemas que o projeto já resolve;
- construir estruturas "para o futuro" sem requisito atual;
- concentrar lógica de domínio em componentes visuais;
- usar `any` sem justificativa técnica;
- alterar arquivos fora do escopo sem explicar a necessidade.

Prefira nomes explícitos, funções pequenas, responsabilidades claras e tipos próximos do domínio a que pertencem. Documente decisões não óbvias, não o funcionamento trivial do código.

## 4. Interface e estilo

- Preserve a identidade visual já iniciada: clara, sóbria, profissional e responsiva.
- Use CSS Modules e os tokens existentes em `src/app/globals.css`.
- Reutilize os componentes e padrões de layout existentes antes de criar variantes.
- Não introduza Tailwind, bibliotecas de componentes ou sistemas de design paralelos sem decisão explícita.
- Não aumente globalmente o raio de borda, sombras ou saturação sem necessidade de produto.
- Considere desktop e celular nos fluxos de navegação e, especialmente, na execução do treino.
- Mantenha acessibilidade básica: semântica, foco visível, labels e estados compreensíveis.

## 5. Worktree e Git — regra obrigatória

**É proibido criar outra worktree ou outro checkout de trabalho.**

- Trabalhe exclusivamente na worktree e no diretório de projeto já abertos pelo usuário.
- Nunca execute `git worktree add`.
- Não clone o repositório em outra pasta.
- Não crie uma segunda cópia do projeto para trabalhar em paralelo.
- Não abra um segundo checkout para contornar conflito de branch.
- Se o diretório atual não for a raiz do repositório esperado, ou se houver estado local inesperado, pare e relate o problema em vez de improvisar.

No início, registre e examine:
```bash
pwd
git rev-parse --show-toplevel
git status --short --branch
git branch --show-current
git rev-parse HEAD
git rev-parse origin/main
```

O usuário atualiza a `main` local após cada merge. O trabalho do agente deve partir dessa base sincronizada, salvo instrução explícita em contrário.

## 6. Branches, commits e publicação

- Nunca implemente diretamente em `main`.
- Crie uma branch de trabalho na mesma worktree, a partir da `main` sincronizada.
- Use nomes descritivos, por exemplo `feat/exercise-library`, `fix/timer-pause` ou `chore/firebase-foundation`.
- Faça commits coerentes e com mensagens objetivas.
- Execute as verificações antes de publicar.
- **Evite pushes intermediários.** Conclua e valide o incremento localmente; depois publique a branch pronta em um push agrupado. Isso reduz builds de Preview desnecessários na Vercel.
- Ao terminar, envie a branch para o remoto e informe o nome da branch, SHA final, resumo e verificações.
- Não abra PR, não faça merge e não altere `main` por iniciativa própria. A auditoria remota é feita depois que a branch é publicada.

Se a branch remota já existir, inspecione-a antes de reutilizar. Não sobrescreva trabalho de terceiros ou do usuário.

## 7. Verificações e evidências

Execute as verificações adequadas ao escopo. Como baseline do projeto:
```bash
npm run lint
npm run typecheck
npm run build
```

Adicione ou atualize testes focados para comportamento novo ou alterado. Não declare uma verificação como aprovada se não a executou. Diferencie claramente:
- testes executados e resultado;
- testes não existentes;
- testes bloqueados por configuração ou dependência;
- validações manuais ainda necessárias.

Revise também:
```bash
git diff --check
git status --short
```

Atualize documentação quando uma mudança alterar contratos, configuração, comportamento ou decisões relevantes.

## 8. Dependências, ambiente e credenciais

- Não adicione uma dependência sem explicar por que as existentes são insuficientes.
- O runtime configurado é Node.js 22.x; o gerenciador atual é npm.
- Preserve o comando de instalação da Vercel, salvo necessidade justificada.
- Nunca faça commit de `.env.local`, tokens, chaves ou credenciais.
- Use `.env.example` apenas com nomes e valores vazios/de exemplo.
- A chave OpenRouter é segredo de servidor: nunca use prefixo `NEXT_PUBLIC_` e nunca a exponha ao navegador.
- A configuração Web do Firebase pode conter identificadores públicos, mas a proteção dos dados depende das Security Rules e da autenticação; não trate a configuração cliente como autorização.
- Não crie ou altere projetos Firebase, Vercel, domínios ou variáveis de ambiente sem instrução explícita do usuário.

## 9. Vercel e frequência de deploy

O repositório está conectado à Vercel:
- push para branch de trabalho pode gerar Preview;
- merge em `main` pode gerar Production.

Por isso:
- não publique um commit por arquivo;
- não faça pushes a cada pequena edição;
- agrupe as mudanças de um incremento em uma branch e publique quando estiverem prontas;
- não dispare deploy manual para validar cada edição;
- use lint, typecheck, testes e build localmente antes de publicar;
- não altere configurações de deploy sem necessidade e sem registrar o motivo.

## 10. Formato de entrega do agente

Ao concluir, responda com:

1. **Branch e commit:** nome e SHA.
2. **Resumo:** o que foi implementado.
3. **Reutilização:** componentes, tipos, utilitários ou contratos reaproveitados.
4. **Arquivos:** principais arquivos criados/alterados e motivo.
5. **Verificações:** comandos executados e resultados.
6. **Riscos/pendências:** pontos não concluídos ou que exigem decisão.
7. **Deploy:** informar se houve push que possa ter iniciado Preview; não afirmar que está publicado sem verificar.

Não envie apenas uma descrição do que faria: entregue a branch publicada e evidências verificáveis.
