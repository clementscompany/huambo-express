import { DB } from "../../connection/connection.db.js";

export class RotasModel {
  static getAll() {
    const sql = "SELECT * FROM rotas ORDER BY id DESC";
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static getById(id) {
    const sql = "SELECT * FROM rotas WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  }

  static create(data) {
    const sql =
      "INSERT INTO rotas (origem, destino, distancia_km, duracao_minutos, status) VALUES (?, ?, ?, ?, ?)";
    const values = [
      data.origem,
      data.destino,
      data.distancia_km !== undefined && data.distancia_km !== null
        ? data.distancia_km
        : null,
      data.duracao_minutos !== undefined && data.duracao_minutos !== null
        ? data.duracao_minutos
        : null,
      data.status || "ativa",
    ];
    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static update(id, data) {
    const sql =
      "UPDATE rotas SET origem = ?, destino = ?, distancia_km = ?, duracao_minutos = ?, status = ? WHERE id = ?";
    const values = [
      data.origem,
      data.destino,
      data.distancia_km !== undefined && data.distancia_km !== null
        ? data.distancia_km
        : null,
      data.duracao_minutos !== undefined && data.duracao_minutos !== null
        ? data.duracao_minutos
        : null,
      data.status || "ativa",
      id,
    ];
    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static delete(id) {
    const sql = "DELETE FROM rotas WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

