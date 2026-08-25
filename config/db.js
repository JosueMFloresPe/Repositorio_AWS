const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sistema_cobros",
  password: "1234",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("Conectado a PostgreSQL exitosamente"))
  .catch((err) => console.error("Error conectando a PostgreSQL", err.stack));

module.exports = pool;
