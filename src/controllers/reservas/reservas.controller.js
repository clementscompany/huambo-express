import { ReservationService } from "../../database/services/reservas/reservas.service.js";
import { ReservasModel } from "../../database/models/reservas/reservas.model.js";

export class ReservasController {
    static async create(req, res) {
        try {
            // User is already attached by middleware
            const user = req.user;
            
            const { viagem_id, assento_id } = req.body;
            
            const result = await ReservationService.create(user.id, viagem_id, assento_id);
            res.status(201).json({ success: true, message: "Reserva criada", id: result.insertId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async list(req, res) {
         try {
            const user = req.user;
            const reservas = await ReservasModel.listarPorUsuario(user.id);
            res.status(200).json({ success: true, data: reservas });
         } catch (error) {
             res.status(500).json({ message: error.message });
         }
    }
    
    static async cancel(req, res) {
        try {
            const { id } = req.params;
            // TODO: Validate if reservation belongs to user? Service does not check ownership currently, but it should.
            // For now, assuming user can cancel any reservation if they have ID is risky.
            // Ideally Service should check: if (reserva.usuario_id !== userId) throw ...
            await ReservationService.cancel(id);
            res.status(200).json({ success: true, message: "Reserva cancelada" });
        } catch (error) {
             res.status(500).json({ message: error.message });
        }
    }
}
