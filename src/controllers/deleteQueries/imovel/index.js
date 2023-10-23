const db = require("../../../dataBase/connect")


// deletar imovel pela ID do imovel
class Imovel {
    async deleteImovel(req, res) {
        const id = req.params.id;
        const sql = "DELETE FROM imovel WHERE id = ?";
        db.query(sql, id, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else if (result.affectedRows > 0) {
                return res.status(200).json({ data: "Imóvel Deletado" });
            } else {
                return res.status(404).json({ data: "Imóvel Não Encontrado" });
            }
        });
    }
}

