import { ReservasModel } from "../../models/reservas/reservas.model.js";
import { ViagensModel } from "../../models/viagens/viagens.model.js";
import { NotificationService } from "../notificacoes/notificacoes.service.js";

export class ReservationService {
  static async create(userId, viagemId, assentoId) {
    // Check if trip exists and has capacity
    const trip = await ViagensModel.findById(viagemId);
    if (!trip) throw new Error("Viagem não encontrada");
    if (trip.vagas_disponiveis <= 0) throw new Error("Sem vagas disponíveis");

    // Decrement capacity
    await ViagensModel.updateVagas(viagemId, trip.vagas_disponiveis - 1);
    
    try {
        const result = await ReservasModel.create({
            usuario_id: userId,
            viagem_id: viagemId,
            assento_id: assentoId
        });
        
        // Notify
        await NotificationService.send(userId, "Reserva Criada", "Sua reserva foi criada com sucesso. Aguardando pagamento.", "reserva_status");
        
        return result;
    } catch (error) {
        // Rollback capacity if fails
        await ViagensModel.updateVagas(viagemId, trip.vagas_disponiveis);
        throw error;
    }
  }

  static async cancel(reservaId, reason = "Cancelamento solicitado") {
    const reserva = await ReservasModel.findById(reservaId);
    if (!reserva) throw new Error("Reserva não encontrada");
    if (reserva.status === 'cancelada' || reserva.status === 'expirada') return;

    await ReservasModel.updateStatus(reservaId, 'cancelada');
    
    // Increment capacity back
    const trip = await ViagensModel.findById(reserva.viagem_id);
    if (trip) {
        await ViagensModel.updateVagas(reserva.viagem_id, trip.vagas_disponiveis + 1);
    }

    // Notify
    await NotificationService.send(reserva.usuario_id, "Reserva Cancelada", `Sua reserva foi cancelada. Motivo: ${reason}`, "reserva_status");
  }

  static async confirm(reservaId) {
      const reserva = await ReservasModel.findById(reservaId);
      if (!reserva) throw new Error("Reserva não encontrada");
      
      await ReservasModel.updateStatus(reservaId, 'confirmada');
      
      await NotificationService.send(reserva.usuario_id, "Reserva Confirmada", "Pagamento recebido. Sua viagem está confirmada!", "reserva_status");
  }

  static async expire(reservaId) {
    const reserva = await ReservasModel.findById(reservaId);
    if (!reserva) return;
    
    await ReservasModel.updateStatus(reservaId, 'expirada');
    
    // Increment capacity back
    const trip = await ViagensModel.findById(reserva.viagem_id);
    if (trip) {
        await ViagensModel.updateVagas(reserva.viagem_id, trip.vagas_disponiveis + 1);
    }

    await NotificationService.send(reserva.usuario_id, "Reserva Expirada", "Sua reserva expirou por falta de pagamento.", "reserva_status");
  }
}
