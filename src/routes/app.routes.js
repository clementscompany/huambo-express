import express from 'express';
import { AuthController } from '../controllers/auth/auth.controller.js';
import { Validations } from '../middleware/validations/validations.class.js';
import { UserController } from '../controllers/user/user.controller.js';
import { VeiculosController } from '../controllers/veiculos/veiculos.controller.js';
import { RotasController } from '../controllers/rotas/rotas.controller.js';
import { MotoristasController } from '../controllers/motoristas/motoristas.controller.js';
import { ViagensController } from '../controllers/viagens/viagens.controller.js';
import { ReservasController } from '../controllers/reservas/reservas.controller.js';
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
Route.get('/users', AuthMiddleware.isAuthenticated, AuthMiddleware.hasRole(['admin']), UserController.getAll);
Route.delete('/users/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.hasRole(['admin']), UserController.remove);

// Veiculos
Route.get('/veiculos', VeiculosController.getAll);
Route.get('/veiculos/:id', VeiculosController.getById);
Route.post(
  '/veiculos',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  VeiculosController.create
);
Route.put(
  '/veiculos/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  VeiculosController.update
);
Route.delete(
  '/veiculos/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  VeiculosController.remove
);

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

// Motoristas
Route.get('/motoristas', MotoristasController.getAll);
Route.get('/motoristas/:id', MotoristasController.getById);
Route.post(
  '/motoristas',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  MotoristasController.create
);
Route.put(
  '/motoristas/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  MotoristasController.update
);
Route.delete(
  '/motoristas/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  MotoristasController.delete
);

// Viagens
Route.get('/viagens', ViagensController.getAll);
Route.get('/viagens/:id', ViagensController.getById);
Route.post(
  '/viagens',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  ViagensController.create
);
Route.put(
  '/viagens/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  ViagensController.update
);
Route.delete(
  '/viagens/:id',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  ViagensController.remove
);
Route.put(
  '/viagens/:id/assentos',
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.hasRole(['admin', 'usuario']),
  ViagensController.updateSeat
);

// Reservas
Route.get('/reservas', AuthMiddleware.isAuthenticated, ReservasController.list);
Route.post('/reservas', AuthMiddleware.isAuthenticated, ReservasController.create);
Route.delete('/reservas/:id', AuthMiddleware.isAuthenticated, ReservasController.cancel);
Route.get('/reservas/all', AuthMiddleware.isAuthenticated, AuthMiddleware.hasRole(['admin']), ReservasController.getAll);

// Pagamentos
// Route.post('/pagamentos', PagamentosController.create);

export { Route };
