import { RotasModel } from "../../database/models/rotas/rotas.model.js";

export class RotasController {
  static async getAll(req, res) {
    try {
      const rotas = await RotasModel.getAll();
      res.status(200).json({ success: true, data: rotas });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao listar rotas", error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const rota = await RotasModel.getById(id);
      if (!rota) {
        res.status(404).json({ message: "Rota não encontrada" });
        return;
      }
      res.status(200).json({ success: true, data: rota });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar rota", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { origem, destino, distancia_km, duracao_minutos, status } =
        req.body;
      if (!origem || !destino) {
        res
          .status(400)
          .json({ message: "Origem e destino são obrigatórios" });
        return;
      }
      if (distancia_km !== undefined && distancia_km !== null) {
        if (Number(distancia_km) < 0) {
          res
            .status(400)
            .json({ message: "Distância não pode ser negativa" });
          return;
        }
      }
      if (duracao_minutos !== undefined && duracao_minutos !== null) {
        if (Number(duracao_minutos) < 0) {
          res
            .status(400)
            .json({ message: "Duração não pode ser negativa" });
          return;
        }
      }
      const normalizedStatus =
        status && status.toLowerCase() === "inativa" ? "inativa" : "ativa";
      const data = {
        origem,
        destino,
        distancia_km:
          distancia_km !== undefined && distancia_km !== null && distancia_km !== ""
            ? distancia_km
            : null,
        duracao_minutos:
          duracao_minutos !== undefined &&
            duracao_minutos !== null &&
            duracao_minutos !== ""
            ? duracao_minutos
            : null,
        status: normalizedStatus,
      };
      const result = await RotasModel.create(data);
      res.status(201).json({
        success: true,
        message: "Rota criada com sucesso",
        id: result.insertId,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar rota", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { origem, destino, distancia_km, duracao_minutos, status } =
        req.body;
      if (!origem || !destino) {
        res
          .status(400)
          .json({ message: "Origem e destino são obrigatórios" });
        return;
      }
      if (distancia_km !== undefined && distancia_km !== null) {
        if (Number(distancia_km) < 0) {
          res
            .status(400)
            .json({ message: "Distância não pode ser negativa" });
          return;
        }
      }
      if (duracao_minutos !== undefined && duracao_minutos !== null) {
        if (Number(duracao_minutos) < 0) {
          res
            .status(400)
            .json({ message: "Duração não pode ser negativa" });
          return;
        }
      }
      const existing = await RotasModel.getById(id);
      if (!existing) {
        res.status(404).json({ message: "Rota não encontrada" });
        return;
      }
      const normalizedStatus =
        status && status.toLowerCase() === "inativa" ? "inativa" : "ativa";
      const data = {
        origem,
        destino,
        distancia_km:
          distancia_km !== undefined && distancia_km !== null && distancia_km !== ""
            ? distancia_km
            : null,
        duracao_minutos:
          duracao_minutos !== undefined &&
            duracao_minutos !== null &&
            duracao_minutos !== ""
            ? duracao_minutos
            : null,
        status: normalizedStatus,
      };
      await RotasModel.update(id, data);
      res
        .status(200)
        .json({ success: true, message: "Rota atualizada com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar rota", error: error.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      const existing = await RotasModel.getById(id);
      if (!existing) {
        res.status(404).json({ message: "Rota não encontrada" });
        return;
      }
      const result = await RotasModel.delete(id);
      if (result.affectedRows === 0) {
        res.status(404).json({ message: "Rota não encontrada" });
        return;
      }
      res
        .status(200)
        .json({ success: true, message: "Rota removida com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao remover rota", error: error.message });
    }
  }
}
