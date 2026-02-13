
import { DB } from "../connection/connection.db.js";

const updateViagensTable = async () => {
  console.log("Iniciando atualização da tabela 'viagens'...");

  const queries = [
    // Adicionar motorista_2_id
    `
    SELECT count(*) as col_exists 
    FROM information_schema.columns 
    WHERE table_name = 'viagens' 
    AND column_name = 'motorista_2_id' 
    AND table_schema = DATABASE();
    `,
    `
    ALTER TABLE viagens 
    ADD COLUMN motorista_2_id INT NULL AFTER motorista_id,
    ADD CONSTRAINT fk_viagens_motorista_2 FOREIGN KEY (motorista_2_id) REFERENCES motoristas(id);
    `,
    // Adicionar assentos (JSON)
    `
    SELECT count(*) as col_exists 
    FROM information_schema.columns 
    WHERE table_name = 'viagens' 
    AND column_name = 'assentos' 
    AND table_schema = DATABASE();
    `,
    `
    ALTER TABLE viagens 
    ADD COLUMN assentos JSON NULL AFTER vagas_disponiveis;
    `
  ];

  try {
    // Check and Add motorista_2_id
    const checkMot2 = await new Promise((resolve, reject) => {
      DB.query(queries[0], (err, res) => err ? reject(err) : resolve(res[0].col_exists));
    });

    if (checkMot2 === 0) {
      await new Promise((resolve, reject) => {
        DB.query(queries[1], (err) => err ? reject(err) : resolve());
      });
      console.log("Coluna 'motorista_2_id' adicionada.");
    } else {
      console.log("Coluna 'motorista_2_id' já existe.");
    }

    // Check and Add assentos
    const checkAssentos = await new Promise((resolve, reject) => {
      DB.query(queries[2], (err, res) => err ? reject(err) : resolve(res[0].col_exists));
    });

    if (checkAssentos === 0) {
      await new Promise((resolve, reject) => {
        DB.query(queries[3], (err) => err ? reject(err) : resolve());
      });
      console.log("Coluna 'assentos' adicionada.");
    } else {
      console.log("Coluna 'assentos' já existe.");
    }

    console.log("Atualização concluída com sucesso.");
    process.exit(0);

  } catch (error) {
    console.error("Erro ao atualizar tabela viagens:", error);
    process.exit(1);
  }
};

updateViagensTable();
