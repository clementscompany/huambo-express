import { AuthService } from "../../database/services/auth/auth.service.js";
import UserModel from "../../database/models/users/user.model.js";
import { JwtMiddleware } from "../../middleware/jwt/jwt.js";

export class AuthController {
  //// Login 
  static async login(req, res) {
    try {
      const { login, senha } = req.body;

      const user = await UserModel.findByLogin(login);

      if (!user) {
        res.status(404).json({ success: false, message: "As credenciais fornecidas não estão corretas!" });
        return;
      }
      const isPasswordValid = await AuthService.comparePassword(senha, user.senha);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Senha inválida" });
        return;
      }
      const token = await JwtMiddleware.generateToken(user);
      res.status(200).json({ success: true, message: "Login bem-sucedido", token });

    } catch (error) {
      res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
  }

  /// register
  static async register(req, res) {
    try {
      const { nome, email, telefone, senha, tipo } = req.body;
      const hashedPassword = await AuthService.hashPassword(senha);

      const newUser = {
        nome,
        email,
        telefone,
        senha: hashedPassword,
        tipo: tipo || "cliente"
      };

      const result = await UserModel.create(newUser);
      res.status(201).json({ message: "Usuário criado com sucesso", user: result });
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
  }


}