import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const DB = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
