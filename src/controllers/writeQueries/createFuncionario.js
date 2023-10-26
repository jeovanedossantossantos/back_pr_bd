

const bb = require('../../database/connect')

class Funcionario{
    async createFuncionario(req, res) {
        const { nome, cpf, email, senha, sexo, estado_civil, data_ingresso, telefone, id_endereco, id_cargo } = req.body;
      
        // Verifica se o endereço existe
        const enderecoSql = `
          SELECT * FROM endereco WHERE id = ?;
        `;
        db.query(enderecoSql, [id_endereco], (err, enderecoResult) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao verificar o endereço do funcionário' });
          }
      
          if (enderecoResult.length === 0) {
            return res.status(400).json({ message: 'Endereço não encontrado' });
          }
      
          // Verifica se o cargo existe
          const cargoSql = `
            SELECT * FROM cargo WHERE id = ?;
          `;
          db.query(cargoSql, [id_cargo], (err, cargoResult) => {
            if (err) {
              return res.status(500).json({ message: 'Erro ao verificar o cargo do funcionário' });
            }
      
            if (cargoResult.length === 0) {
              return res.status(400).json({ message: 'Cargo não encontrado' });
            }
      
            // Insere o funcionário
            const sql = `
              INSERT INTO funcionario (
                nome, cpf, email, senha, sexo, estado_civil, data_ingresso, telefone, id_endereco, id_cargo
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            db.query(sql, [nome, cpf, email, senha, sexo, estado_civil, data_ingresso, telefone, id_endereco, id_cargo], (err, result) => {
              if (err) {
                return res.status(500).json({ message: 'Erro ao inserir o funcionário no banco de dados' });
              }
      
              // Consulta para obter os dados do funcionário recém-inserido
              const funcionarioId = result.insertId;
              const selectSql = `
                SELECT f.*, e.cidade, e.bairro, e.rua, e.numero, c.nome AS nome_cargo
                FROM funcionario f
                LEFT JOIN endereco e ON f.id_endereco = e.id
                LEFT JOIN cargo c ON f.id_cargo = c.id
                WHERE f.id = ?;
              `;
              db.query(selectSql, [funcionarioId], (err, funcionario) => {
                if (err) {
                  return res.status(500).json({ message: 'Erro ao obter os dados do funcionário' });
                }
      
                const funcionarioData = {
                  id: funcionario[0].id,
                  nome: funcionario[0].nome,
                  cpf: funcionario[0].cpf,
                  email: funcionario[0].email,
                  senha: funcionario[0].senha,
                  sexo: funcionario[0].sexo,
                  estado_civil: funcionario[0].estado_civil,
                  data_ingresso: funcionario[0].data_ingresso,
                  telefone: funcionario[0].telefone,
                  endereco: {
                    id: funcionario[0].id_endereco,
                    cidade: funcionario[0].cidade,
                    bairro: funcionario[0].bairro,
                    rua: funcionario[0].rua,
                    numero: funcionario[0].numero,
                  },
                  cargo: {
                    id: funcionario[0].id_cargo,
                    nome: funcionario[0].nome_cargo,
                  },
                };
      
                return res.status(201).json({ message: 'Funcionário cadastrado com sucesso', funcionario: funcionarioData });
              });
      


    

}

module.exports = new Funcionario
