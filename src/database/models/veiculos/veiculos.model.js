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
}