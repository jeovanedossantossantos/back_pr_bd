const db = require('../../connect')


// Tabela endereço
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS endereco (id INT AUTO_INCREMENT PRIMARY KEY,cidade VARCHAR(100) NOT NULL,bairro VARCHAR(50) NOT NULL,rua VARCHAR(100) NOT NULL,numero INT,UNIQUE (cidade, bairro, rua, numero))";
    db.query(sql, function (err, result) {
        if (err) return err;
        console.log("Table endereco created");
        return
    });
});


// Tabela ClienteProprietario
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `
    CREATE TABLE IF NOT EXISTS clienteProprietario (id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(14) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        endereco_id INT NOT NULL,
        telefone VARCHAR(15),
        email VARCHAR(100),
        sexo ENUM('Masculino', 'Feminino', 'Outro'),
        estado_civil VARCHAR(20),
        profissao VARCHAR(100),
        UNIQUE (cpf, email),
        FOREIGN KEY (endereco_id) REFERENCES endereco(id))
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table clienteProprietario created");
        return
    });
});