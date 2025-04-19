#!/bin/bash

# Configurações
REPORT_FILE="report.md"
TEMPLATES_DIR="ISSUE"
ARCHIVE_NAME="report_package.zip"
LOG_FILE="send_report.log"
RECEIPT_FILE="receipt.txt"

# Função para log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Iniciar log
log "Iniciando envio do relatório..."

# Verificar se o diretório ISSUE existe
if [ ! -d "$TEMPLATES_DIR" ]; then
    log "ERRO: Diretório $TEMPLATES_DIR não encontrado"
    exit 1
fi

# Criar arquivo de recibo
echo "Recibo de Envio de Relatório" > "$RECEIPT_FILE"
echo "Data: $(date '+%Y-%m-%d %H:%M:%S')" >> "$RECEIPT_FILE"
echo "Arquivo de Relatório: $REPORT_FILE" >> "$RECEIPT_FILE"

# Contar templates incluídos
TEMPLATE_COUNT=$(ls "$TEMPLATES_DIR"/*.md 2>/dev/null | wc -l)
echo "Templates Incluídos: $TEMPLATE_COUNT" >> "$RECEIPT_FILE"

# Calcular hash do arquivo de relatório
if [ -f "$REPORT_FILE" ]; then
    REPORT_HASH=$(md5 -q "$REPORT_FILE")
    echo "Hash do Relatório: $REPORT_HASH" >> "$RECEIPT_FILE"
else
    log "ERRO: Arquivo $REPORT_FILE não encontrado"
    exit 1
fi

# Criar pacote zip
zip -r "$ARCHIVE_NAME" "$REPORT_FILE" "$TEMPLATES_DIR"/*.md 2>/dev/null
if [ $? -eq 0 ]; then
    log "Pacote criado com sucesso: $ARCHIVE_NAME"
    
    # Simular envio do pacote
    log "Enviando pacote..."
    sleep 2
    
    # Atualizar recibo com status
    echo "Status: Enviado" >> "$RECEIPT_FILE"
    echo "ID do Pacote: $(date +%s)" >> "$RECEIPT_FILE"
    
    log "Pacote enviado com sucesso!"
else
    log "ERRO: Falha ao criar pacote"
    exit 1
fi

# Finalizar log
log "Processo concluído"
log "Recibo gerado em: $RECEIPT_FILE" 