const db = require("../../../dataBase/connect");

class DeletePagamento {
    async deletarPagamento(req, res) {
        const pagamentoId = req.params.id; 
        
        db.query(
            "DELETE FROM formapagamento WHERE id = ?",
            [pagamentoId],
            function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (result.affectedRows > 0) {
                    res.status(200).json({ data: "Forma de pagamento excluída com sucesso" });
                } else {
                    res.status(404).json({ data: "Forma de pagamento não encontrada" });
                }
            }
        );
    }
}

module.exports = new DeletePagamento
