import { DB } from "./connection/connection.db.js";

import {
  createTableUsers,
  createTableMotoristas,
  createTableVeiculos,
  createTableRotas,
  createTableAssentos,
  createTableViagens,
  createTableReservas,
  createTablePagamentos,
  createTableNotificacoes
} from "./sql/querys.js";

///// Criar o banco de dados e as tabelas
export async function CreateDatabase() {
  const tables = [
    { name: "usuarios", query: createTableUsers },
    { name: "motoristas", query: createTableMotoristas },
    { name: "veiculos", query: createTableVeiculos },
    { name: "rotas", query: createTableRotas },
    { name: "assentos", query: createTableAssentos },
    { name: "viagens", query: createTableViagens },
    { name: "reservas", query: createTableReservas },
    { name: "pagamentos", query: createTablePagamentos },
    { name: "notificacoes", query: createTableNotificacoes },
  ];

  for (const table of tables) {
    await new Promise((resolve, reject) => {
      DB.query(table.query, (err) => {
        if (err) {
          console.error(`Erro ao criar a tabela ${table.name}:`, err);
          reject(err);
        } else {
          console.log(`Tabela ${table.name} criada com sucesso`);
          resolve();
        }
      });
    });
  }

  console.log("Banco de dados criado com sucesso!");
}
