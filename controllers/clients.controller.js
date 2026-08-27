const pool = require("../config/db");

const listarClientes = async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM clients ORDER BY cl_id ASC",
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
    const resultado = await pool.query(
      "SELECT * FROM clients WHERE cl_id = $1",
      [req.params.id],
    );

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
  const { cl_name, cl_email, cl_phone, cl_address } = req.body;

  if (!cl_name || !cl_email || !cl_phone || !cl_address) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO clients (cl_name, cl_email, cl_phone, cl_address) VALUES ($1, $2, $3, $4) RETURNING *",
      [cl_name.trim(), cl_email.trim(), cl_phone.trim(), cl_address.trim()],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

const actualizarCliente = async (req, res) => {
  const { cl_name, cl_email, cl_phone, cl_address } = req.body;

  if (!cl_name || !cl_email || !cl_phone || !cl_address) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      "UPDATE clients SET cl_name = $1, cl_email = $2, cl_phone = $3, cl_address = $4 WHERE cl_id = $5 RETURNING *",
      [
        cl_name.trim(),
        cl_email.trim(),
        cl_phone.trim(),
        cl_address.trim(),
        req.params.id,
      ],
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
      "DELETE FROM clients WHERE cl_id = $1 RETURNING cl_id",
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
