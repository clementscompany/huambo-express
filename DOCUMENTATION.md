# Documentação do Sistema de Reservas de Autocarro

## Visão Geral
Sistema completo de agência de viagens com gestão de reservas, pagamentos e notificações em tempo real.

## Fluxo de Reserva
1.  **Criação**: Cliente solicita reserva (`POST /reservas`).
    *   Sistema verifica disponibilidade.
    *   Sistema bloqueia assento (decrementa vagas).
    *   Status inicial: `pendente`.
    *   Notificação WSS: `reserva_status`.
2.  **Pagamento**: Cliente realiza pagamento (`POST /pagamentos`).
    *   Sistema registra pagamento.
    *   Status muda para: `confirmada`.
    *   Notificação WSS: `reserva_status`.
3.  **Expiração (Automático)**:
    *   Se não pago em 2 horas, Cron Job cancela.
    *   Status muda para: `expirada`.
    *   Assento liberado.
    *   Notificação WSS: `reserva_status`.
4.  **Cancelamento (Manual)**:
    *   Cliente cancela (`DELETE /reservas/:id`).
    *   Status muda para: `cancelada`.
    *   Assento liberado.
    *   Notificação WSS: `reserva_status`.

## Estados da Reserva
*   `pendente`: Criada, aguardando pagamento.
*   `confirmada`: Paga e garantida.
*   `cancelada`: Cancelada pelo usuário ou admin.
*   `expirada`: Cancelada automaticamente por falta de pagamento.

## WebSocket (WSS) Events
O sistema usa Socket.IO.
*   **Conexão**: Cliente conecta ao servidor. O servidor envia eventos para canais específicos (ex: `user_{id}`).
*   **Eventos Enviados pelo Servidor**:
    *   `reserva_status`: Mudança de status da reserva.
        *   Payload: `{ title: "...", message: "..." }`
    *   `lembrete_pagamento`: Lembrete de viagem próxima.
        *   Payload: `{ title: "...", message: "..." }`

## Cron Jobs
Processos automáticos rodando a cada minuto:
1.  **Expiração de Reservas**: Cancela reservas pendentes há mais de 2 horas.
2.  **Lembretes**: Envia notificação para reservas pendentes com viagem em menos de 3 horas.

## Controle de Acesso
*   **Cliente**: Pode criar reservas, listar suas reservas, cancelar.
*   **Admin / Usuario (Operador)**: Podem criar veículos, gerenciar rotas.
