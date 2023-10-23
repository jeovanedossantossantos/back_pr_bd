const db = require('../../dataBase/connect')

class Cliente {

    async createCliente(req, res) {

        const { cidade, bairro, rua, numero } = req.body.endereco

        // Verifica se o enderço já existe
        const sql = `
            SELECT * FROM endereco
            WHERE cidade = ? 
            AND bairro = ? 
            AND rua = ? 
            AND numero = ?;
        `;

        if (!cidade || !bairro || !rua || !numero) {
            return res.status(400).json({ message: "Campos obrigatórios não informados!" });
        }
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

        obterEnderecoId(sql, cidade, bairro, rua, numero)
            .then((endereco_id) => {
                const { cpf, nome, telefone, email, data_nasc, sexo, estado_civil, profissao } = req.body
                const rota = req.originalUrl
                console.log(rota)
                let sql = ''
                let selectSql = ''

                if (rota.replace(/\//g, '') === "proprietario") {
                    sql = `
                    INSERT INTO clienteProprietario (
                        cpf, 
                        nome, 
                        endereco_id, 
                        telefone, 
                        email,
                        data_nasc, 
                        sexo, 
                        estado_civil, 
                        profissao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

                    selectSql = `
                    SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                    FROM clienteProprietario c
                    LEFT JOIN endereco e ON c.endereco_id = e.id
                    WHERE c.id = ?;
                    `;
                }
                if (rota.replace(/\//g, '') === "cliente") {
                    sql = `
                    INSERT INTO clienteUsuario (
                        cpf, 
                        nome, 
                        endereco_id, 
                        telefone, 
                        email,
                        data_nasc, 
                        sexo, 
                        estado_civil, 
                        profissao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

                    selectSql = `
                        SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
                        FROM clienteUsuario c
                        LEFT JOIN endereco e ON c.endereco_id = e.id
                        WHERE c.id = ?;
                        `;
                }

                db.query(sql, [cpf, nome, endereco_id, telefone, email, data_nasc, sexo, estado_civil, profissao], (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao inserir o cliente no banco de dados' });
                    }

                    // Consulta para obter os dados do cliente recém-inserido
                    const clienteId = result.insertId;


                    db.query(selectSql, [clienteId], (err, cliente) => {

                        if (err) {
                            return res.status(500).json({ message: 'Erro ao obter os dados do cliente' });
                        }

                        const clienteData = {
                            id: cliente[0].id,
                            cpf: cliente[0].cpf,
                            nome: cliente[0].nome,
                            telefone: cliente[0].telefone,
                            email: cliente[0].email,
                            data_nasc: cliente[0].data_nasc,
                            sexo: cliente[0].sexo,
                            estado_civil: cliente[0].estado_civil,
                            profissao: cliente[0].profissao,
                            endereco: {
                                id: cliente[0].endereco_id,
                                cidade: cliente[0].cidade,
                                bairro: cliente[0].bairro,
                                rua: cliente[0].rua,
                                numero: cliente[0].numero,
                            },
                        };
                        return res.status(201).json({ message: 'Cliente cadastrado com sucesso', cliente: clienteData });
                    });
                });

            })
            .catch((error) => {
                return res.status(404).json({ message: error });
            });





    }


}

module.exports = new Cliente