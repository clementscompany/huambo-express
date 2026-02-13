import { ReservasModel } from "../../database/models/reservas/reservas.model.js";
import UserModel from "../../database/models/users/user.model.js";
import { JwtMiddleware } from "../../middleware/jwt/jwt.js";

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
    }
  }

  static async getPerfilData(req, res) {
    try {

      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).json({ message: "Token de autorização ausente" });
        return;
      }

      const token = authorization.split(" ")[1];
      const dataToken = JwtMiddleware.decodeToken(token);
      if (!dataToken) {
        res.status(401).json({ message: "Token inválido" });
        return;
      }

      const { id } = dataToken;

      const reservas = await ReservasModel.listarPorUsuario(id);

      const user = await UserModel.findById(id);

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          tipo: user.tipo,
        }
      });

    } catch (error) {
      res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      await UserModel.deactivate(id);
      res.status(200).json({ success: true, message: "Usuário desativado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao desativar usuário", error: error.message });
    }
  }
}
