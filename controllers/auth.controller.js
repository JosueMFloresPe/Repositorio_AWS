const pool = require("../config/db");

const processLogin = async (req, res) => {
  const { user, password } = req.body;

  try {
    const consulta =
      "SELECT * FROM usuarios WHERE username = $1 AND password = $2";
    const resultado = await pool.query(consulta, [user, password]);

    if (resultado.rows.length > 0) {
      res.redirect("/dashboard");
    } else {
      res.send(`
        <div style="text-align: center; font-family: Arial; margin-top: 50px;">
          <h2 style="color: red;">Credenciales incorrectas</h2>
          <a href="/">Volver al Login</a>
        </div>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { processLogin };
