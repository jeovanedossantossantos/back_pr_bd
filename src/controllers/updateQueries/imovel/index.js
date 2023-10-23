const db = require("../../../dataBase/connect")

class Imovel {
    async updateImovel(req, res) {
        const id = req.params.id;
        const sql = "UPDATE imovel SET ? WHERE id = ?";
        db.query(sql, [req.body, id], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else if (result.affectedRows > 0) {
                return res.status(200).json({ data: "Imóvel Atualizado" });
            } else {
                return res.status(404).json({ data: "Imóvel Não Encontrado" });
            }
        });
        
    }
}