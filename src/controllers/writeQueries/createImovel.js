const db = require('../../dataBase/connect')

class Imovel{

    async createImovel(req,res){

        const { cidade, bairro, rua, numero, imovelDataEdif } = req.body.endereco

        // Verifica se o enderço já existe
        const sql = `
            SELECT * FROM endereco
            WHERE cidade = ? 
            AND bairro = ? 
            AND rua = ? 
            AND numero = ?;
            AND Data_Construcao = ?
        `;

        if(!cidade || !bairro || !rua || !numero || !imovelDataEdif){
            return res.status(400).json({message: "Campos obrigatórios não informados!"});
        }

        //consulta o id do endereço
        const obterEnderecoId = (sql, cidade, bairro, rua, numero) => {
            return new Promise((resolve, reject) => {
                db.query(sql, [cidade, bairro, rua, numero], (err, result) => {
                    if (err) {
                        reject(err);
                    }

                    if (result.length > 0) {
                        resolve(result[0].id);
                    } else {
                        // Endereço não encontrado, insira um novo endereço
                        const insertSQL = `
                            INSERT INTO endereco (cidade, bairro, rua, numero)
                            VALUES (?, ?, ?, ?);
                        `;

                        db.query(insertSQL, [cidade, bairro, rua, numero], (err, insertResult) => {
                            if (err) {
                                reject("Erro na inserção do novo endereço.");
                            } else {
                                // Retorne o ID do novo endereço inserido
                                resolve(insertResult.insertId);
                            }
                        });
                    }
                });
            });
        };

        //consulta o id do endereço
        obterEnderecoId(sql, cidade, bairro, rua, numero)
            .then((endereco_id) => {
                const {imovelId, pictureName, imovelDataEdif} = req.body
                const rota = req.originalUrl
                console.log(rota)
                let sql = ''   
                let selectSql = ''
                if (rota.replace(/\//g, '') === "casa") {
                    sql = `
                    INSERT INTO imovel (
                        endereco_id,
                        proprietario_id,
                        imovelId,
                        pictureName,
                        imovelDataEdif,
                        valor_locacao,
                        valor_venda,
                        quartos,
                        suites,
                        salas_estar,
                        salas_jantar,
                        garagem_vagas,
                        area,
                        banheiros,
                        presenca_armario_embutido,
                        descricao,
                        id_status,
                        venda,
                        locacao,
                        disponivel,
                        data_cadastro,
                        `;
                    selectSql = `
                        SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                        FROM clienteProprietario c
                        LEFT JOIN endereco e ON c.endereco_id = e.id
                        WHERE c.id = ?;
                        `;
                }
                if (rota.replace(/\//g, '') === "apartamento") {
                    sql = `
                    INSERT INTO imovel (
                        endereco_id,
                        proprietario_id,
                        imovelId,
                        pictureName,
                        imovelDataEdif,
                        valor_locacao,
                        valor_venda,
                        quartos,
                        suites,
                        salas_estar,
                        salas_jantar,
                        garagem_vagas,
                        area,
                        presenca_armario_embutido,
                        banheiros,
                        vagas,
                        descricao,
                        venda,
                        locacao,
                        disponivel,
                        data_cadastro,
                        valor_condominio,
                        portaria_24h,
                    `;
                    selectSql = `
                        SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                        FROM clienteProprietario c
                        LEFT JOIN endereco e ON c.endereco_id = e.id
                        WHERE c.id = ?;
                    `;
                }
                if (rota.replace(/\//g, '') === "terreno"){
                    sql = `
                    INSERT INTO imovel (
                        endereco_id,
                        proprietario_id,
                        imovelId,
                        pictureName,
                        imovelDataEdif,
                        area,
                        valor_venda,
                        largura,
                        cumprimento,
                        venda,
                        locacao,
                        disponivel,
                        data_cadastro,
                        aclive_declive_presenca,
                    `;
                    selectSql = `
                        SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                        FROM clienteProprietario c
                        LEFT JOIN endereco e ON c.endereco_id = e.id
                        WHERE c.id = ?;
                    `;
                }
                if (rota.replace(/\//g, '') === "pontoComercial"){
                    sql = `
                    INSERT INTO imovel (
                        endereco_id,
                        proprietario_id,
                        imovelId,
                        pictureName,
                        imovelDataEdif,
                        valor_locacao,
                        valor_venda,
                        area,
                        banheiros,
                        comodos.
                        descricao,
                        venda,
                        locacao,
                        data_cadastro,
                        `;
                    selectSql = `
                        SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                        FROM clienteProprietario c
                        LEFT JOIN endereco e ON c.endereco_id = e.id
                        WHERE c.id = ?;
                    `;
                }

                db.query(sql, [cidade, bairro, rua, numero, imovelId, pictureName, imovelDataEdif], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao inserir o imóvel no banco de dados' });
                    }

                    // Recupera o imóvel inserido
                    const imovelId = result.insertId;

                    db.query(selectSql, [imovelId], (err, imovel) => {
                    
                        if(err){
                            return res.status(500).json({message: 'Erro ao obter os dados do imóvel'})
                        }

                        const imovelData = {
                            id: imovelId,
                            endereco: {
                                id: imovel[0].endereco_id,
                                cidade: imovel[0].cidade,
                                bairro: imovel[0].bairro,
                                rua: imovel[0].rua,
                                numero: imovel[0].numero,
                            imovelDataEdif: imovel[0].imovelDataEdif,
                            pictureName: imovel[0].pictureName,
                            },
                        };
                        return res.status(201).json({message: 'Imóvel cadastrado com sucesso!'});
                    });
                });
            })
            .catch((err) => {
                return res.status(500).json({ message: err });
            });
}
}

module.exports = new Imovel()