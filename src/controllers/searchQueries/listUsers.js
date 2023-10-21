const db = require('../../dataBase/connect')


class ListUsers {

    async listUsers(req, res) {


        const { nome, tipo } = req.query
        const filtro = { nome, tipo }

        let users = []

        // buscar todos, depois aplica os filtros no vetor resultante 

        // Consulta SQL para buscar todos os clientes de ambas as tabelas
        const sql = `
              SELECT 'Proprietario' AS tipo_cliente, cp.id, cp.cpf, cp.nome, cp.endereco_id, cp.telefone, cp.email, cp.sexo, cp.estado_civil, cp.profissao, e.cidade AS endereco_cidade, e.bairro AS endereco_bairro, e.rua AS endereco_rua, e.numero AS endereco_numero
              FROM clienteProprietario cp
              LEFT JOIN endereco e ON cp.endereco_id = e.id
              UNION ALL
              SELECT 'Usuario' AS tipo_cliente, client_user.id, client_user.cpf, client_user.nome, client_user.endereco_id, client_user.telefone, client_user.email, client_user.sexo, client_user.estado_civil, client_user.profissao, e.cidade AS endereco_cidade, e.bairro AS endereco_bairro, e.rua AS endereco_rua, e.numero AS endereco_numero
              FROM clienteUsuario client_user
              LEFT JOIN endereco e ON client_user.endereco_id = e.id;
            `;


        db.query(
            sql
            ,
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).json({ data: "Erro Interno do Servidor" });
                } else if (results.length > 0) {
                    users = users.concat(results);
                    const clientes = users.map((row) => {
                        return {
                            tipo_cliente: row.tipo_cliente,
                            id: row.id,
                            cpf: row.cpf,
                            nome: row.nome,
                            endereco_id: row.endereco_id,
                            telefone: row.telefone,
                            email: row.email,
                            sexo: row.sexo,
                            estado_civil: row.estado_civil,
                            profissao: row.profissao,
                            endereco: {
                                cidade: row.endereco_cidade,
                                bairro: row.endereco_bairro,
                                rua: row.endereco_rua,
                                numero: row.endereco_numero,
                            },
                        };
                    });
                    const clientesFiltrados = clientes.filter((cliente) => {
                        // Verifica se o nome contém a sequência de caracteres (se fornecido)
                        if (filtro.nome) {
                            // Converte tanto o nome quanto a sequência de caracteres para letras minúsculas
                            const nomeMinusculo = cliente.nome.toLowerCase();
                            const sequenciaMinuscula = filtro.nome.toLowerCase();

                            // Verifica se a sequência de caracteres está presente no nome
                            if (!nomeMinusculo.includes(sequenciaMinuscula)) {
                                return false;
                            }
                        }



                        if (filtro.tipo && !(filtro.tipo === cliente.tipo_cliente)) {
                            return false
                        }


                        return true; // Retorna true para manter o cliente no resultado
                    });
                    return res.status(200).json({
                        cout: clientesFiltrados.length,
                        rows: clientesFiltrados
                    })

                }
            });



    }
}

module.exports = new ListUsers