const db = require("../../../dataBase/connect")

class Funcionario {
    async listarTodosFuncionarios(req, res) {
        db.query("SELECT * FROM funcionario", function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else {
                if (results.length > 0) {
                    const response = results.map(e => {
                        delete e.senha
                        return e
                    })
                    res.status(200).json({ data: response });
                } else {
                    res.status(404).json({ data: "Nenhum Funcionário Encontrado" });
                }
            }
        });
    }

    async listarFuncionarioIdade(req, res) {
        const { idade } = req.query
        if (idade !== undefined) { // Certifique-se de verificar a chave correta no corpo da solicitação, como "idade".
            //let idade = req.body.idade;

            db.query(
                "SELECT * FROM funcionario WHERE YEAR(CURDATE()) - YEAR(data_nasc) >= ?",
                [idade],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else {
                        if (results.length > 0) {
                            const response = results.map(e => {
                                delete e.senha
                                return e
                            })
                            res.status(200).json({ data: response });
                        } else {
                            res.status(404).json({ data: "Nenhum Funcionário Encontrado com essa idade" });
                        }
                    }
                }
            );
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }

    async listarFuncionarioDataIngresso(req, res) {
        const { dataIngresso } = req.query
        if (dataIngresso !== undefined) {


            db.query(
                "SELECT * FROM funcionario WHERE data_ingresso <= ?",
                [dataIngresso],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else {
                        if (results.length > 0) {
                            const response = results.map(e => {
                                delete e.senha
                                return e
                            })
                            res.status(200).json({ data: response });
                        } else {
                            res.status(404).json({ data: "Nenhum Funcionário Encontrado com essa data de ingresso" });
                        }
                    }
                }
            );
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }

    async listarFuncionarioEndereco(req, res) {
        const { cidade, bairro, rua, numero } = req.query; // Use req.query para parâmetros na URL.

        const conditions = [];
        const params = [];

        if (cidade) {
            conditions.push("e.cidade = ?");
            params.push(cidade);
        }

        if (bairro) {
            conditions.push("e.bairro = ?");
            params.push(bairro);
        }

        if (rua) {
            conditions.push("e.rua = ?");
            params.push(rua);
        }

        if (numero) {
            conditions.push("e.numero = ?");
            params.push(numero);
        }

        if (conditions.length === 0) {
            return res.status(400).json({ data: "Nenhuma informação de endereço fornecida" });
        }

        const whereClause = conditions.join(" OR ");
        const sqlQuery = `
            SELECT f.*
            FROM funcionario AS f
            JOIN endereco AS e ON f.endereco_id = e.id
            WHERE ${whereClause}
        `;

        db.query(sqlQuery, params, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ data: results });
                } else {
                    res.status(404).json({ data: "Nenhum Funcionário Encontrado com essas informações de endereço" });
                }
            }
        });
    }


    async listarFuncionarioCargo(req, res) {

        const { cargo } = req.query
        console.log(cargo)
        if (cargo !== undefined) {
            // let cargoNome = req.body.cargoNome;

            const sql = `
            SELECT f.* 
                FROM funcionario AS 
                    f JOIN cargo AS 
                        c ON f.cargo_id = c.id 
                            WHERE c.nome = ?
            `


            db.query(
                sql,
                [cargo],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else {
                        if (results.length > 0) {
                            const response = results.map(e => {
                                delete e.senha
                                return e
                            })
                            res.status(200).json({ data: response });
                        } else {
                            res.status(404).json({ data: "Nenhum Funcionário Encontrado com esse cargo" });
                        }
                    }
                }
            );
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }
}
module.exports = new Funcionario;