const db = require('../../connect')
const bcrypt = require('bcrypt')
// Inserindo cargo
db.connect(function (err) {
    if (err) throw err;

    var sql = ` INSERT IGNORE INTO cargo (
        nome, 
        salario_base,
        porcentagem
        ) VALUES ('Vendedor', 1320,1);

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

    INSERT INTO endereco (cidade, bairro, rua, numero, estado)
    VALUES ('Salvador', 'Fazenda couto', 'Avenida principal', 15);

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
        const senha_hash = await bcrypt.hash("senha12", 10);


        var sql = `
            INSERT INTO funcionario (
                nome, 
                telefone, 
                cpf, 
                endereco_id,
                data_nasc, 
                data_ingresso, 
                email, 
                usuario, 
                senha, 
                estado_civil, 
                cargo_id
            )
            VALUES (
                'Manuela Alves', 
                '123-456-7899', 
                '123.456.789-03', 
                1,
                '1997-02-01', 
                '2020-10-16', 
                'alves@example.com', 
                'manuela', 
                ?,    -- Utilize um placeholder para a senha_hash
                'Casada', 
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
