const db = require("../../../dataBase/connect");

class Imovel {
    async deleteImovel(req, res) {
        const id = req.params.id;
        const imovelSql = "DELETE FROM imovel WHERE id = ?";

        db.query(imovelSql, id, function (err, imovelResult) {
            if (err) {
                console.log(err);
                res.status(500).json({ data: "Erro Interno do Servidor" });
            } else if (imovelResult.affectedRows > 0) {
                // If the property (Imovel) was found and deleted from the "imovel" table, proceed to search and delete it in other property type tables.
                const propertyTypeSqls = [
                    "DELETE FROM Casa WHERE id_imovel = ?",
                    "DELETE FROM Apartamento WHERE id_imovel = ?",
                    "DELETE FROM SalaComercial WHERE id_imovel = ?",
                    "DELETE FROM Terreno WHERE id_imovel = ?"
                ];

                // Execute the deletion queries for all property type tables
                const deletePromises = propertyTypeSqls.map(sql => new Promise((resolve, reject) => {
                    db.query(sql, id, (err, result) => {
                        if (err) {
                            console.log(`Error deleting from property type table: ${sql}`);
                            resolve(false);
                        } else {
                            resolve(result.affectedRows > 0);
                        }
                    });
                }));

                // Wait for all delete operations to complete
                Promise.all(deletePromises)
                    .then(results => {
                        if (results.some(success => success)) {
                            // If any property type delete operation succeeded, respond with success.
                            return res.status(200).json({ data: "Imóvel e propriedades relacionadas deletados" });
                        } else {
                            return res.status(404).json({ data: "Imóvel Não Encontrado" });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ data: "Erro Interno do Servidor" });
                    });
            } else {
                return res.status(404).json({ data: "Imóvel Não Encontrado" });
            }
        });
    }
}

module.exports = new Imovel;

