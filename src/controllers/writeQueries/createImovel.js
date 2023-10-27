const db = require('../../dataBase/connect');

class CriarImovel {
  

  async createImovel(req, res) {

    const { cidade, bairro, rua, numero, estado } = req.body.endereco
    const rota = req.originalUrl

    // Verifica se o enderço já existe
    const sql = `
        SELECT * FROM endereco
        WHERE cidade = ? 
        AND bairro = ? 
        AND rua = ? 
        AND numero = ?
        AND estado= ?;
    `;

    if (!cidade || !bairro || !rua || !numero || !estado) {
      return res.status(400).json({ message: "Campos obrigatórios não informados!" });
    }
    const obterEnderecoId = (sql, cidade, bairro, rua, numero, estado) => {
      return new Promise((resolve, reject) => {
        db.query(sql, [cidade, bairro, rua, numero, estado], (err, result) => {
          if (err) {
            
            reject(err);
          }

          if (result.length > 0) {
            resolve(result[0].id);
          } else {
            // Endereço não encontrado, insira um novo endereço
            const insertSQL = `
                        INSERT INTO endereco (cidade, bairro, rua, numero,estado)
                        VALUES (?, ?, ?, ?, ?);
                    `;

            db.query(insertSQL, [cidade, bairro, rua, numero, estado], (err, insertResult) => {
              if (err) {
                
                reject("Erro na inserção do novo endereço.");
              } else {
                // Retorne o ID do novo endereço inserido
                console.log("pass")
                resolve(insertResult.insertId);
              }
            });
          }
        });
      });
    };

    obterEnderecoId(sql, cidade, bairro, rua, numero, estado)
      .then((endereco_id) => {
        req.body.fotos = JSON.stringify(req.body.fotos)
        const { data_construcao, fotos, venda,
          valor_venda,
          locacao,
          valor_locacao,
          disponivel } = req.body

        


        const sql = ` INSERT IGNORE INTO imovel (
                  data_construcao, 
                  fotos,
                  venda,
                  valor_venda,
                  locacao,
                  valor_locacao,
                  disponivel,
                  id_endereco
                  ) VALUES (?, ?,?,?,?,?,?, ?);`



        const selectSql = `
                SELECT i.*, e.cidade, e.bairro, e.rua, e.numero
                FROM imovel i
                LEFT JOIN endereco e ON i.id_endereco = e.id
                WHERE i.id = ?;
                `;



        db.query(sql, [data_construcao, fotos,
          venda,
          valor_venda,
          locacao,
          valor_locacao,
          disponivel,
          endereco_id], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao inserir o imovle no banco de dados' });
          }

          // Consulta para obter os dados do imovel recém-inserido
          const imovel_id = result.insertId;


          db.query(selectSql, [imovel_id], (err, dadosImovel) => {

            if (err) {
              console.log(err)
              return res.status(500).json({ message: 'Erro ao obter os dados do imovel' });
            }
            
            let tipo = ''

            // /casa
            // /apartamento
            // 

            if (rota.replace(/\//g, '') === "casa"){
              tipo = 'casa'
              const sql_p = `
              INSERT INTO registroImovel (
                id_clientep,
                id_imovel)
                VALUES
                (?, ?);


              `
              const {id_clientp} = req.body

              db.query(sql_p, [id_clientp,imovel_id], function (err, result) {
                if (err) return console.error(err);
                console.log("Dados inseridos com seucesso na tabela Associar Imóveis a Clientes Proprietários");
                return

            });

            // const ob = {
            //   descricao,
            //   qtd_quartos,
            //   qtd_suites,
            //   qtd_sala_estar,
            //   qtd_sala_jantar,
            //   qtd_vagas_garagem,
            //   area_imovel,
            //   arm_embutido,
            //   data_registro,
            //   id_clientep,
            //   endereco:{
            //     cidade, bairro, rua, numero, estado
            //   },
            //   data_construcao, 
            //   fotos,
            //   venda,
            //   valor_venda,
            //   locacao,
            //   valor_locacao,
            //   disponivel

            // }
            const sql2 = `INSERT INTO casa (
              id_imovel,
              descricao,
              qtd_quartos,
              qtd_suites,
              qtd_sala_estar,
              qtd_sala_jantar,
              qtd_vagas_garagem,
              area_imovel,
              arm_embutido,
              data_registro) 
              VALUE ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `
              const {descricao,
                qtd_quartos,
                qtd_suites,
                qtd_sala_estar,
                qtd_sala_jantar,
                qtd_vagas_garagem,
                area_imovel,
                arm_embutido,
                data_registro} = req.body
              db.query(sql2, [imovel_id,descricao,
                qtd_quartos,
                qtd_suites,
                qtd_sala_estar,
                qtd_sala_jantar,
                qtd_vagas_garagem,
                area_imovel,
                arm_embutido,
                data_registro], function (err, imovel) {
                if (err) return console.log(err);
                console.log("Dados inseridos com seucesso na tabela casa");
                
                db.query(`
                SELECT i.*, e.cidade, e.bairro, e.rua, e.numero, e.estado
                        FROM imovel i
                        LEFT JOIN endereco e ON i.id_endereco = e.id
                        WHERE i.id = ?;
                
                `,[imovel.insertId],(err,imovel)=>{
                  if (err) return console.log(err)
                  console.log(imovel)
                  const dadosImovel = {
                    id: imovel[0].id,
                    id_categoria: imovel[0].id_categoria,
                    data_construcao: imovel[0].data_construcao,
                    fotos: JSON.parse(imovel[0].fotos),
                    venda: imovel[0].venda,
                    valor_venda: imovel[0].valor_venda,
                    locacao: imovel[0].locacao,
                    valor_locacao: imovel[0].valor_locacao,
                    disponivel: imovel[0].disponivel,
                    id_status: imovel[0].id_status,
                    tipo:tipo,
                    endereco: {
                      id: imovel[0].id_endereco,
                      cidade: imovel[0].cidade,
                      bairro: imovel[0].bairro,
                      rua: imovel[0].rua,
                      estado: imovel[0].estado,
                    },
                  };

                  return res.status(201).json({ message: 'Imovel cadastrado com sucesso', imovel: dadosImovel });
                })
              })
              
            }
            if (rota.replace(/\//g, '') === "sala"){
              tipo = 'sala'
              const sql_r = `
              INSERT INTO registroImovel (
                  id_clientep, 
                  id_imovel)
                  VALUES
                  (?, ?);
              
              `
              db.query(sql_r, [imovel_id], function (err, result) {
                if (err) return console.log(err)
                console.log("Dados inseridos com seucesso na tabela Associar Imóveis a Clientes Proprietários");
                
              });
              const sql2 = `
              INSERT INTO SalaComercial (
                id,
                id_imovel, 
                descricao,  
                qtd_banheiro,
                qtd_comodos,
                area_imovel,
                data_registro)
                VALUES
                (?, ?, ?, ?, ?, ?, ?);`
              db.query(sql2, [imovel_id], function (err, result) {
                if (err) return console.log(err)
                console.log("Dados inseridos com seucesso na tabela casa");
                
              })
            return

            }
            if (rota.replace(/\//g, '') === "apartamento"){
              tipo = 'apartamento'
              const sql_r = `
              INSERT INTO registroImovel (
                  id_clientep, 
                  id_imovel)
                  VALUES
                  (?, ?)`;
                  db.query(sql_r, [imovel_id], function (err, result) {
                    if (err) return console.error(err);;
                    console.log("Dados inseridos com seucesso na tabela Associar Imóveis a Clientes Proprietários");
                    return
                  });
                  const sql2 = `INSERT INTO Apartamento (
                    id,
                    id_endereco,
                    descricao,
                    qtd_quartos,
                    qtd_suites,
                    qtd_sala_estar,
                    qtd_sala_jantar,
                    qtd_vagas_garagem,
                    area_imovel,
                    arm_embutido,
                    data_registro,
                    data_vendido,
                    data_locacao
            ) VALUE (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`;
            db.query(sql2, [imovel_id], function (err, result) {
              if (err) return console.log(err)
              console.log("Dados inseridos com seucesso na tabela casa");
              
            })
            
          }
            if (rota.replace(/\//g, '') === "terreno"){
              tipo = 'terreno'
              const sql_r = `
              INSERT INTO registroImovel (
                  id_clientep, 
                  id_imovel)
                  VALUES
                  (?, ?)`;
                  db.query(sql_r, [imovel_id], function (err, result) {
                    if (err) return console.error(err);;
                    console.log("Dados inseridos com sucesso na tabela Associar Imóveis a Clientes Proprietários");
                    return
                  });
                  const sql2 = `INSERT INTO Terreno (
                    id,
                    id_imovel,
                    descricao,
                    arae_imovel,
                    largura,
                    comprimento,
                    aclive_declive,
                    data_registro,
                    data_vendido,
                    data_locacao
            ) VALUE (?, ? ,? ,? ,? ,? ,?)`;
            db.query(sql2, [imovel_id], function (err, imovel) {
              if (err) return console.error(err);;
              console.log("Dados inseridos com sucesso na tabela casa");
              return
            })
            return
          }

           
          });
        });

      })
      .catch((error) => {
        console.log(error)
        return res.status(404).json({ message: error });
      });





  }
}


module.exports = new CriarImovel;
