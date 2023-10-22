const db = require('../../../dataBase/connect')

class ListImovel {

    async listImovel(req, res) {

        const id_client = Number(req.params.id_client)


        db.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            }

            // Consulta SQL
            const sql = `
    SELECT
        c.id,
        i.data_construcao,
        i.fotos,
        i.venda,
        i.valor_venda,
        i.locacao,
        i.valor_locacao,
        i.disponivel,
        i.id_status,
        e.id AS endereco_id,
        e.cidade,
        e.bairro,
        e.rua,
        e.numero,
        'Casa' AS tipo_imovel
    FROM Casa c
    INNER JOIN imovel i ON c.id = i.id
    LEFT JOIN endereco e ON i.id_endereco = e.id
    WHERE i.id IN (
        SELECT ri.id_imovel
        FROM registroImovel ri
        WHERE ri.id_clientep = ?
    )
    UNION ALL
    SELECT
        a.id,
        i.data_construcao,
        i.fotos,
        i.venda,
        i.valor_venda,
        i.locacao,
        i.valor_locacao,
        i.disponivel,
        i.id_status,
        e.id AS endereco_id,
        e.cidade,
        e.bairro,
        e.rua,
        e.numero,
        'Apartamento' AS tipo_imovel
    FROM Apartamento a
    INNER JOIN imovel i ON a.id = i.id
    LEFT JOIN endereco e ON i.id_endereco = e.id
    WHERE i.id IN (
        SELECT ri.id_imovel
        FROM registroImovel ri
        WHERE ri.id_clientep = ?
    )
    UNION ALL
    SELECT
        s.id,
        i.data_construcao,
        i.fotos,
        i.venda,
        i.valor_venda,
        i.locacao,
        i.valor_locacao,
        i.disponivel,
        i.id_status,
        e.id AS endereco_id,
        e.cidade,
        e.bairro,
        e.rua,
        e.numero,
        'Sala Comercial' AS tipo_imovel
    FROM SalaComercial s
    INNER JOIN imovel i ON s.id = i.id
    LEFT JOIN endereco e ON i.id_endereco = e.id
    WHERE i.id IN (
        SELECT ri.id_imovel
        FROM registroImovel ri
        WHERE ri.id_clientep = ?
    )
    UNION ALL
    SELECT
        t.id,
        i.data_construcao,
        i.fotos,
        i.venda,
        i.valor_venda,
        i.locacao,
        i.valor_locacao,
        i.disponivel,
        i.id_status,
        e.id AS endereco_id,
        e.cidade,
        e.bairro,
        e.rua,
        e.numero,
        'Terreno' AS tipo_imovel
    FROM Terreno t
    INNER JOIN imovel i ON t.id = i.id
    LEFT JOIN endereco e ON i.id_endereco = e.id
    WHERE i.id IN (
        SELECT ri.id_imovel
        FROM registroImovel ri
        WHERE ri.id_clientep = ?
    );
`;


            // Executar a consulta
            db.query(sql, [id_client, id_client, id_client, id_client], (err, results) => {
                if (err) {
                    console.error('Erro na consulta SQL:', err);
                    return;
                }

                // Processar os resultados

                const response = results.map(imovel => {
                    const endereco = {
                        cidade: imovel.cidade,
                        bairro: imovel.bairro,
                        rua: imovel.rua,
                        numero: imovel.numero
                    };

                    // Remover campos individuais do objeto imovel
                    delete imovel.cidade;
                    delete imovel.bairro;
                    delete imovel.rua;
                    delete imovel.numero;

                    // Adicionar o objeto de endereço ao imovel
                    imovel.endereco = endereco;
                    if (typeof imovel.fotos === 'string') {
                        imovel.fotos = JSON.parse(imovel.fotos);
                    }
                    return imovel;
                });
                return res.status(200).json(response);


            });
        });


    }

    async listaImovelClienteUser(req, res) {
        const id_client = Number(req.params.id_client)
        db.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            }

            // Consulta SQL para listar os imóveis alugados pelo cliente
            const sql = `
            SELECT
            c.id,
            i.data_construcao,
            i.fotos,
            i.venda,
            i.valor_venda,
            i.locacao,
            i.valor_locacao,
            i.disponivel,
            i.id_status,
            e.id AS endereco_id,
            e.cidade,
            e.bairro,
            e.rua,
            e.numero,
            'Casa' AS tipo_imovel,
            fp.descricao AS forma_pagamento
        FROM contratoAluguel ca
        INNER JOIN Casa c ON ca.id_imovel = c.id
        INNER JOIN imovel i ON c.id = i.id
        LEFT JOIN endereco e ON i.id_endereco = e.id
        LEFT JOIN formaPagamento fp ON ca.id_formpag = fp.id
        WHERE ca.id_clienteu = ?
        
        UNION ALL
        
        SELECT
            a.id,
            i.data_construcao,
            i.fotos,
            i.venda,
            i.valor_venda,
            i.locacao,
            i.valor_locacao,
            i.disponivel,
            i.id_status,
            e.id AS endereco_id,
            e.cidade,
            e.bairro,
            e.rua,
            e.numero,
            'Apartamento' AS tipo_imovel,
            fp.descricao AS forma_pagamento
        FROM contratoAluguel ca
        INNER JOIN Apartamento a ON ca.id_imovel = a.id
        INNER JOIN imovel i ON a.id = i.id
        LEFT JOIN endereco e ON i.id_endereco = e.id
        LEFT JOIN formaPagamento fp ON ca.id_formpag = fp.id
        WHERE ca.id_clienteu = ?
        
        UNION ALL
        
        SELECT
            s.id,
            i.data_construcao,
            i.fotos,
            i.venda,
            i.valor_venda,
            i.locacao,
            i.valor_locacao,
            i.disponivel,
            i.id_status,
            e.id AS endereco_id,
            e.cidade,
            e.bairro,
            e.rua,
            e.numero,
            'Sala Comercial' AS tipo_imovel,
            fp.descricao AS forma_pagamento
        FROM contratoAluguel ca
        INNER JOIN SalaComercial s ON ca.id_imovel = s.id
        INNER JOIN imovel i ON s.id = i.id
        LEFT JOIN endereco e ON i.id_endereco = e.id
        LEFT JOIN formaPagamento fp ON ca.id_formpag = fp.id
        WHERE ca.id_clienteu = ?
        
        UNION ALL
        
        SELECT
            t.id,
            i.data_construcao,
            i.fotos,
            i.venda,
            i.valor_venda,
            i.locacao,
            i.valor_locacao,
            i.disponivel,
            i.id_status,
            e.id AS endereco_id,
            e.cidade,
            e.bairro,
            e.rua,
            e.numero,
            'Terreno' AS tipo_imovel,
            fp.descricao AS forma_pagamento
        FROM contratoAluguel ca
        INNER JOIN Terreno t ON ca.id_imovel = t.id
        INNER JOIN imovel i ON t.id = i.id
        LEFT JOIN endereco e ON i.id_endereco = e.id
        LEFT JOIN formaPagamento fp ON ca.id_formpag = fp.id
        WHERE ca.id_clienteu = ?;
        
`;


            // Executar a consulta
            db.query(sql, [id_client, id_client, id_client, id_client, id_client], (err, results) => {
                if (err) {
                    console.error('Erro na consulta SQL:', err);
                    return;
                }

                // Processar os resultados
                const response = results.map(imovel => {
                    const endereco = {
                        cidade: imovel.cidade,
                        bairro: imovel.bairro,
                        rua: imovel.rua,
                        numero: imovel.numero
                    };

                    // Remover campos individuais do objeto imovel
                    delete imovel.cidade;
                    delete imovel.bairro;
                    delete imovel.rua;
                    delete imovel.numero;

                    // Adicionar o objeto de endereço ao imovel
                    imovel.endereco = endereco;
                    if (typeof imovel.fotos === 'string') {
                        imovel.fotos = JSON.parse(imovel.fotos);
                    }
                    return imovel;
                });
                return res.status(200).json(response);
            });
        });

    }
}

module.exports = new ListImovel