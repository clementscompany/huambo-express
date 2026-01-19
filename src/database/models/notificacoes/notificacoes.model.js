import { DB } from "../../connection/connection.db.js";

export class NotificacoesModel {
  static create(data) {
    const sql = `INSERT INTO notificacoes (usuario_id, titulo, mensagem) VALUES (?, ?, ?)`;
    const values = [data.usuario_id, data.titulo, data.mensagem];
    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static markAsRead(id) {
    const sql = `UPDATE notificacoes SET lida = TRUE WHERE id = ?`;
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  
  static listByUser(userId) {
      const sql = `SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY criado_em DESC`;
      return new Promise((resolve, reject) => {
          DB.query(sql, [userId], (err, results) => {
              if(err) reject(err);
              else resolve(results);
          })
      })
  }
}
