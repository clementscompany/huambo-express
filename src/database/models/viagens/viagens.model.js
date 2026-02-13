import { DB } from "../../connection/connection.db.js";
import { VeiculosModel } from "../veiculos/veiculos.model.js";

export class ViagensModel {
  static getAll() {
    const sql = `
      SELECT 
        v.*,
        r.origem,
        r.destino,
        r.duracao_minutos,
        ve.modelo as veiculo_modelo,
        ve.matricula as veiculo_matricula,
        ve.capacidade as veiculo_capacidade,
        m1.id as motorista_id,
        m1.nome as motorista_nome,
        m2.id as motorista_2_id,
        m2.nome as motorista_2_nome
      FROM viagens v
      LEFT JOIN rotas r ON v.rota_id = r.id
      LEFT JOIN veiculos ve ON v.veiculo_id = ve.id
      LEFT JOIN motoristas m1 ON v.motorista_id = m1.id
      LEFT JOIN motoristas m2 ON v.motorista_2_id = m2.id
      ORDER BY v.data DESC, v.hora DESC
    `;
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static findById(id) {
    const sql = `
      SELECT 
        v.*,
        r.origem,
        r.destino,
        r.duracao_minutos,
        ve.modelo as veiculo_modelo,
        ve.matricula as veiculo_matricula,
        ve.capacidade as veiculo_capacidade,
        m1.id as motorista_id,
        m1.nome as motorista_nome,
        m2.id as motorista_2_id,
        m2.nome as motorista_2_nome
      FROM viagens v
      LEFT JOIN rotas r ON v.rota_id = r.id
      LEFT JOIN veiculos ve ON v.veiculo_id = ve.id
      LEFT JOIN motoristas m1 ON v.motorista_id = m1.id
      LEFT JOIN motoristas m2 ON v.motorista_2_id = m2.id
      WHERE v.id = ?
    `;
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static async create(data) {
    // 1. Obter capacidade do veículo para gerar assentos
    const veiculo = await new Promise((resolve, reject) => {
      const sql = "SELECT * FROM veiculos WHERE id = ?";
      DB.query(sql, [data.veiculo_id], (err, res) => {
        if (err) reject(err);
        else resolve(res[0]);
      });
    });

    if (!veiculo) throw new Error("Veículo não encontrado");

    // 2. Gerar estrutura JSON de assentos
    const assentos = [];
    for (let i = 1; i <= veiculo.capacidade; i++) {
      assentos.push({
        numero: i,
        status: 'livre' // livre, ocupado, pendente
      });
    }

    // 3. Preparar objeto para inserção
    const insertData = {
      rota_id: data.rota_id,
      veiculo_id: data.veiculo_id,
      motorista_id: data.motorista_id,
      motorista_2_id: data.motorista_2_id || null,
      data: data.data,
      hora: data.hora,
      preco: data.preco,
      vagas_disponiveis: veiculo.capacidade,
      status: 'agendada',
      assentos: JSON.stringify(assentos)
    };

    const sql = "INSERT INTO viagens SET ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, insertData, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static update(id, data) {
    const sql = "UPDATE viagens SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [data, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static delete(id) {
    const sql = "DELETE FROM viagens WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static updateVagas(id, vagas) {
    const sql = `UPDATE viagens SET vagas_disponiveis = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [vagas, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // Atualiza o status de um assento específico
  static async updateAssentoStatus(viagemId, numeroAssento, novoStatus) {
    // Buscar a viagem e os assentos atuais
    const viagem = await this.findById(viagemId);
    if (!viagem) throw new Error("Viagem não encontrada");

    let assentos = [];
    try {
      assentos = typeof viagem.assentos === 'string' ? JSON.parse(viagem.assentos) : viagem.assentos;
    } catch (e) {
      assentos = [];
    }

    if (!Array.isArray(assentos)) throw new Error("Erro na estrutura de assentos");

    // Atualizar o assento
    let assentoEncontrado = false;
    assentos = assentos.map(a => {
      if (a.numero == numeroAssento) {
        a.status = novoStatus;
        assentoEncontrado = true;
      }
      return a;
    });

    if (!assentoEncontrado) throw new Error("Assento não encontrado");

    // Recalcular vagas disponíveis
    const vagasDisponiveis = assentos.filter(a => a.status === 'livre').length;

    // Salvar no banco
    const sql = "UPDATE viagens SET assentos = ?, vagas_disponiveis = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [JSON.stringify(assentos), vagasDisponiveis, viagemId], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
