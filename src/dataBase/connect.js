const mysql = require('mysql2');
require('dotenv').config()
// Configuração da conexão com o MySQL

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL');

    // Criação do banco de dados
});

module.exports = db;
