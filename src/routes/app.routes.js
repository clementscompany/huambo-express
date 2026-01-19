import express from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';
import { Validations } from '../middleware/validations/validations.class.js';
import { UserController } from '../controllers/user/user.controller.js';
import { VeiculosController } from '../controllers/veiculos/veiculos.controller.js';
import { RotasController } from '../controllers/rotas/rotas.controller.js';
import { AuthMiddleware } from '../middleware/auth/auth.middleware.js';
const Route = express.Router();

Route.get('/', (req, res) => {
  res.send({
    success: true,
    message: 'API rodando com sucesso! ',
  });
});

//// auth routes
Route.post('/auth/login', Validations.LoginData, AuthController.login);
Route.post('/auth/register', AuthController.register);

// Perfil
Route.get('/perfil', UserController.getPerfilData);

// Veiculos
Route.get('/veiculos', VeiculosController.getAll);
Route.post('/veiculos', VeiculosController.create);

// Rotas
Route.get('/rotas', RotasController.getAll);
Route.get('/rotas/:id', RotasController.getById);
Route.post(
  '/rotas',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  RotasController.create
);
Route.put(
  '/rotas/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  RotasController.update
);
Route.delete(
  '/rotas/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  RotasController.remove
);

// // Reservas
// Route.get('/reservas', AuthMiddleware.isAuthenticated, ReservasController.list);
// Route.post('/reservas', AuthMiddleware.isAuthenticated, ReservasController.create);
// Route.delete('/reservas/:id', AuthMiddleware.isAuthenticated, ReservasController.cancel);

// Pagamentos
// Route.post('/pagamentos', PagamentosController.create);

export { Route };
