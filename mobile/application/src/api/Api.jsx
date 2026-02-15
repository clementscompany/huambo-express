import { AppEnv } from "../env/env";

export class Api {
  static async ListarRotas() {
    try {
      const getData = await fetch(`${AppEnv.server_url}/rotas`, { method: "GET" })
      if (!getData.ok) {
        return Promise.reject("Erro ao processar os dados" + getData.status);
      }
      const response = await getData.json();
      return response;
    } catch (error) {
      console.log("Erro ao listar as Rotas do App");
    }
  }
}