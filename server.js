const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const clientsRoutes = require("./routes/clients.routes");
const debtsRoutes = require("./routes/debts.routes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/auth", authRoutes);
app.use("/api/clientes", clientsRoutes);
app.use("/api/deudas", debtsRoutes);

app.get("/clientes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "clientes.html"));
});

app.get("/deudas", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "deudas.html"));
});

app.listen(port, () => {
  console.log(`Servidor local corriendo en http://localhost:${port}`);
});
