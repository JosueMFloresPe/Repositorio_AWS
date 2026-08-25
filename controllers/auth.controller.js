const processLogin = (req, res) => {
  const { user, password } = req.body;

  if (user === "admin" && password === "1234") {
    res.redirect("/dashboard");
  } else {
    res.send(`
      <div style="text-align: center; font-family: Arial; margin-top: 50px;">
        <h2 style="color: red;">Credenciales incorrectas</h2>
        <a href="/">Volver al Login</a>
      </div>
    `);
  }
};

module.exports = { processLogin };
