import { DB } from "../../connection/connection.db.js";

export class ViagensModel {
  static findById(id) {
    const sql = `SELECT * FROM viagens WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
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
}
