# WorkoutPlan — especificação funcional de referência

Este documento registra as decisões de produto consolidadas na etapa de planejamento. Ele descreve o objetivo e os comportamentos esperados; não significa que essas funcionalidades já estejam implementadas.

## 1. Produto e público

WorkoutPlan é uma aplicação web responsiva para **organizar e acompanhar o treinamento pessoal do próprio usuário**.

Não é uma plataforma para professores ou personal trainers gerenciarem alunos. Não haverá agenda de clientes, cadastro de alunos ou gestão de atendimentos no escopo atual.

Cada pessoa utiliza a própria conta e acessa apenas seus dados. Autenticação planejada: Google via Firebase Authentication.

## 2. Navegação principal

A estrutura visual inicial já utiliza:
- Hoje — resumo do treino programado para o dia e acesso para iniciar.
- Calendário — programação e marcação de treinos.
- Fichas — criação e organização das sessões.
- Exercícios — biblioteca pessoal de exercícios.
- Evolução — histórico e indicadores.
- Configurações — preferências e conta.

A navegação deve ser responsiva. A execução do treino será especialmente otimizada para celular.

## 3. Biblioteca de exercícios

A biblioteca será enriquecida com auxílio de IA. A IA deve produzir um rascunho estruturado, que o usuário possa revisar, corrigir e aprovar antes de se tornar um registro confiável.

Um exercício poderá conter:
- nome, variações, descrição e equipamento;
- região e grupos musculares;
- músculos específicos principais, secundários e estabilizadores;
- articulações e funções/movimentos envolvidos;
- amplitude de movimento (ROM);
- perfil de resistência;
- tipo de contração;
- características relacionadas ao comprimento muscular;
- execução passo a passo, respiração e erros comuns;
- cuidados, limitações e observações;
- imagens ou vídeos demonstrativos;
- fontes, referências, data de revisão e estado de validação.

As classificações anatômicas e biomecânicas devem ser consistentes e revisáveis. Não tratar uma resposta de IA como evidência científica. Registrar a origem das afirmações relevantes e suas limitações.

A fonte definitiva das imagens e vídeos ainda deve ser decidida. A arquitetura deve permitir associar mídia própria ou externa sem amarrar o domínio a um único provedor.

## 4. Planejamento por grupos musculares

O treino não deve ser restrito a divisões tradicionais A/B/C. O usuário poderá:
- selecionar grupos musculares e receber sugestões de exercícios;
- montar a sessão manualmente;
- combinar os dois modos, alterando as sugestões antes de salvar;
- selecionar exercícios considerando músculos, funções, equipamentos e propriedades biomecânicas.

A IA sugere; o usuário decide. Não gerar prescrição automática como se fosse avaliação profissional ou médica.

## 5. Fichas, blocos e combinações

Uma ficha é uma prescrição editável, organizada em blocos de execução.

Tipos de bloco inicialmente previstos:
- exercício individual;
- bi-set — dois exercícios executados em sequência;
- tri-set — três exercícios executados em sequência.

Cada exercício dentro do bloco mantém configuração própria: tipo de execução, repetições ou tempo, falha, qualidade, carga e técnica. Exercícios do mesmo bloco não precisam compartilhar carga, repetições ou técnica.

O bloco pode definir número de rodadas, descanso entre exercícios e descanso após a rodada. A modelagem deve permitir evoluir para circuitos no futuro, sem implementar generalizações desnecessárias agora.

## 6. Prescrição e execução

### Tipo de execução

- Repetições com quantidade definida.
- Repetições até a falha.
- Execução por duração em segundos.
- Acompanhamento da qualidade das repetições, quando ativado.

A falha pode ser distinguida em:
- falha técnica: não manter a execução dentro do critério técnico definido;
- falha concêntrica momentânea: incapacidade de concluir outra fase concêntrica.

Esses critérios devem ser explicados de maneira clara. Não presumir que treinar até a falha é necessário ou superior para todos os objetivos.

### Qualidade

O registro deve permitir avaliar a qualidade da execução por série ou exercício. A escala final pode ser parametrizada na interface; o modelo precisa permitir registrar observação escrita e uma classificação sem confundir avaliação subjetiva com diagnóstico.

### Carga e técnicas

- Carga fixa.
- Drop set: carga inicial e uma ou mais reduções, em percentual ou valor absoluto; cada etapa pode ter sua própria prescrição e descanso.

O termo "drop down" usado durante o planejamento foi interpretado como **drop set** (redução de carga durante a série).

### Técnicas avançadas

As técnicas devem possuir uma explicação curta na seleção e detalhes acessíveis sobre execução e cuidados. O catálogo inicial previsto inclui:
- Drop set;
- Rest-pause;
- Myo-reps;
- Cluster sets;
- repetições parciais;
- sobrecarga excêntrica;
- tempo controlado / time under tension.

Cada técnica deve ser modelada conforme sua natureza: método de organização das séries ou parâmetro de execução. Não tratar todas como simples valores intercambiáveis de um campo.

## 7. Cronômetro integrado

O cronômetro fará parte do fluxo de execução do treino e deverá apoiar:
- exercícios por duração;
- descanso entre séries;
- descanso entre exercícios de um bloco;
- intervalos entre etapas de drop set, quando configurados.

Controles esperados: iniciar, pausar, retomar, reiniciar e finalizar. A transição entre exercício, descanso, rodada e próximo bloco deve ser explícita. A implementação precisa lidar com app em segundo plano sem depender de contagem por intervalos de renderização para preservar o tempo correto.

## 8. Calendário e sessões realizadas

Prescrição, programação e execução são entidades distintas:
- ficha: o plano reutilizável;
- treino programado: a data em que se pretende treinar;
- sessão realizada: o registro factual do que aconteceu.

O usuário poderá marcar treinos realizados, parciais ou não realizados. A programação não equivale à execução.

Uma sessão realizada deve preservar um snapshot dos exercícios, séries, repetições, cargas e técnicas conforme executados. Alterar ou excluir uma ficha no futuro não pode reescrever o histórico.

## 9. Evolução e volume muscular

O histórico deve acompanhar sessões, frequência, cargas, repetições, duração, qualidade e evolução por exercício.

O volume muscular deve manter **séries diretas e participação indireta separadas**. Um exercício pode registrar músculo principal, músculos secundários e estabilizadores, mas o relatório não deve somar tudo como se fosse o mesmo tipo de estímulo.

Não aplicar equivalências fracionárias ou pesos arbitrários no MVP. Uma análise quantitativa fracionária poderá ser considerada futuramente, com metodologia explícita e referência científica.

## 10. Inteligência artificial e infraestrutura

- Firebase: Authentication (Google), Firestore e Storage.
- OpenRouter para IA, com preferência inicial por um modelo DeepSeek Flash.
- O identificador do modelo deve ser configurável, não espalhado pelo código.
- A chave OpenRouter permanece somente no servidor.
- A IA auxilia na criação e explicação de exercícios, técnicas e sugestões de organização; conteúdo científico deve ser rastreável e revisável.
- Demonstrações visuais serão fornecidas por uma biblioteca de mídia associada aos exercícios; não presumir que o modelo de texto gere vídeos ou imagens corretas.

O projeto Firebase ainda não está criado/configurado no repositório de referência. Não há integração real de autenticação, banco, Storage ou OpenRouter no scaffold atual.

## 11. Princípios científicos e de segurança

- Evidência deve ser qualificada por fonte, data, população, protocolo e limitações.
- Não apresentar resultados preliminares como consenso.
- Não recomendar carga individual sem contexto.
- Não usar IA como diagnóstico, avaliação clínica ou substituto de orientação profissional.
- Cuidados e contraindicações devem ser comunicados com prudência.
- A interface deve distinguir dado registrado pelo usuário, sugestão da IA e informação revisada.
