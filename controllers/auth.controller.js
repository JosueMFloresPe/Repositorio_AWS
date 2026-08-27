const pool = require("../config/db");

const processLogin = async (req, res) => {
  const { user, password } = req.body;

  try {
    const consulta =
      "SELECT * FROM users WHERE u_name = $1 AND u_password = $2";
    const resultado = await pool.query(consulta, [user, password]);

    if (resultado.rows.length > 0) {
      res.redirect("/clientes");
    } else {
      res.send(`
        <div style="text-align: center; font-family: 'DM Sans', sans-serif; margin-top: 50px; background: #eef2f4; height: 100vh; padding-top: 100px;">
          <h2 style="color: #cf6912;">Credenciales incorrectas</h2>
          <p style="color: #687386;">El usuario o la contraseña no coinciden en la base de datos.</p>
          <a href="/" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #f28c28; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">Volver al Login</a>
        </div>
      `);
    }
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { processLogin };
