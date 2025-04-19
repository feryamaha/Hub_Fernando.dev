# Templates de Solicitação

Esta pasta contém templates padronizados para diferentes tipos de solicitações no projeto. Use estes templates para garantir uma comunicação clara e eficiente.

## Sistema de Identificação

Cada tipo de issue tem um identificador único:
- ET[XX] - Error Template (Ex: ET01, ET02)
- MT[XX] - Modification Template (Ex: MT01, MT02)
- FT[XX] - Feature Template (Ex: FT01, FT02)
- OT[XX] - Optimization Template (Ex: OT01, OT02)

## Templates Disponíveis

1. [Reportar Erros](error_template.md) (ET[XX])
2. [Solicitar Modificações](modification_template.md) (MT[XX])
3. [Solicitar Novas Funcionalidades](feature_template.md) (FT[XX])
4. [Solicitar Otimizações](optimization_template.md) (OT[XX])

## Como Usar

1. Escolha o template apropriado para sua solicitação
2. Copie o conteúdo do template
3. Crie um novo arquivo com um nome descritivo
4. Atribua um ID único seguindo o padrão (ET01, MT01, etc.)
5. Preencha os campos entre colchetes `[]`
6. Remova as seções não aplicáveis
7. Adicione informações relevantes adicionais

## Benefícios

- Comunicação mais clara e estruturada
- Redução de mal-entendidos
- Melhor organização das solicitações
- Facilita o acompanhamento do progresso
- Ajuda a manter o contexto do projeto
- Sistema de referência único para cada issue

## Exemplo de Uso

```markdown
ISSUE ID: MT01

[MODIFICAÇÃO] Componente: ThemeSection
Objetivo: Corrigir cores dos ícones
Local: src/components/Sidebar/Theme/ThemeSection.jsx
Alterações Necessárias: 
- Atualizar cores dos ícones para match com temas
- Manter estrutura existente
Contexto: Os ícones estão com cores fixas

## Histórico
- 2024-04-17 - Issue criada
- 2024-04-17 - Cores atualizadas
``` 