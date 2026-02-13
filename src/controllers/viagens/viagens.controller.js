import { ViagensModel } from "../../database/models/viagens/viagens.model.js";

export class ViagensController {
  static async getAll(req, res) {
    try {
      const viagens = await ViagensModel.getAll();
      res.status(200).json({ success: true, data: viagens });
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar viagens", error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const viagem = await ViagensModel.findById(id);
      if (!viagem) {
        res.status(404).json({ message: "Viagem não encontrada" });
        return;
      }
      res.status(200).json({ success: true, data: viagem });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar viagem", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const data = req.body;
      
      // Validação básica
      if (!data.rota_id || !data.veiculo_id || !data.motorista_id || !data.data || !data.hora || !data.preco) {
        res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
        return;
      }

      const result = await ViagensModel.create(data);
      res.status(201).json({ success: true, message: "Viagem criada com sucesso", id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar viagem", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      
      // Não permitimos atualizar assentos por aqui, apenas via updateSeatStatus ou lógica específica
      delete data.assentos; 
      delete data.vagas_disponiveis; // Calculado automaticamente

      const result = await ViagensModel.update(id, data);
      res.status(200).json({ success: true, message: "Viagem atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar viagem", error: error.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      await ViagensModel.delete(id);
      res.status(200).json({ success: true, message: "Viagem removida com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover viagem", error: error.message });
    }
  }

  static async updateSeat(req, res) {
    try {
        const { id } = req.params; // Viagem ID
        const { numero, status } = req.body; // Numero do assento e novo status

        if(!numero || !status) {
            return res.status(400).json({ message: "Número do assento e status são obrigatórios" });
        }

        const validStatus = ['livre', 'ocupado', 'pendente'];
        if(!validStatus.includes(status)) {
            return res.status(400).json({ message: "Status inválido. Use: livre, ocupado, pendente" });
        }

        await ViagensModel.updateAssentoStatus(id, numero, status);
        res.status(200).json({ success: true, message: "Assento atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar assento", error: error.message });
    }
  }
}
