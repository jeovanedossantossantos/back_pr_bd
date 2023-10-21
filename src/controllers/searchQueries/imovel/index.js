const db = require("../../../dataBase/connect")

class Imovel {
    async listarTodosImoveis(req, res) {
        let resultados = [];
    
        db.query(
            "SELECT * FROM imovel",
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