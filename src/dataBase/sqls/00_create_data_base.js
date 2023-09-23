const mysql = require('mysql2');
require('dotenv').config()
// Configuração da conexão com o MySQL

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
})

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL');

    // Criação do banco de dados
    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE}`, (err, result) => {
        if (err) {
            console.error('Erro ao criar o banco de dados:', err);
        } else {
            console.log('Banco de dados criado com sucesso');
        }

        // Encerrar a conexão após a criação do banco de dados
        db.end();
    });
});


