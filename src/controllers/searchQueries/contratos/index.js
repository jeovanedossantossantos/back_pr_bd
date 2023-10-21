const db = require("../../../dataBase/connect")

class Contrato {
    async listarTodosOsContratos(req, res) {
        let resultados = [];

        db.query(
            "SELECT * FROM contratoAluguel"
            ,
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = resultados.concat(results);
                }
            });

        db.query(
            "SELECT * FROM contratoVenda"
            ,
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = resultados.concat(results);
                    if (resultados === null) {
                        return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                    } else {
                        return res.status(200).json({ data: resultados });
                    }
                } else {
                    return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                }
            });
    }

    async listarPorTipoDeContrato(req, res) {
        if (req.body.idTipoContrato !== null) {
            let idTipoContrato = req.body.idTipoContrato;
            let resultados = [];
            let sqlQuery;

            idTipoContrato = parseInt(idTipoContrato);

            if (idTipoContrato === 1) {
                sqlQuery = `
                    SELECT * FROM contratoAluguel 
                `;
            } else if (idTipoContrato === 2) {
                sqlQuery = `
                    SELECT * FROM contratoVenda 
                `;
            } else {
                return res.status(400).json({ data: "Informações Recebidas Inválidas" });
            }

            db.query(sqlQuery, [idTipoContrato],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                        if (resultados === null) {
                            return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                        } else {
                            return res.status(200).json({ data: resultados });
                        }
                    } else {
                        return res.status(200).json({ data: "Nenhum Contrato Encontrado" });
                    }
                });
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }

    async listarPorCargoDeFuncionario(req, res) {

        if (req.body.idCargo !== null) {
            let idCargo = req.body.idCargo;
            let resultados = [];
            let sqlQuery;

            idCargo = parseInt(idCargo);

            sqlQuery = `
                SELECT * FROM contratoAluguel 
                INNER JOIN funcionario  on funcionario.id = contratoAluguel.id_funcionario
                INNER JOIN cargo        on cargo.id = ?
                ORDER BY cargo.id ASC
            `;

            db.query(sqlQuery, [idCargo],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                    }
                });

            sqlQuery = `                           
                SELECT * FROM contratoVenda 
                INNER JOIN funcionario  on funcionario.id = contratoVenda.id_funcionario
                INNER JOIN cargo        on cargo.id = ?
                ORDER BY cargo.id ASC
            `

            db.query(sqlQuery, [idCargo],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                        // Tratar a ordem por cargo
                        if (resultados === null) {
                            return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                        } else {
                            return res.status(200).json({ data: resultados });
                        }
                    } else {
                        return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                    }
                });
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }

    }

    async listarPorFuncionario(req, res) {
        if (req.body.nome !== null) {
            let nome = req.body.nome;
            let resultados = [];
            let sqlQuery;

            sqlQuery = `
                (SELECT contratoAluguel.* FROM contratoAluguel
                INNER JOIN funcionario on funcionario.nome = ?)
            `

            db.query(sqlQuery, [nome],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                    }
                });

            sqlQuery = `
                (SELECT contratoVenda.* FROM contratoVenda
                INNER JOIN funcionario on funcionario.nome = ?)
            `

            db.query(sqlQuery, [nome],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                        if (resultados === null) {
                            return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                        } else {
                            return res.status(200).json({ data: resultados });
                        }
                    } else {
                        return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                    }
                });
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }
}

module.exports = new Contrato;