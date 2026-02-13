import { VeiculosModel } from "../../database/models/veiculos/veiculos.model.js"; 
export class VeiculosController {
  static async getAll(req, res) {
    try {
      const veiculos = await VeiculosModel.getAll();
      res.json({ success: true, data: veiculos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async create(req, res) {
    try {
      const veiculo = req.body;
      const result = await VeiculosModel.create(veiculo);
      res.status(201).json({ success: true, message: "Veículo criado com sucesso", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const veiculo = await VeiculosModel.getById(id);
      if (!veiculo) {
        return res.status(404).json({ message: "Veículo não encontrado" });
      }
      res.json({ success: true, data: veiculo });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const veiculo = req.body;
      const result = await VeiculosModel.update(id, veiculo);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Veículo não encontrado" });
      }
      res.json({ success: true, message: "Veículo atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      const result = await VeiculosModel.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Veículo não encontrado" });
      }
      res.json({ success: true, message: "Veículo removido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}