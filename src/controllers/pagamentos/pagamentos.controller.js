import { PagamentosModel } from "../../database/models/pagamentos/pagamentos.model.js";
import { ReservationService } from "../../database/services/reservas/reservas.service.js";

export class PagamentosController {
    static async create(req, res) {
        try {
            const { reserva_id, metodo, valor, referencia } = req.body;
            
            // Create payment record
            await PagamentosModel.create({
                reserva_id,
                metodo,
                valor,
                referencia,
                status: 'pago' 
            });
            
            // Confirm reservation
            await ReservationService.confirm(reserva_id);
            
            res.status(201).json({ success: true, message: "Pagamento registrado e reserva confirmada" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
