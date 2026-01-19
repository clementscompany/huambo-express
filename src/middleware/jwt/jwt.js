import jwt from 'jsonwebtoken';
export class JwtMiddleware {

  static async generateToken(user) {
    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    };
    const secretKey = process.env.API_KEY;
    const options = {};
    return jwt.sign(payload, secretKey, options);
  }
  static verifyToken(req, res, next) {

    next();
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}