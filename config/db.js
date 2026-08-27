require("dotenv").config({ path: ".env.local" });

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

pool
  .connect()
  .then(() => console.log("Conectado a PostgreSQL exitosamente"))
  .catch((err) => console.error("Error conectando a PostgreSQL", err.stack));

module.exports = pool;
