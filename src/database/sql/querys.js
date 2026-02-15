export const createTableUsers = `
  CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE DEFAULT NULL,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(255) DEFAULT NULL,
  tipo VARCHAR(20) CHECK (tipo IN ('cliente','usuario','admin')) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;


export const createTableMotoristas = `
  CREATE TABLE IF NOT EXISTS motoristas (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE DEFAULT NULL,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  genero VARCHAR(10) CHECK (genero IN ('masculino','feminino','outro')) NOT NULL,
  senha VARCHAR(255) DEFAULT NULL,
  numero_carta VARCHAR(50),
  bilhete_identidade VARCHAR(50),
  telefone_contato VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

export const createTableVeiculos = `
  CREATE TABLE IF NOT EXISTS veiculos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    matricula VARCHAR(20) UNIQUE NOT NULL,
    modelo VARCHAR(50),
    ar_condicionado BOOLEAN DEFAULT FALSE,
    wifi BOOLEAN DEFAULT FALSE,
    mini_bar BOOLEAN DEFAULT FALSE,
    carregador_usb BOOLEAN DEFAULT FALSE,
    senha_wifi VARCHAR(100),
    categoria VARCHAR(20),
    capacidade INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;


export const createTableRotas = `
  CREATE TABLE IF NOT EXISTS rotas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    origem VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    distancia_km  VARCHAR(100),
    duracao_horas INT,
    status VARCHAR(20)
      CHECK (status IN ('ativa','inativa'))
      DEFAULT 'ativa',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;


export const createTableViagens = `
  CREATE TABLE IF NOT EXISTS viagens (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rota_id INT NOT NULL,
    veiculo_id INT NOT NULL,
    motorista_id INT NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    vagas_disponiveis INT NOT NULL,
    status VARCHAR(20) 
      CHECK (status IN ('agendada','em_andamento','finalizada','cancelada')) 
      DEFAULT 'agendada',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (rota_id) REFERENCES rotas(id),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id),
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id)
  );
`;


export const createTableAssentos = `
  CREATE TABLE IF NOT EXISTS assentos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    veiculo_id INT NOT NULL,
    numero INT NOT NULL,

    UNIQUE (veiculo_id, numero),
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
  );
`;

export const createTableReservas = `
  CREATE TABLE IF NOT EXISTS reservas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    viagem_id INT NOT NULL,
    assento_id INT NOT NULL,
    status VARCHAR(20) 
      CHECK (status IN ('pendente','confirmada','cancelada')) 
      DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (viagem_id, assento_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (viagem_id) REFERENCES viagens(id),
    FOREIGN KEY (assento_id) REFERENCES assentos(id)
  );
`;


export const createTablePagamentos = `
  CREATE TABLE IF NOT EXISTS pagamentos (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reserva_id INT NOT NULL,
    metodo VARCHAR(30),
    valor DECIMAL(10,2),
    referencia VARCHAR(100),
    status VARCHAR(20) 
      CHECK (status IN ('pendente','pago','cancelado','rejeitado')) 
      DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (reserva_id) REFERENCES reservas(id)
  );
`;


export const createTableNotificacoes = `
  CREATE TABLE IF NOT EXISTS notificacoes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    titulo VARCHAR(100),
    mensagem TEXT,
    lida BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`;


