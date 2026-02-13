import { DB } from "../../connection/connection.db.js";

export class VeiculosModel {
  static getAll() {
    const sql = "SELECT * FROM veiculos";
    return new Promise((resolve, reject) => {
      DB.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }


  static create(veiculo) {
    const sql = "INSERT INTO veiculos SET ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, veiculo, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getById(id) {
    const sql = "SELECT * FROM veiculos WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static update(id, veiculo) {
    const sql = "UPDATE veiculos SET ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [veiculo, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static delete(id) {
    const sql = "DELETE FROM veiculos WHERE id = ?";
    return new Promise((resolve, reject) => {
      DB.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}