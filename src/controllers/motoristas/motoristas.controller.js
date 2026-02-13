import { MotoristasModel } from "../../database/models/motoristas/motoristas.model.js";

export class MotoristasController {
  static async getAll(req, res) {
    try {
      const motoristas = await MotoristasModel.getAll();
      res.status(200).json({ success: true, data: motoristas });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao listar motoristas", error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const motorista = await MotoristasModel.getById(id);
      if (!motorista) {
        res.status(404).json({ message: "Motorista não encontrado" });
        return;
      }
      res.status(200).json({ success: true, data: motorista });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar motorista", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { nome, email, telefone, genero, numero_carta, bilhete_identidade, telefone_contato } = req.body;
      
      if (!nome || !telefone || !genero) {
        res
          .status(400)
          .json({ message: "Nome, telefone e gênero são obrigatórios" });
        return;
      }

      const validGeneros = ['masculino', 'feminino', 'outro'];
      if (!validGeneros.includes(genero.toLowerCase())) {
        res.status(400).json({ message: "Gênero inválido. Use: masculino, feminino ou outro" });
        return;
      }

      const data = {
        nome,
        email,
        telefone,
        genero: genero.toLowerCase(),
        numero_carta,
        bilhete_identidade,
        telefone_contato
      };

      const result = await MotoristasModel.create(data);
      res.status(201).json({
        success: true,
        message: "Motorista criado com sucesso",
        id: result.insertId,
      });
    } catch (error) {
      // Check for duplicate entry error (for email or telefone)
      if (error.code === 'ER_DUP_ENTRY') {
         res.status(409).json({ message: "Email ou telefone já cadastrado", error: error.message });
         return;
      }

      res
        .status(500)
        .json({ message: "Erro ao criar motorista", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, genero, numero_carta, bilhete_identidade, telefone_contato } = req.body;

      if (!nome || !telefone || !genero) {
        res
          .status(400)
          .json({ message: "Nome, telefone e gênero são obrigatórios" });
        return;
      }

      const validGeneros = ['masculino', 'feminino', 'outro'];
      if (!validGeneros.includes(genero.toLowerCase())) {
        res.status(400).json({ message: "Gênero inválido. Use: masculino, feminino ou outro" });
        return;
      }

      const data = {
        nome,
        email,
        telefone,
        genero: genero.toLowerCase(),
        numero_carta,
        bilhete_identidade,
        telefone_contato
      };

      await MotoristasModel.update(id, data);
      res.status(200).json({ success: true, message: "Motorista atualizado com sucesso" });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
         res.status(409).json({ message: "Email ou telefone já cadastrado", error: error.message });
         return;
      }
      res
        .status(500)
        .json({ message: "Erro ao atualizar motorista", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await MotoristasModel.delete(id);
      res.status(200).json({ success: true, message: "Motorista excluído com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao excluir motorista", error: error.message });
    }
  }
}
