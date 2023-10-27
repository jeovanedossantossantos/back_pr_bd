const db = require("../../../dataBase/connect");

class UpdateImovel {
  async atualizarImovel(req, res) {
    const id = req.params.id;
    const [descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao] = [req.body.descricao, req.body.qtd_quartos, req.body.qtd_suites, req.body.qtd_sala_estar, req.body.qtd_sala_jantar, req.body.qtd_vagas_garagem, req.body.area_imovel, req.body.arm_embutido, req.body.data_registro, req.body.data_vendido, req.body.data_locacao];
    db.query(`UPDATE Imovel SET,
        descricao = '?,
        qtd_quartos = ?,
        qtd_suites = ?,
        qtd_sala_estar = ?,
        qtd_sala_jantar = ?,
        qtd_vagas_garagem = ?,
        area_imovel = ?,
        arm_embutido = ?,
        data_registro = '?,
        data_vendido = '?,
        data_locacao = '?,
      WHERE id = ${id}
      `, descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao,

      function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({ data: "Erro Interno do Servidor" });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({ data: "Dados do imóvel atualizados com sucesso" });
        } else {
            return res.status(404).json({ data: "Imóvel não encontrado" });
        }
    }
    );
    }
  }

module.exports = new UpdateImovel;
