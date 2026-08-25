const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const clientesRoutes = require("./routes/clientes.routes");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.listen(port, () => {
  console.log(`Servidor local corriendo en http://localhost:${port}`);
});
