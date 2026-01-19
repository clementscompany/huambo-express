import { WSS } from "../../../../index.js";
import { NotificacoesModel } from "../../models/notificacoes/notificacoes.model.js";

export class NotificationService {
  static async send(userId, title, message, event = 'notification') {
    // Save to DB
    await NotificacoesModel.create({
      usuario_id: userId,
      titulo: title,
      mensagem: message
    });

    // Send via WSS
    // Emit to a specific room for the user
    WSS.to(`user_${userId}`).emit(event, { title, message });
  }
}
