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
    CREATE TABLE IF NOT EXISTS clienteProprietario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cpf VARCHAR(14) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        endereco_id INT NOT NULL,
        telefone VARCHAR(15),
        email VARCHAR(100),
        data_nasc DATE NOT NULL,
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
        cpf VARCHAR(14) NOT NULL,
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
        data_nasc DATE NOT NULL,
        sexo ENUM('Masculino', 'Feminino', 'Outro'),
        estado_civil VARCHAR(255),
        profissao VARCHAR(255),
        FOREIGN KEY (endereco_id) REFERENCES endereco(id)

    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table clienteUsuario created");
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
        salario_base DECIMAL(10, 2),
        porcentagem INT NOT NULL,
        UNIQUE (nome,salario_base,porcentagem)
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
    data_nasc DATE NOT NULL,
    data_ingresso DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    usuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255),
    estado_civil VARCHAR(255) NOT NULL,
    cargo_id INT NOT NULL,
    FOREIGN KEY (endereco_id) REFERENCES endereco(id), 
    FOREIGN KEY (cargo_id) REFERENCES cargo(id),
    UNIQUE (cpf)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table funcionario created");
        return
    });
});

// Tabela Imovel
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS imovel (
        id INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    data_construcao DATE NOT NULL,
    fotos TEXT NOT NULL,
    venda BOOLEAN,
    valor_venda DECIMAL(10, 2),
    locacao BOOLEAN,
    valor_locacao DECIMAL(10, 2),
    disponivel BOOLEAN,
    id_status INT NOT NULL,
    id_endereco INT NOT NULL,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Imovel created");
        return
    });
});

//tabela de Registro de Imoveis
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS registroImovel (
        id INT AUTO_INCREMENT PRIMARY KEY,
    id_clientep INT NOT NULL,
    id_imovel INT NOT NULL,
    FOREIGN KEY (id_clientep) REFERENCES clienteProprietario(id), 
    FOREIGN KEY (id_imovel) REFERENCES imovel(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table registroImovel created");
        return
    });
});

// Tabela Forma de Pagamento
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS formaPagamento (
        id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table formaPagamento created");
        return
    });
});

// Tabela Contratos de Aluguel
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS contratoAluguel (
        id INT AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_imovel INT NOT NULL,
    id_clienteu INT NOT NULL,
    id_indic1 INT NOT NULL,
    id_indic2 INT NOT NULL,
    id_fiador INT NOT NULL,
    id_formpag INT NOT NULL,
    data_transacao DATE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id), 
    FOREIGN KEY (id_imovel) REFERENCES imovel(id), 
    FOREIGN KEY (id_clienteu) REFERENCES clienteUsuario(id),
    FOREIGN KEY (id_indic1) REFERENCES indicador(id),
    FOREIGN KEY (id_indic2) REFERENCES indicador(id),
    FOREIGN KEY (id_fiador) REFERENCES fiador(id),
    FOREIGN KEY (id_formpag) REFERENCES formaPagamento(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table contratoAluguel created");
        return
    });
});


// Tabela Contratos de Venda
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS contratoVenda (
        id INT AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_imovel INT NOT NULL,
    id_clienteu INT NOT NULL,
    id_formpag INT NOT NULL,
    data_transacao DATE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id), 
    FOREIGN KEY (id_imovel) REFERENCES imovel(id), 
    FOREIGN KEY (id_clienteu) REFERENCES clienteUsuario(id),
    FOREIGN KEY (id_formpag) REFERENCES formaPagamento(id)
    )
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table contratoVenda created");
        return
    });
});

// Tabela Casa
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS Casa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_imovel INT NOT NULL,
        descricao TEXT NOT NULL,
        qtd_quartos INT NOT NULL,
        qtd_suites INT NOT NULL,
        qtd_sala_estar INT NOT NULL,
        qtd_sala_jantar INT NOT NULL,
        qtd_vagas_garagem INT NOT NULL,
        area_imovel DECIMAL(10, 2) NOT NULL,
        arm_embutido BOOLEAN NOT NULL,
        data_registro DATE NOT NULL,
        data_vendido DATE,
        data_locacao DATE,
        FOREIGN KEY (id_imovel) REFERENCES Imovel(id)
    )
    
        
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Casa created");
        return
    });
});

// Tabela Apartamento
db.connect(function (err) {
    if (err) throw err;

    var sql = `
        CREATE TABLE IF NOT EXISTS Apartamento (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_imovel INT NOT NULL,
            descricao TEXT NOT NULL,
            qtd_quartos INT NOT NULL,
            qtd_suites INT NOT NULL,
            qtd_sala_estar INT NOT NULL,
            qtd_sala_jantar INT NOT NULL,
            qtd_vagas_garagem INT NOT NULL,
            area_imovel DECIMAL(10, 2) NOT NULL,
            arm_embutido BOOLEAN NOT NULL,
            andar INT NOT NULL,
            valor_cond DECIMAL(10, 2) NOT NULL,
            portaria BOOLEAN NOT NULL,
            data_registro DATE NOT NULL,
            data_vendido DATE,
            data_locacao DATE,
            FOREIGN KEY (id_imovel) REFERENCES Imovel(id)
        )
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Apartamento created");
        return;
    });
});

// Tabela SalaComercial
db.connect(function (err) {
    if (err) throw err;

    var sql = `
        CREATE TABLE IF NOT EXISTS SalaComercial (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_imovel INT NOT NULL,
            descricao TEXT NOT NULL,
            qtd_banheiro INT NOT NULL,
            qtd_comodos INT NOT NULL,
            area_imovel DECIMAL(10, 2) NOT NULL,
            data_registro DATE NOT NULL,
            data_vendido DATE,
            data_locacao DATE,
            FOREIGN KEY (id_imovel) REFERENCES Imovel(id)
        )
        `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table SalaComercial created");
        return;
    });
});

// Tabela Terreno
db.connect(function (err) {
    if (err) throw err;

    var sql = `
    CREATE TABLE IF NOT EXISTS Terreno (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_imovel INT NOT NULL,
        descricao TEXT NOT NULL,
        area_imovel DECIMAL(10, 2) NOT NULL,
        largura DECIMAL(10, 2) NOT NULL,
        comprimento DECIMAL(10, 2) NOT NULL,
        aclive_declive VARCHAR(255) NOT NULL,
        data_registro DATE NOT NULL,
        data_vendido DATE,
        data_locacao DATE,
        FOREIGN KEY (id_imovel) REFERENCES Imovel(id)
    )
    `;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Terreno created");
        return;
    });
});


// ALTER TABLE nome_tabela ADD estado VARCHAR(50);

// Tabela endereço
db.connect(function (err) {
    if (err) throw err;

    var sql = "ALTER TABLE endereco ADD estado VARCHAR(50) NOT NULL;";
    db.query(sql, function (err, result) {
        if (err) return err;
        console.log("Table endereco created");
        return
    });
});
