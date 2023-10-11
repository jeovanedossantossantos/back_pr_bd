const db = require('../../connect')


// Tabela endereço
db.connect(function (err) {
    if (err) throw err;

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

// Tabela fiador
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS fiador (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(14) NOT NULL,
        nome VARCHAR(255),
        endereco_id INT NOT NULL,
        telefone VARCHAR(15),
        email VARCHAR(255),
        sexo ENUM('Masculino', 'Feminino', 'Outro'),
        estado_civil VARCHAR(255),
        profissao VARCHAR(255)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table fiador created");
        return
    });
});

// Tabela Indicador
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS indicador (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255),
        profissao VARCHAR(255)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table indicador created");
        return
    });
});

// Tabela clienteUsuario
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS clienteUsuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(14) NOT NULL,
        nome VARCHAR(255),
        endereco_id INT NOT NULL,
        telefone VARCHAR(15),
        email VARCHAR(255),
        sexo ENUM('Masculino', 'Feminino', 'Outro'),
        estado_civil VARCHAR(255),
        profissao VARCHAR(255),
        fiador_id INT, 
        FOREIGN KEY (endereco_id) REFERENCES endereco(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table clienteUsuario created");
        return
    });
});

// Tabela Indicacao
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS indicacao (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_usuario_id INT,
        indicador_id INT,
        FOREIGN KEY (cliente_usuario_id) REFERENCES ClienteUsuario(id),
        FOREIGN KEY (indicador_id) REFERENCES indicador(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table indicacao created");
        return
    });
});

// Tabela Cargo
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS cargo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255),
        salario_base DECIMAL(10, 2)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table cargo created");
        return
    });
});


// Tabela Funcionario
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS funcionario (
        id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15),
    cpf VARCHAR(14) NOT NULL,
    endereco_id INT NOT NULL,
    data_engresso DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255),
    cargo_id INT NOT NULL,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id), 
    FOREIGN KEY (cargo_id) REFERENCES cargo(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table funcionario created");
        return
    });
});

