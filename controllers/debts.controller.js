const pool = require("../config/db");

const listarDeudas = async (req, res) => {
  try {
    const consulta = `
      SELECT d.*, c.cl_name 
      FROM debts d 
      JOIN clients c ON d.clients_id = c.cl_id 
      ORDER BY d.dt_id ASC
    `;
    const resultado = await pool.query(consulta);
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las deudas" });
  }
};

const obtenerDeuda = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM debts WHERE dt_id = $1", [
      req.params.id,
    ]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Deuda no encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la deuda" });
  }
};

const crearDeuda = async (req, res) => {
  const { clients_id, dt_amount, dt_status, due_date } = req.body;

  if (!clients_id || !dt_amount) {
    return res
      .status(400)
      .json({ error: "El cliente y el monto son obligatorios" });
  }

  try {
    const resultado = await pool.query(
      "INSERT INTO debts (clients_id, dt_amount, dt_status, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [clients_id, dt_amount, dt_status || "PENDIENTE", due_date || null],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la deuda" });
  }
};

const actualizarDeuda = async (req, res) => {
  const { clients_id, dt_amount, dt_status, due_date } = req.body;

  try {
    const resultado = await pool.query(
      "UPDATE debts SET clients_id = $1, dt_amount = $2, dt_status = $3, due_date = $4 WHERE dt_id = $5 RETURNING *",
      [clients_id, dt_amount, dt_status, due_date, req.params.id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Deuda no encontrada" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la deuda" });
  }
};

const eliminarDeuda = async (req, res) => {
  try {
    const resultado = await pool.query(
      "DELETE FROM debts WHERE dt_id = $1 RETURNING dt_id",
      [req.params.id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Deuda no encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la deuda" });
  }
};

module.exports = {
  listarDeudas,
  obtenerDeuda,
  crearDeuda,
  actualizarDeuda,
  eliminarDeuda,
};
