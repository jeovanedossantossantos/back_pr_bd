const db = require('../../connect')
const bcrypt = require('bcrypt')
// Inserindo cargo
db.connect(function (err) {
    if (err) throw err;

    var sql = ` INSERT IGNORE INTO cargo (
        nome, 
        salario_base,
        porcentagem
        ) VALUES ('Gerente de Vendas', 5000.00,1);

    `;
    db.query(sql, function (err, result) {
        if (err) return err;
        console.log("Dados inseridos com seucesso na tabela cargo");
        return
    });
});

// Inserindo endereço
db.connect(function (err) {
    if (err) throw err;

    var sql = `

    INSERT INTO endereco (cidade, bairro, rua, numero)
    VALUES ('São Paulo', 'Jardim Paulista', 'Avenida Paulista', 123);

    `;
    db.query(sql, function (err, result) {
        if (err) return err;
        console.log("Dados inseridos com seucesso na tabela endereco");
        return
    });
});

// Inserindo funcionario
db.connect(async function (err) {
    if (err) throw err;

    try {
        const senha_hash = await bcrypt.hash("senha123", 10);
        console.log(senha_hash);

        var sql = `
            INSERT INTO funcionario (
                nome, 
                telefone, 
                cpf, 
                endereco_id, 
                data_ingresso, 
                email, 
                usuario, 
                senha, 
                estado_civil, 
                cargo_id
            )
            VALUES (
                'Jeovane', 
                '123-456-7890', 
                '123.456.789-01', 
                1, 
                '2023-10-16', 
                'email@example.com', 
                'jeovane', 
                ?,    -- Utilize um placeholder para a senha_hash
                'Solteiro', 
                1
            );
        `;

        db.query(sql, [senha_hash], function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log("Dados inseridos com sucesso na tabela funcionario");
            }
        });
    } catch (error) {
        console.error(error);
    }
});
