const db = require("../../../dataBase/connect");

class UpdatePagamento {
    async atualizarFormaPagamento(req, res) {
        const pagamentoId = req.params.id; 
        const novaDescricao = req.body.descricao; 
        
        db.query(
            "UPDATE formapagamento SET descricao = ? WHERE id = ?",
            [novaDescricao, pagamentoId],
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ data: "Erro Interno do Servidor" });
                }

                if (result.affectedRows > 0) {
                    return res.status(200).json({ data: "Descrição da forma de pagamento atualizada com sucesso" });
                } else {
                    return res.status(404).json({ data: "Forma de pagamento não encontrada" });
                }
            }
        );
    }
}

module.exports = new UpdatePagamento
