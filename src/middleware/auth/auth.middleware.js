import { JwtMiddleware } from "../jwt/jwt.js";

export class AuthMiddleware {
  static isAuthenticated(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Token ausente" });
    }
    const token = authorization.split(" ")[1];
    const user = JwtMiddleware.decodeToken(token);
    if (!user) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  }

  static hasRole(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }
      if (!roles.includes(req.user.tipo)) {
        return res.status(403).json({ message: "Acesso negado" });
      }
      next();
    }
  }
}
