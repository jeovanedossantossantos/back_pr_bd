const db = require('../../dataBase/connect');

class CriarImovel {
  async meuSuperimoveldacasapropria(req, res) {
    try {
      const { id_categoria, data_construcao, fotos, venda, valor_venda, locacao, valor_locacao, descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao, disponivel, id_status, id_endereco } = req.body;
      const rotas = req.originalUrl;
      console.log(rotas);
      const sql = ""
      let selectsql = ''
      if (rotas.replace(/\//g, '') === "Imovel") {
        sql = `
      INSERT INTO Imovel (
        id,
        id_categoria,
        data_construcao,
        fotos,
        venda,  
        valor_venda,
        locacao, 
        valor_locacao,
        disponivel,
        id_status
        id_endereco,
      ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const obterImovelId = (sql, id_categoria, data_construcao, fotos, venda, valor_venda, locacao, valor_locacao, disponivel, id_status, id_endereco) => {
        const selectSql = `
                SELECT i.*, e.cidade, e.bairro, e.rua, e.numero
                FROM Imovel i
                LEFT JOIN endereco e ON e.endereco_id = i.id
                WHERE i.id = ?;
                `;
          db.query(sql, [id_categoria, data_construcao, fotos,
            venda,  
            valor_venda,
            locacao, 
            valor_locacao,
            disponivel,
            id_status,
            id_endereco], (err, result) => {
            if (err) {
              return res.status(500).json({ message: 'Erro ao inserir o cliente no banco de dados' });
            }else if (result.affectedRows > 0) {
              return res.status(200).json({ data: "Imóvel cadastrado com sucesso" })
            } else {
              return res.status(404).json({ data: "Imóvel não encontrado" });
            }
          });
        }
      const inserirImovel = (sql, id_categoria, dataconstrucao, fotos, venda, valor_venda, locacao, valor_locacao, descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao, disponivel, id_status, id_endereco) => {
        id, id_categoria, dataconstrucao, fotos, venda, valor_venda, locacao, valor_locacao, descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao, disponivel, id_status, id_endereco = req.body;
        return new Promise((resolve, reject) => {
          db.query(sql, [id_categoria, dataconstrucao, fotos, venda, valor_venda, locacao, valor_locacao, descricao, qtd_quartos, qtd_suites, qtd_sala_estar, qtd_sala_jantar, qtd_vagas_garagem, area_imovel, arm_embutido, data_registro, data_vendido, data_locacao, disponivel, id_status, id_endereco], (err, result) => {
            if (err) {
              console.error("Erro ao incluir", err);
              reject(err);
            } else {
              console.log("Inclusão feita com Sucesso! ID:", result.insertId);
              resolve(result.insertId);
              id = result.insertId;
            }
          });
        });
      };
    }
    }catch (error) {
      console.error("Error while creating a new property:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

      
module.exports = new CriarImovel;
