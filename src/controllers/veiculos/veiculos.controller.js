import { VeiculosModel } from "../../database/models/veiculos/veiculos.model.js"; 
export class VeiculosController {
  static async getAll(req, res) {
    try {
      const veiculos = await VeiculosModel.getAll();
      res.json(veiculos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async create(req, res) {
    try {
      const veiculo = req.body;
      const result = await VeiculosModel.create(veiculo);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}