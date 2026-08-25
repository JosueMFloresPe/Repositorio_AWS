const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'AQUI_IRA_EL_ENDPOINT_DE_RDS',
    user: 'AQUI_IRA_EL_USUARIO',
    password: 'AQUI_IRA_LA_PASSWORD',
    database: 'NOMBRE_DE_LA_BD'
});

module.exports = pool;