const pool = require("../config/db");

const listarClientes = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM clientes ORDER BY id ASC",
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener clientes de la base de datos" });
  }
};

const obtenerCliente = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM clientes WHERE id = $1", [
      req.params.id,
    ]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

const crearCliente = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;

  if (!nombre || !email || !telefono || !direccion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO clientes (nombre, email, telefono, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre.trim(), email.trim(), telefono.trim(), direccion.trim()],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

const actualizarCliente = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;

  if (!nombre || !email || !telefono || !direccion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      "UPDATE clientes SET nombre = $1, email = $2, telefono = $3, direccion = $4 WHERE id = $5 RETURNING *",
      [nombre.trim(), email.trim(), telefono.trim(), direccion.trim(), req.params.id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const resultado = await pool.query(
      "DELETE FROM clientes WHERE id = $1 RETURNING id",
      [req.params.id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

module.exports = {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
