# 📘 Documentação Completa – Sistema de Agendamento de Viagens

## 1. Visão Geral

O **Sistema de Agendamento de Viagens** é uma plataforma digital (Web + App Mobile) destinada a facilitar o agendamento, gestão e acompanhamento de viagens entre clientes e operadores de transporte. O sistema permite reservas antecipadas, controlo de vagas, pagamentos (opcional), notificações e gestão administrativa.

### Objetivo

* Automatizar o processo de marcação de viagens
* Reduzir erros manuais
* Melhorar a experiência do cliente
* Oferecer controlo total ao administrador

### Público-alvo

* Empresas de transporte
* Agências de viagens
* Serviços de transporte escolar, interprovincial ou privado

---

## 2. Tipos de Utilizadores

### 2.1 Cliente (Passageiro)

* Criar conta
* Agendar viagem
* Escolher rota, data, horário e assento
* Ver histórico de viagens
* Cancelar ou reagendar
* Receber notificações

### 2.2 Motorista

* Visualizar viagens atribuídas
* Confirmar início e fim da viagem
* Ver lista de passageiros

### 2.3 Administrador

* Gerir usuários
* Criar rotas e horários
* Gerir veículos e motoristas
* Acompanhar pagamentos
* Ver relatórios

---

## 3. Funcionalidades do Sistema

### 3.1 Autenticação

* Login
* Cadastro
* Recuperação de senha
* Autenticação por telefone ou e-mail

### 3.2 Agendamento de Viagem

* Seleção de origem e destino
* Escolha de data e horário
* Escolha de assento
* Confirmação da reserva

### 3.3 Pagamentos (Opcional)

* Pagamento por referência, carteira digital ou dinheiro
* Status: pendente / pago / cancelado

### 3.4 Notificações

* Confirmação de agendamento
* Lembrete da viagem
* Alterações ou cancelamentos

### 3.5 Gestão Administrativa

* Dashboard com métricas
* Gestão de rotas
* Gestão de veículos
* Gestão de motoristas
* Gestão de reservas

---

## 4. Requisitos Funcionais

* O sistema deve permitir múltiplas viagens por dia
* O sistema deve impedir reservas acima da capacidade
* O sistema deve funcionar offline (modo leitura no app)
* O sistema deve ser responsivo

## 5. Requisitos Não Funcionais

* Segurança de dados
* Performance
* Escalabilidade
* Interface simples e moderna

---

## 6. Modelo de Dados (Entidades Principais)

### Usuário

* id
* nome
* email
* telefone
* tipo (cliente | motorista | admin)

### Viagem

* id
* origem
* destino
* data
* hora
* preco
* vagas

### Reserva

* id
* usuario_id
* viagem_id
* assento
* status

### Veículo

* id
* matricula
* capacidade
* motorista_id

---

## 7. Tecnologias Sugeridas

### Frontend Web

* React.js

### App Mobile

* React Native (Expo)

### Backend

* Node.js + Express
* PHP (Laravel) como alternativa

### Banco de Dados

* PostgreSQL ou MySQL

### Autenticação

* JWT

---

## 8. Fluxo do Utilizador (Cliente)

1. Criar conta
2. Fazer login
3. Escolher viagem
4. Confirmar reserva
5. Receber notificação
6. Realizar viagem

---

## 9. Prompt para IA de Design (UI/UX)

### 🎨 Prompt – Design do App Mobile

```
Crie o design de um aplicativo mobile moderno para agendamento de viagens.

Estilo: moderno, simples, profissional
Plataforma: Android e iOS

Telas necessárias:
- Tela de login e cadastro
- Tela inicial com lista de viagens
- Tela de detalhes da viagem
- Tela de seleção de assento
- Tela de confirmação de reserva
- Tela de histórico de viagens
- Perfil do usuário

Cores:
- Azul como cor principal
- Branco e cinza claro como fundo

Componentes:
- Cards modernos
- Botões arredondados
- Ícones minimalistas

UX:
- Navegação simples
- Feedback visual claro
- Tipografia legível
```

### 🎨 Prompt – Dashboard Web (Admin)

```
Crie o design de um dashboard web moderno para gestão de agendamento de viagens.

Estilo: clean, profissional

Páginas:
- Dashboard com gráficos
- Gestão de usuários
- Gestão de viagens
- Gestão de veículos
- Relatórios

Componentes:
- Sidebar lateral
- Cards informativos
- Tabelas modernas
- Gráficos simples

Cores:
- Azul escuro
- Branco
- Tons neutros
```

---

## 10. Banco de Dados – Modelo Completo (SQL)

### 10.1 Diagrama Lógico (Resumo)

* Usuários podem fazer várias reservas
* Viagens possuem várias reservas
* Veículos realizam várias viagens
* Motoristas são usuários do tipo motorista

---

### 10.2 Tabela: usuarios

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) CHECK (tipo IN ('cliente','motorista','admin')) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.3 Tabela: motoristas

```sql
CREATE TABLE motoristas (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
  numero_carta VARCHAR(50),
  validade_carta DATE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.4 Tabela: veiculos

```sql
CREATE TABLE veiculos (
  id SERIAL PRIMARY KEY,
  matricula VARCHAR(20) UNIQUE NOT NULL,
  modelo VARCHAR(50),
  capacidade INT NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.5 Tabela: rotas

```sql
CREATE TABLE rotas (
  id SERIAL PRIMARY KEY,
  origem VARCHAR(100) NOT NULL,
  destino VARCHAR(100) NOT NULL,
  distancia_km DECIMAL(6,2),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.6 Tabela: viagens

```sql
CREATE TABLE viagens (
  id SERIAL PRIMARY KEY,
  rota_id INT REFERENCES rotas(id),
  veiculo_id INT REFERENCES veiculos(id),
  motorista_id INT REFERENCES motoristas(id),
  data DATE NOT NULL,
  hora TIME NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  vagas_disponiveis INT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('agendada','em_andamento','finalizada','cancelada')) DEFAULT 'agendada',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.7 Tabela: assentos

```sql
CREATE TABLE assentos (
  id SERIAL PRIMARY KEY,
  veiculo_id INT REFERENCES veiculos(id),
  numero INT NOT NULL,
  UNIQUE (veiculo_id, numero)
);
```

---

### 10.8 Tabela: reservas

```sql
CREATE TABLE reservas (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  viagem_id INT REFERENCES viagens(id),
  assento_id INT REFERENCES assentos(id),
  status VARCHAR(20) CHECK (status IN ('pendente','confirmada','cancelada')) DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (viagem_id, assento_id)
);
```

---

### 10.9 Tabela: pagamentos (Opcional)

```sql
CREATE TABLE pagamentos (
  id SERIAL PRIMARY KEY,
  reserva_id INT REFERENCES reservas(id),
  metodo VARCHAR(30),
  valor DECIMAL(10,2),
  status VARCHAR(20) CHECK (status IN ('pendente','pago','cancelado')) DEFAULT 'pendente',
  referencia VARCHAR(100),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 10.10 Tabela: notificacoes

```sql
CREATE TABLE notificacoes (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  titulo VARCHAR(100),
  mensagem TEXT,
  lida BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 11. Regras Importantes de Negócio

* Não permitir reservas duplicadas para o mesmo assento
* Não permitir reservas quando vagas_disponiveis = 0
* Cancelamento deve liberar o assento
* Pagamento confirmado muda status da reserva para confirmada

---

## 12. Observações Técnicas

* Compatível com PostgreSQL e MySQL
* Senhas devem ser armazenadas com hash
* Criar índices em campos de busca (email, telefone, data)

---

📌 Este banco de dados suporta crescimento, multi-viagens e múltiplos usuários.
