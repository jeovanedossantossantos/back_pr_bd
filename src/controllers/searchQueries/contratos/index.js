const db = require("../../../dataBase/connect")

class Contrato {
    async listarTodosOsContratos(req, res) {
        let resultados = [];

        db.query(
            "SELECT ca.id, ca.data_transacao FROM contratoAluguel ca"
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
            "SELECT cv.id, cv.data_transacao FROM contratoVenda cv"
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
                    SELECT ca.id, ca.data_transacao FROM contratoAluguel ca
                `;
            } else if (idTipoContrato === 2) {
                sqlQuery = `
                    SELECT cv.id, cv.data_transacao FROM contratoVenda cv
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
                SELECT ca.id, ca.data_transacao FROM contratoAluguel ca
                INNER JOIN funcionario  on funcionario.id = ca.id_funcionario
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
                SELECT cv.id, cv.data_transacao FROM contratoVenda cv
                INNER JOIN funcionario  on funcionario.id = cv.id_funcionario
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
                (SELECT ca.id, ca.data_transacao FROM contratoAluguel ca
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
                (SELECT cv.id, cv.data_transacao FROM contratoVenda cv
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

    async listarPorCliente(req, res) {
        if (req.body.cpfCliente !== null) {
            let cpfCliente = req.body.cpfCliente;
            let resultados = [];
            let sqlQuery;

            sqlQuery = `
                SELECT ca.id, ca.data_transacao FROM contratoAluguel ca
                INNER JOIN imovel i                 on i.id = ca.id_imovel
                INNER JOIN registroImovel ri        on ri.id_imovel = i.id
                INNER JOIN clienteProprietario cp   on cp.id = ri.id_clientep
                WHERE cp.cpf = ?
            `

            db.query(sqlQuery, [cpfCliente],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                    }
                });

            sqlQuery = `
                SELECT cv.id, cv.data_transacao FROM contratoVenda cv
                INNER JOIN imovel i                 on i.id = cv.id_imovel
                INNER JOIN registroImovel ri        on ri.id_imovel = i.id
                INNER JOIN clienteProprietario cp   on cp.id = ri.id_clientep
                WHERE cp.cpf = ?
                `

            db.query(sqlQuery, [cpfCliente],
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

    async detalharContrato(req, res) {
        if (req.body.idContrato !== null) {
            let idContrato = req.body.idContrato;
            let resultados = [];
            let sqlQuery;

            idContrato = parseInt(idContrato);

            sqlQuery = `
                SELECT * FROM contratoAluguel ca
                WHERE ca.id = ? 
                `

            db.query(sqlQuery, [idContrato],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else if (results.length > 0) {
                        resultados = resultados.concat(results);
                    }
                });

            sqlQuery = `
                SELECT * FROM contratoVenda cv
                WHERE cv.id = ? 
                `

            db.query(sqlQuery, [idContrato],
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