import { DB } from "../../connection/connection.db.js";

export class ReservasModel {
  static listarTodas() {
    const sql = `SELECT * FROM reservas`;
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static listarTodasDetalhadas() {
    const sql = `
      SELECT r.*, v.data, v.hora, v.preco, 
             u.nome as usuario_nome, u.telefone as usuario_telefone,
             o.origem, o.destino
      FROM reservas r
      JOIN viagens v ON r.viagem_id = v.id
      JOIN rotas o ON v.rota_id = o.id
      JOIN usuarios u ON r.usuario_id = u.id
      ORDER BY r.criado_em DESC
    `;
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static listarPorUsuario(usuarioId) {
    const sql = `
      SELECT r.*, v.data, v.hora, o.origem, o.destino 
      FROM reservas r
      JOIN viagens v ON r.viagem_id = v.id
      JOIN rotas o ON v.rota_id = o.id
      WHERE r.usuario_id = ?
      ORDER BY r.criado_em DESC
    `;
    return new Promise((resolve, reject) => {
      DB.query(sql, [usuarioId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static create(data) {
    const sql = `INSERT INTO reservas (usuario_id, viagem_id, assento_id, status) VALUES (?, ?, ?, ?)`;
    const values = [data.usuario_id, data.viagem_id, data.assento_id, 'pendente'];
    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static updateStatus(id, status) {
    const sql = `UPDATE reservas SET status = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [status, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static findById(id) {
    const sql = `SELECT * FROM reservas WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }
  
  static findPendingAndExpired(minutes) {
      // Find pending reservations created more than X minutes ago
      const sql = `
        SELECT * FROM reservas 
        WHERE status = 'pendente' 
        AND criado_em < DATE_SUB(NOW(), INTERVAL ? MINUTE)
      `;
      return new Promise((resolve, reject) => {
          DB.query(sql, [minutes], (err, results) => {
              if(err) reject(err);
              else resolve(results);
          });
      });
  }

    static findPendingNearTrip(hours) {
        // Find pending reservations where trip is in X hours
        const sql = `
            SELECT r.*, v.data, v.hora 
            FROM reservas r
            JOIN viagens v ON r.viagem_id = v.id
            WHERE r.status = 'pendente'
            AND TIMESTAMP(v.data, v.hora) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? HOUR)
        `;
        return new Promise((resolve, reject) => {
            DB.query(sql, [hours], (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });
    }
}
