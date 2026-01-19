import { DB } from "../../connection/connection.db.js";

export class PagamentosModel {
  static create(data) {
    const sql = `INSERT INTO pagamentos (reserva_id, metodo, valor, referencia, status) VALUES (?, ?, ?, ?, ?)`;
    const values = [data.reserva_id, data.metodo, data.valor, data.referencia, data.status || 'pendente'];
    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static updateStatus(id, status) {
    const sql = `UPDATE pagamentos SET status = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [status, id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  
  static findByReservaId(reservaId) {
      const sql = `SELECT * FROM pagamentos WHERE reserva_id = ?`;
      return new Promise((resolve, reject) => {
          DB.query(sql, [reservaId], (err, results) => {
              if(err) reject(err);
              else resolve(results);
          });
      });
  }
}
