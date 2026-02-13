import { DB } from "../../connection/connection.db.js";

export class MotoristasModel {
  static getAll() {
    const sql = "SELECT * FROM motoristas ORDER BY id DESC";
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static getById(id) {
    const sql = "SELECT * FROM motoristas WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  }

  static create(data) {
    const sql =
      "INSERT INTO motoristas (nome, email, telefone, genero, numero_carta, bilhete_identidade, telefone_contato) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      data.nome,
      data.email || null,
      data.telefone,
      data.genero,
      data.numero_carta || null,
      data.bilhete_identidade || null,
      data.telefone_contato || null
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
      "UPDATE motoristas SET nome = ?, email = ?, telefone = ?, genero = ?, numero_carta = ?, bilhete_identidade = ?, telefone_contato = ? WHERE id = ?";
    const values = [
      data.nome,
      data.email || null,
      data.telefone,
      data.genero,
      data.numero_carta || null,
      data.bilhete_identidade || null,
      data.telefone_contato || null,
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
    const sql = "DELETE FROM motoristas WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
