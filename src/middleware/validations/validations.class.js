export class Validations {
  static LoginData(req, res, next) {
    try {
      const { login, senha } = req.body;
      if (!login || !senha) {
        res.status(400).json({ message: "Login e senha são obrigatórios." });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
  }
}