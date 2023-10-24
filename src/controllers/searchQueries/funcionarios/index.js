const db = require("../../../dataBase/connect")

class Funcionario {
    async listarTodosFuncionarios(req, res) {
        db.query("SELECT * FROM funcionario", function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else {
                if (results.length > 0) {
                    res.status(200).json({ data: results });
                } else {
                    res.status(404).json({ data: "Nenhum Funcionário Encontrado" });
                }
            }
        });
    }
    
    async listarFuncionarioIdade(req, res) {
        const {idade} = req.query
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
                            res.status(200).json({ data: results });
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
        const {dataIngresso} = req.query
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
                            res.status(200).json({ data: results });
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
        // /funcionaraio?cidade=Cruz da Almas&rua=tabela&bairro=centro&numero=10
        const {cidade, rua, bairro, numero} = req.query
        if (cidade !== undefined && bairro !== undefined && rua !== undefined && numero !== undefined) {
            // let cidade = req.body.cidade;
            // let bairro = req.body.bairro;
            // let rua = req.body.rua;
            // let numero = req.body.numero;
            
    
            db.query(
                "SELECT f.* FROM funcionario AS f " +
                "JOIN endereco AS e ON f.endereco_id = e.id " +
                "WHERE e.cidade = ? AND e.bairro = ? AND e.rua = ? AND e.numero = ?",
                [cidade, bairro, rua, numero],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else {
                        if (results.length > 0) {
                            res.status(200).json({ data: results });
                        } else {
                            res.status(404).json({ data: "Nenhum Funcionário Encontrado com esse endereço" });
                        }
                    }
                }
            );
        } else {
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    }
    
    async listarFuncionarioCargo(req, res) {

        const {cargoNome} = req.query
        console.log(cargoNome)
        if (cargoNome !== undefined) { 
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
                [cargoNome],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    } else {
                        if (results.length > 0) {
                            res.status(200).json({ data: results });
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