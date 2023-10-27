const db = require("../../../dataBase/connect");

class CreatePagamento {
    async criarFormaPagamento(req, res) {
        const {descricao} = req.body; 
        
        const novaFormaPagamento = {
            descricao
        };

        db.query(
            "INSERT INTO formapagamento SET ?",
            novaFormaPagamento,
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ data: "Erro Interno do Servidor" });
                }

                const novoId = result.insertId;
                return res.status(201).json({ data: "Forma de pagamento criada com sucesso", novoId });
            }
        );
    }
}

module.exports = new CreatePagamento
