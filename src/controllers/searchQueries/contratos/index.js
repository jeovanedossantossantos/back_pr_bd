const db = require("../../../dataBase/connect")

module.exports = {
    async listarTodosOsContratos(req, res) {

        let resultados=[];

        db.query(
            "SELECT * FROM contratoAluguel"
        ,
        function(err, results) {
            if(err){
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            }else if(results.length > 0){
                resultados = resultados.concat(results)
                // results.forEach(dado => {
                //     resultados.add(dado);
                // });
            }
        });

        db.query(
            "SELECT * FROM contratoVenda"
            ,
            function(err, results) {
                if(err){
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                }else if(results.length > 0){
                    console.log(results)
                    resultados = resultados.concat(results)

                    // results.forEach(dado => {
                    //     resultados.add(dado);
                    // });
                }
                if (resultados === null) {
                    return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
                } else {
                    return res.status(200).json({ data: resultados });
                }
            });
    },

    async listarPorTipoDeContrato(req, res) {

        if(req.body.idTipoContrato !== null){
            let idTipoContrato = req.body.idTipoContrato;
            let sqlQuery;

            if(idTipoContrato === 1){
                sqlQuery = `
                    SELECT * FROM contratoAluguel 
                `    
            }else if(idTipoContrato === 2){
                sqlQuery = `
                    SELECT * FROM contratoVenda 
                `  
            }else{
                return res.status(400).json({ data: "Informações Recebidas Inválidas" });
            }

            resultados = db.query(sqlQuery, [idTipoContrato],
                function(err, results, fields) {
                    console.log(err);
                    return res.status(500).json({ data: "Erro Interno do Servidor" });
                });

            if (resultados === null) {
                return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
            } else {
                return res.status(200).json({ data: resultados });
            }

        }else{
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    },

    async listarPorCargoDeFuncionario(req, res) {

        if(req.body.idCargo !== null){
            let cargoId = req.body.idCargo;
            let sqlQuery;
            let resultados;

            //Solicitando os dados das tabela de Contrato e Fazendo a União das mesmas
            sqlQuery = `
                (SELECT * FROM contratoAluguel 
                INNER JOIN funcionario  on funcionario.id = contratoAluguel.id_funcionario
                INNER JOIN cargo        on cargo.id = ?)
                UNION
                (SELECT * FROM contratoVenda 
                INNER JOIN funcionario  on funcionario.id = contratoVenda.id_funcionario
                INNER JOIN cargo        on cargo.id = ?)
                ORDER BY cargo.id ASC
            `;

            resultados = db.query(sqlQuery, [cargoId, cargoId],
                function(err, results, fields) {
                    console.log(err);
                    return res.status(500).json({ data: "Erro Interno do Servidor" });
                });

            if (resultados === null) {
                return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
            } else {
                return res.status(200).json({ data: resultados });
            }

        }else{
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }

    },

    async listarPorFuncionario(req, res) {
        if(req.body.nome !== null){
            let nome = req.body.nome;
            let resultados;
            let sqlQuery;
            
            sqlQuery = `
                (SELECT * FROM contratoAluguel
                INNER JOIN funcionario on funcionario.nome = ?)
                UNION
                (SELECT * FROM contratoVenda
                INNER JOIN funcionario on funcionario.nome = ?)
            `

            resultados = db.query(sqlQuery, [nome],
                function(err, results, fields) {
                    console.log(err);
                    return res.status(500).json({ data: "Erro Interno do Servidor" });
                });

            if (resultados === null) {
                return res.status(404).json({ data: "Nenhum Contrato Encontrado" });
            } else {
                return res.status(200).json({ data: resultados });
            }

        }else{
            return res.status(400).json({ data: "Informações Recebidas Inválidas" });
        }
    },
}