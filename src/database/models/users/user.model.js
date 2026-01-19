import { DB } from "../../connection/connection.db.js";

class UserModel {

  static create(data) {
    const sql = `
      INSERT INTO usuarios (nome, email, telefone, senha, tipo)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      data.nome,
      data.email || null,
      data.telefone,
      data.senha,
      data.tipo || "cliente"
    ];

    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // 🔹 Buscar todos usuários
  static findAll() {
    const sql = `SELECT * FROM usuarios WHERE ativo = TRUE`;

    return new Promise((resolve, reject) => {
      DB.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // 🔹 Buscar usuário por ID
  static findById(id) {
    const sql = `SELECT * FROM usuarios WHERE id = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  }

  // 🔹 Buscar por email ou telefone (login)
  static findByLogin(login) {
    const sql = `
      SELECT * FROM usuarios
      WHERE email = ? OR telefone = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      DB.query(sql, [login, login], (err, result) => {
        if (err) reject(err);
        else resolve(result[0]);
      });
    });
  }

  // 🔹 Atualizar usuário
  static update(id, data) {
    const sql = `
      UPDATE usuarios
      SET nome = ?, email = ?, telefone = ?, tipo = ?, ativo = ?
      WHERE id = ?
    `;

    const values = [
      data.nome,
      data.email,
      data.telefone,
      data.tipo,
      data.ativo,
      id
    ];

    return new Promise((resolve, reject) => {
      DB.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  // 🔹 Desativar usuário (soft delete)
  static deactivate(id) {
    const sql = `UPDATE usuarios SET ativo = FALSE WHERE id = ?`;

    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

export default UserModel;
