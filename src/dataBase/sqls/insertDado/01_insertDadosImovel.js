const db = require('../../connect')

// const imovel_1 = JSON.stringify([
//     "https://portal.loft.com.br/wp-content/uploads/2022/11/modelo-casa-simples-shutterstock-1024x768.jpg",
//     "https://portal.loft.com.br/wp-content/uploads/2022/11/modelo-casa-simples-planta-shutterstock-1024x1024.jpg"
// ])

// // Inserindo imovel
// db.connect(function (err) {
//     if (err) return console.error(err);

//     const sql = `

//     INSERT INTO endereco (cidade, bairro, rua, numero)
//     VALUES ('Cruz das almas', 'inoocop', 'primeira', 123);

//     `;
//     // criar endereço, imovel e Associar Imóveis a Clientes Proprietários
//     db.query(sql, function (err, result) {
//         if (err) return console.error(err);
//         const id_endereco = result.insertId
//         console.log("Dados inseridos com seucesso na tabela endereco");
//         const sql1 = ` INSERT IGNORE INTO imovel (
//             data_construcao, 
//             fotos,
//             venda,
//             valor_venda,
//             locacao,
//             valor_locacao,
//             disponivel,
//             id_endereco
//             ) VALUES ('2012-02-03', ?,false,0,1,800,true, ?);

//         `;
//         console.log(result.insertId);
//         // Cria o imovel
//         db.query(sql1, [imovel_1, id_endereco], function (err, result) {
//             if (err) return console.error(err);;
//             console.log("Dados inseridos com seucesso na tabela imovel");

//             const sql = `
//             INSERT INTO registroImovel (
//                 id_clientep, 
//                 id_imovel)
//                 VALUES
//                 (1, ?);

//             `
//             // Associar Imóveis a Clientes Proprietários
//             db.query(sql, [result.insertId], function (err, result) {
//                 if (err) return console.error(err);;
//                 console.log("Dados inseridos com seucesso na tabela Associar Imóveis a Clientes Proprietários");
//                 return
//             });
//             const sql2 = `INSERT INTO Casa (
//                 id_imovel, 
//                 descricao, 
//                 qtd_quartos, 
//                 qtd_suites, 
//                 qtd_sala_estar, 
//                 qtd_sala_jantar, 
//                 qtd_vagas_garagem, 
//                 area_imovel, 
//                 arm_embutido, 
//                 data_registro)
//             VALUES
//             (?, 'Casa para vender', 4, 3, 2, 1, 2, 250.50, false, '2023-02-20');
//             `
//             db.query(sql2, [result.insertId], function (err, result) {
//                 if (err) return console.error(err);;
//                 console.log("Dados inseridos com seucesso na tabela casa");
//                 return
//             })
//             return
//         });

//         return
//     });





// });

const imovel_1 = JSON.stringify([
    "https://imobiliariacenterhome.com.br/img_imovel/1502-imobiliaria-lages-1502-5vWBl/sala-comercial--GYH0.jpg",
    "https://www.agvilleimoveis.com.br/uploads/imovel/galeria/big-db6cfc7e4dc3f1cdd51ddd376a396d2f.jpg"
])

db.connect(function (err) {
    if (err) return console.error(err);

    const sql = `

    INSERT INTO endereco (cidade, bairro, rua, numero, estado)
    VALUES ('Cruz das almas', 'centro', 'Avenida principal', 16,'BA');

    `;
    // criar endereço, imovel e Associar Imóveis a Clientes Proprietários
    db.query(sql, function (err, result) {
        if (err) return console.error(err);
        const id_endereco = result.insertId
        console.log("Dados inseridos com seucesso na tabela endereco");
        const sql1 = ` INSERT IGNORE INTO imovel (
            data_construcao, 
            fotos,
            venda,
            valor_venda,
            locacao,
            valor_locacao,
            disponivel,
            id_endereco
            ) VALUES ('2023-02-03', ?,true,40000,false,0,true, ?);
    
        `;
        console.log(result.insertId);
        // Cria o imovel
        db.query(sql1, [imovel_1, id_endereco], function (err, result) {
            if (err) return console.error(err);;
            console.log("Dados inseridos com seucesso na tabela imovel");

            const sql = `
            INSERT INTO registroImovel (
                id_clientep, 
                id_imovel)
                VALUES
                (2, ?);
            
            `
            // Associar Imóveis a Clientes Proprietários
            db.query(sql, [result.insertId], function (err, result) {
                if (err) return console.error(err);;
                console.log("Dados inseridos com seucesso na tabela Associar Imóveis a Clientes Proprietários");
                return
            });
            const sql2 = `INSERT INTO SalaComercial (
                id_imovel, 
                descricao,  
                qtd_banheiro,
                qtd_comodos,
                area_imovel,
                data_registro)
            VALUES
            (?, 'Sala comercial', 3, 3, 500, '2018-02-03');
            `
            db.query(sql2, [result.insertId], function (err, result) {
                if (err) return console.error(err);;
                console.log("Dados inseridos com seucesso na tabela casa");
                return
            })
            return
        });

        return
    });





});