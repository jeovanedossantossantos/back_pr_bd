const db = require('../../dataBase/connect');

class Imovel {
  async createImovel(req, res) {
    const { cidade, bairro, rua, numero } = req.body;
    
    if (!cidade || !bairro || !rua || !numero) {
      return res.status(400).json({ message: "Campos obrigatórios não informados!" });
    }

    const sql = `
      SELECT * FROM endereco
      WHERE cidade = ? 
      AND bairro = ? 
      AND rua = ?
      AND numero = ?
    `;

    try {
      const [existingAddress] = await db.query(sql, [cidade, bairro, rua, numero]);
      const [imovel] = await db.query(selectSql, [id_imovel]);

      let selectSql, imovelData;

    if (existingAddress) {
    const endereco_id = existingAddress.id;
    const rota = req.originalUrl.replace(/\//g, '');

    switch (rota) {
        case "casa":
        selectSql = `
            SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
            FROM casaImovel c
            LEFT JOIN endereco e ON c.endereco_id = e.id
            WHERE c.id = ?;
        `;
        imovelData = {
            id: imovel[0].id,
            descricao: imovel[0].descricao,
            qtd_quartos: imovel[0].qtd_quartos,
            qtd_suites: imovel[0].qtd_suites,
            qtd_sala_estar: imovel[0].qtd_sala_estar,
            qtd_sala_jantar: imovel[0].qtd_sala_jantar,
            qtd_vagas_garagem: imovel[0].qtd_vagas_garagem,
            area_imovel: imovel[0].area_imovel,
            arm_embutido: imovel[0].arm_embutido,
            data_registro: imovel[0].data_registro,
            endereco: {
            id: imovel[0].endereco_id,
            cidade: imovel[0].cidade,
            bairro: imovel[0].bairro,
            rua: imovel[0].rua,
            numero: imovel[0].numero,
            }
        };
        break;
        case "apartamento":
        selectSql = `
            SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
            FROM apartamentoImovel c
            LEFT JOIN endereco e ON c.endereco_id = e.id
            WHERE c.id = ?;
        `;
        imovelData = {
            id: imovel[0].id,
            descricao: imovel[0].descricao,
            qtd_quartos: imovel[0].qtd_quartos,
            qtd_suites: imovel[0].qtd_suites,
            qtd_sala_estar: imovel[0].qtd_sala_estar,
            qtd_sala_jantar: imovel[0].qtd_sala_jantar,
            qtd_vagas_garagem: imovel[0].qtd_vagas_garagem,
            area_imovel: imovel[0].area_imovel,
            arm_embutido: imovel[0].arm_embutido,
            data_registro: imovel[0].data_registro,
            andar: imovel[0].andar,
            valor_condominio: imovel[0].valor_condominio,
            portaria24h: imovel[0].portaria24h,
            endereco: {
            id: imovel[0].endereco_id,
            cidade: imovel[0].cidade,
            bairro: imovel[0].bairro,
            rua: imovel[0].rua,
            numero: imovel[0].numero,
            }
        };
        break;
        case "salacomercial":
        selectSql = `
            SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
            FROM salaComercialImovel c
            LEFT JOIN endereco e ON c.endereco_id = e.id
            WHERE c.id = ?;
        `;
        imovelData = {
            id: imovel[0].id,
            descricao: imovel[0].descricao,
            qtd_banheiros: imovel[0].qtd_banheiros,
            qtd_comodos: imovel[0].qtd_comodos,
            area_imovel: imovel[0].area_imovel,
            endereco: {
            id: imovel[0].endereco_id,
            cidade: imovel[0].cidade,
            bairro: imovel[0].bairro,
            rua: imovel[0].rua,
            numero: imovel[0].numero,
            }
        };
        break;
        case "terreno":
        selectSql = `
            SELECT c.*, e.cidade, e.bairro, e.rua, e.numero
            FROM terrenoImovel c
            LEFT JOIN endereco e ON c.endereco_id = e.id
            WHERE c.id = ?;
        `;
        imovelData = {
            id: imovel[0].id,
            descricao: imovel[0].descricao,
            area_imovel: imovel[0].area_imovel,
            largura: imovel[0].largura,
            comprimento: imovel[0].comprimento,
            endereco: {
            id: imovel[0].endereco_id,
            cidade: imovel[0].cidade,
            bairro: imovel[0].bairro,
            rua: imovel[0].rua,
            numero: imovel[0].numero,
            }
        };
        break;
        default:
        return res.status(400).json({ message: "Rota inválida!" });
    }


        // Insert data into the appropriate table (use the correct SQL)
        const [insertResult] = await db.query(sql, [id_imovel, endereco_id]);
        if (insertResult) {
          const [imovel] = await db.query(selectSql, [id_imovel]);
          if (imovel) {
            return res.status(201).json({ message: 'Imóvel cadastrado com sucesso', imovel: imovelData });
          } else {
            return res.status(500).json({ message: 'Erro ao obter os dados do imóvel' });
          }
        } else {
          return res.status(500).json({ message: 'Erro ao inserir dados do imóvel' });
        }
      } else {
        return res.status(500).json({ message: 'Erro ao obter os dados do endereço' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new Imovel;