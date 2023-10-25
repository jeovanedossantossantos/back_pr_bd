const db = require("../../../dataBase/connect")

class Imovel {
    async listarTodosImoveis(req, res) {

        db.query(
            `SELECT i.*, e.cidade, e.bairro, e.rua, e.numero, 'Casa' AS tipo, c.qtd_quartos,c.qtd_vagas_garagem,c.area_imovel
            FROM Casa c
            INNER JOIN imovel i ON c.id_imovel = i.id
            LEFT JOIN endereco e ON i.id_endereco = e.id
            UNION ALL
            SELECT i.*, e.cidade, e.bairro, e.rua, e.numero, 'Apartamento' AS tipo, a.qtd_quartos,a.qtd_vagas_garagem,a.area_imovel
            FROM Apartamento a
            INNER JOIN imovel i ON a.id_imovel = i.id
            LEFT JOIN endereco e ON i.id_endereco = e.id
            UNION ALL
            SELECT i.*, e.cidade, e.bairro, e.rua, e.numero, 'Sala Comercial' AS tipo, s.qtd_comodos,s.qtd_banheiro,s.area_imovel
            FROM SalaComercial s
            INNER JOIN imovel i ON s.id_imovel = i.id
            LEFT JOIN endereco e ON i.id_endereco = e.id
            UNION ALL
            SELECT i.*, e.cidade, e.bairro, e.rua, e.numero, 'Terreno' AS tipo, t.area_imovel,t.largura,t.comprimento
            FROM Terreno t
            INNER JOIN imovel i ON t.id_imovel = i.id
            LEFT JOIN endereco e ON i.id_endereco = e.id;
            
`,
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {

                    // Convertendo o atributo fotos para array novamente

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
                            imovel.fotos = JSON.parse(imovel.fotos)
                        }
                        return imovel

                    })

                    return res.status(200).json(response);
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Encontrado" });
                }
            }
        );
    }

    async listarPorPreco(req, res) {
        const vmin = req.body.vmin;
        const vmax = req.body.vmax;
        let resultados = [];

        db.query(
            "SELECT valor_venda, valor_locacao, id FROM imovel WHERE (valor_venda > ? AND valor_venda < ?) OR (valor_locacao > ? AND valor_locacao < ?)",
            [vmin, vmax, vmin, vmax],
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = results;
                    return res.status(200).json({ data: resultados });
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Encontrado" });
                }
            }
        );
    }

    async listarPorEndereco(req, res) {
        const cidade = req.body.cidade;
        const estado = req.body.estado;
        const rua = req.body.rua;

        if (cidade || estado || rua) {
            let conditions = [];
            let values = [];

            if (cidade) {
                conditions.push("e.cidade = ?");
                values.push(cidade);
            }
            if (estado) {
                conditions.push("e.estado = ?");
                values.push(estado);
            }
            if (rua) {
                conditions.push("e.rua = ?");
                values.push(rua);
            }

            const whereClause = conditions.join(" AND ");
            const query = `SELECT * FROM imovel i INNER JOIN endereco e ON i.id_endereco = e.id WHERE ${whereClause}`;

            db.query(query, values, function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    return res.status(200).json({ data: results });
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Encontrado com o endereço especificado" });
                }
            });
        } else {
            res.status(400).json({ data: "Nenhum parâmetro de endereço fornecido" });
        }
    }

    async listarPorStatus(req, res) {
        const idStatus = req.params.id_status;
        let resultados = [];

        db.query(
            "SELECT * FROM imovel WHERE id_status = ?",
            [idStatus],
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = results;
                    return res.status(200).json({ data: resultados });
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Encontrado com o status especificado" });
                }
            }
        );
    }

    async listarParaVenda(req, res) {
        const venda = req.body.venda;
        const disponivel = req.body.disponivel;
        let resultados = [];

        db.query(
            "SELECT * FROM imovel WHERE venda = ? AND disponivel = ?",
            [venda, disponivel],
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = results;
                    return res.status(200).json({ data: resultados });
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Disponível para Venda Encontrado" });
                }
            }
        );
    }

    async listarParaLocacao(req, res) {
        let resultados = [];

        db.query(
            "SELECT * FROM imovel WHERE locacao = 1 AND disponivel = 1",
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = results;
                    return res.status(200).json({ data: resultados });
                } else {
                    return res.status(404).json({ data: "Nenhum Imóvel Disponível para Locação Encontrado" });
                }
            }
        );
    }





}

module.exports = new Imovel;