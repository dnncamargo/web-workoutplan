# Roteiro de implementação — WorkoutPlan

O roteiro organiza o desenvolvimento em incrementos pequenos e verificáveis. A ordem pode ser ajustada por evidências encontradas no repositório, mas mudanças de prioridade devem ser justificadas.

## Estado de partida — 31/10/2026

### Infraestrutura já existente
- Repositório GitHub: `dnncamargo/web-workoutplan`.
- Branch principal: `main`.
- Scaffold Next.js App Router, TypeScript e React.
- CSS Modules e tokens globais em `src/app/globals.css`.
- Layout responsivo com navegação Hoje, Calendário, Fichas, Exercícios e Evolução.
- Rotas estruturais para calendário, fichas, nova ficha, biblioteca, evolução e configurações.
- Vercel conectado ao GitHub, com Next.js detectado, Node.js 22.x e instalação npm.
- O último deploy conhecido de `main` concluiu build, verificação TypeScript e geração estática das páginas.

### Ainda não implementado
- Firebase Authentication;
- Firestore e regras de segurança;
- Firebase Storage;
- biblioteca persistida de exercícios;
- fichas e editor funcional;
- calendário funcional;
- sessões de execução e cronômetro;
- relatórios e histórico;
- API OpenRouter.

### Verificações pendentes
- A instalação/build na Vercel foi concluída, mas o lint não foi confirmado separadamente.
- Na última inspeção de `main`, não havia `package-lock.json`. Confirmar no ambiente local; gerar e versionar o lockfile npm para builds reproduzíveis.
- Executar lint, typecheck e build na máquina local antes do primeiro incremento funcional.

## Incremento 0 — Auditoria e estabilização do scaffold

**Próxima tarefa recomendada.**

Objetivo: confirmar que o projeto remoto pode ser desenvolvido de forma reproduzível no ambiente local existente.

Atividades:
1. Ler `AGENTS.md`, este roteiro, a especificação de produto e o README.
2. Verificar raiz, branch, worktree, HEAD e sincronização com `origin/main`.
3. Inspecionar arquivos, rotas, componentes, tokens e scripts existentes.
4. Instalar dependências com npm e criar/atualizar `package-lock.json`, se ausente.
5. Executar `npm run lint`, `npm run typecheck` e `npm run build`.
6. Corrigir apenas problemas reais identificados, priorizando mudanças mínimas.
7. Registrar o baseline e preparar uma branch para auditoria remota.

Critérios de aceitação:
- nenhuma worktree adicional;
- instalação reproduzível com `npm ci` após lockfile versionado;
- lint, typecheck e build aprovados, ou bloqueios documentados com evidência;
- nenhuma integração Firebase/IA adicionada neste incremento, salvo se for necessária para corrigir um problema preexistente (e nesse caso justificar).

## Incremento 1 — Projeto Firebase e configuração segura

Objetivo: preparar o projeto Firebase sem misturar credenciais com código.

Atividades:
1. Criar o projeto Firebase e registrar uma aplicação Web.
2. Habilitar Google Authentication.
3. Criar Firestore e Storage.
4. Definir regiões e domínios autorizados de forma consciente.
5. Configurar variáveis de ambiente locais e na Vercel.
6. Criar regras iniciais de segurança e plano de testes com Firebase Emulator Suite.

Critérios:
- login Google e logout funcionais;
- estado de autenticação restaurado corretamente;
- usuário só consegue ler/escrever seus próprios dados;
- regras negam acesso não autenticado e acesso cruzado entre UIDs;
- nenhuma chave secreta no cliente ou no Git.

## Incremento 2 — Fundação do domínio e contratos de dados

Objetivo: transformar a especificação de produto em tipos e validações consistentes.

Definir e testar:
- grupos musculares e músculos específicos;
- relações principal/secundário/estabilizador;
- funções, movimentos articulares e características biomecânicas;
- exercício e variações;
- técnicas avançadas e suas explicações;
- prescrição por repetições, falha e duração;
- cargas fixas e etapas de drop set;
- blocos individual, bi-set e tri-set;
- treino programado, sessão executada e registros de séries.

Critérios:
- tipos e schemas coerentes;
- validação de combinações inválidas;
- contratos sem duplicação;
- regras de versionamento/snapshot definidas para preservar histórico.

## Incremento 3 — Biblioteca de exercícios

Objetivo: tornar a biblioteca utilizável mesmo antes da automação completa por IA.

Atividades:
- cadastro, edição, consulta e remoção;
- busca e filtros por grupo muscular, músculo, equipamento e função;
- página/detalhe do exercício;
- descrição de execução, erros comuns, cuidados e mídia;
- origem e estado de revisão das informações;
- fluxo para gerar rascunho assistido por IA e aprovar antes de salvar.

A integração OpenRouter pode ser incluída neste incremento quando a chave estiver configurada; a biblioteca não deve ficar bloqueada pela ausência dela.

Critérios:
- exercícios persistidos e isolados por usuário;
- campos anatômicos consultáveis;
- conteúdo gerado por IA identificado como rascunho até aprovação;
- falhas da IA não impedem cadastro/edição manual.

## Incremento 4 — Editor de fichas e organização muscular

Objetivo: permitir montar sessões completas.

Atividades:
- criar, editar, duplicar e ordenar fichas;
- selecionar grupos musculares;
- montagem manual e sugestões assistidas;
- adicionar exercício individual, bi-set e tri-set;
- configurar rodadas, descanso entre movimentos e descanso após bloco;
- prescrição individual por exercício;
- configurações de repetições, até a falha e duração;
- qualidade da execução;
- carga fixa, drop set e técnicas avançadas com explicações curtas.

Critérios:
- cada exercício de uma combinação conserva sua configuração;
- não existe dependência de divisões obrigatórias A/B/C;
- sugestões de IA são editáveis e nunca aplicadas sem aprovação do usuário;
- validações impedem combinações incompletas/incoerentes.

## Incremento 5 — Execução de treino e cronômetro

Objetivo: acompanhar o treino real, prioritariamente no celular.

Atividades:
- iniciar, pausar, retomar e finalizar sessão;
- registrar séries, repetições, carga, duração, qualidade e observações;
- avançar em bi-sets e tri-sets;
- cronômetro de exercício e descanso;
- pausas e transições entre etapas de drop set;
- recuperação correta do tempo quando a tela/app vai para segundo plano;
- salvar sessão com snapshot da prescrição e dos valores executados.

Critérios:
- progresso não se perde ao navegar ou ao voltar do segundo plano;
- tempo deriva de timestamps, não apenas de contadores locais;
- sessão parcial pode ser registrada;
- alterações posteriores na ficha não alteram sessões anteriores.

## Incremento 6 — Calendário

Objetivo: programar a rotina e comparar intenção com execução.

Atividades:
- visões mensal e semanal responsivas;
- agendar ficha em uma data;
- reprogramar e cancelar;
- marcar realizado, parcial ou não realizado;
- abrir a sessão a partir do calendário;
- separar treino agendado de sessão executada.

Critérios:
- calendário não cria sessão concluída por simples agendamento;
- fusos/datas são tratados de forma consistente;
- reprogramação não modifica histórico já realizado.

## Incremento 7 — Histórico e análise muscular

Objetivo: apresentar evolução mensurável.

Atividades:
- histórico de sessões por data e ficha;
- evolução de carga e repetições por exercício;
- frequência e consistência;
- volume muscular com séries diretas e participação indireta em indicadores separados;
- filtros por período, grupo e músculo;
- observações e qualidade.

Critérios:
- não somar séries diretas e indiretas como uma métrica única;
- não aplicar peso fracionário sem metodologia e aprovação;
- relatórios explicam como cada número foi calculado.

## Incremento 8 — IA e conteúdo fundamentado

Objetivo: integrar o OpenRouter de maneira segura e previsível.

Atividades:
- cliente de servidor isolado;
- modelo via variável de ambiente;
- validação de input/output com schema;
- geração de rascunho de exercícios e explicações;
- respostas sobre execução e técnicas, contextualizadas ao exercício;
- limites de tamanho, timeout, erro, custo e rate limit;
- registro de versão do modelo e origem/revisão do conteúdo.

Critérios:
- API key exclusivamente no servidor;
- resposta inválida do modelo nunca persiste sem validação;
- explicações distinguem informação revisada de conteúdo gerado;
- sem prescrição médica ou carga arbitrária.

## Incremento 9 — Mídia, acessibilidade e refinamento

Objetivo: fechar a experiência visual e operacional.

Atividades:
- origem de imagens/vídeos e direitos de uso;
- armazenamento ou referências externas;
- interface de demonstração do exercício;
- estados vazios, loading, erro e offline;
- acessibilidade e navegação por teclado;
- revisão mobile/desktop;
- testes ponta a ponta dos fluxos principais;
- revisão de regras Firebase e custos.

## Critério de encerramento de cada incremento

Um incremento só está pronto quando:
- o comportamento pedido está implementado;
- código existente foi reutilizado quando apropriado;
- testes relevantes foram adicionados/atualizados e executados;
- lint, typecheck e build aplicáveis passaram;
- documentação foi atualizada;
- diff e estado Git foram revisados;
- branch foi publicada para auditoria remota;
- riscos e pendências foram declarados.

Não acumular funcionalidades não relacionadas em um único incremento.
