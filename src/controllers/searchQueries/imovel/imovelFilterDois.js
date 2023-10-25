const db = require('../../../dataBase/connect');

class FilterImovel {
    async filterImovel(req, res) {
        const id_client = Number(req.params.id_client);
        const data_construcao = req.query.data_construcao;

        db.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
            }

            // Crie condições SQL com base nos parâmetros de data
            const conditions = [];

            if (data_construcao) {
                conditions.push(`i.data_construcao = '${data_construcao}'`);
            }

            // Construa a consulta SQL com base nas condições
            const sql = `
            
        SELECT
        i.id,
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
        INNER JOIN imovel i ON c.id_imovel = i.id
        LEFT JOIN endereco e ON i.id_endereco = e.id
        WHERE i.id IN (
            SELECT ri.id_imovel
            FROM registroImovel ri
            WHERE ri.id_clientep = ?
        )
        ${conditions.length ? `AND (${conditions.join(' OR ')})` : ''}
     
UNION ALL

SELECT
i.id,
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
INNER JOIN imovel i ON a.id_imovel = i.id
LEFT JOIN endereco e ON i.id_endereco = e.id
WHERE i.id IN (
    SELECT ri.id_imovel
    FROM registroImovel ri
    WHERE ri.id_clientep = ?
)
${conditions.length ? `AND (${conditions.join(' OR ')})` : ''}

UNION ALL

SELECT
    i.id,
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
    'SalaComercial' AS tipo_imovel
FROM SalaComercial s
INNER JOIN imovel i ON s.id_imovel = i.id
LEFT JOIN endereco e ON i.id_endereco = e.id
WHERE i.id IN (
    SELECT ri.id_imovel
    FROM registroImovel ri
    WHERE ri.id_clientep = ?
)
${conditions.length ? `AND (${conditions.join(' OR ')})` : ''}

UNION ALL

SELECT
    i.id,
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
INNER JOIN imovel i ON t.id_imovel = i.id
LEFT JOIN endereco e ON i.id_endereco = e.id
WHERE i.id IN (
    SELECT ri.id_imovel
    FROM registroImovel ri
    WHERE ri.id_clientep = ?
)
${conditions.length ? `AND (${conditions.join(' OR ')})` : ''}


        

            `;

            db.query(sql, [id_client, id_client, id_client, id_client, id_client], (err, results) => {
                if (err) {
                    console.error('Erro na consulta SQL:', err);
                    return res.status(500).json({ error: 'Erro na consulta SQL' });
                }

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

module.exports = new FilterImovel();
