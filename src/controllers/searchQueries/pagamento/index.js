const db = require("../../../dataBase/connect")

class Pagamento{
    async listarPagamento(res) {
        let resultados = [];
    
        db.query(
            "SELECT * FROM formapagamento",
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    resultados = results;
                    return res.status(200).json({ data: resultados });
                } else {
                    return res.status(404).json({ data: "Nenhum Pagamento Encontrado" });
                }
            }
        );
    }

}

module.exports = new Pagamento