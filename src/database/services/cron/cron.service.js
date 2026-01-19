import { ReservasModel } from "../../models/reservas/reservas.model.js";
import { ReservationService } from "../reservas/reservas.service.js";
import { NotificationService } from "../notificacoes/notificacoes.service.js";

export class CronService {
    static async checkExpiredReservations() {
        // Expire reservations pending for more than 120 minutes (2 hours)
        const expired = await ReservasModel.findPendingAndExpired(120); 
        for (const reserva of expired) {
            await ReservationService.expire(reserva.id);
        }
    }

    static async sendReminders() {
        // Send reminder 3 hours before trip
        const pending = await ReservasModel.findPendingNearTrip(3);
        for (const reserva of pending) {
             await NotificationService.send(reserva.usuario_id, "Lembrete de Viagem", "Sua viagem é em breve (menos de 3h). Realize o pagamento para confirmar.", "lembrete_pagamento");
        }
    }
}
