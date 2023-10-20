const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../dataBase/connect')
const authConfig = require('../../config/authConfig.json')
class Funcionario {

    async login(req, res) {

        const { email, senha } = req.body

        // Email a ser buscado (substitua com o email desejado)


        // Consulta SQL para buscar um funcionário pelo email
        const sql = `SELECT * FROM funcionario WHERE email = ?`;

        if (!email || !senha) return res.status(400).json({ messagem: "Campos obrigatórios não informados!" })
        const funcionario = new Promise((resolve, reject) => {
            db.query(sql, [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        const funcionario = result[0]; // Pega o primeiro resultado (assumindo que o email é único)
                        resolve(funcionario);
                    } else {
                        reject('Funcionário não encontrado com o email especificado.');
                    }
                }
            });
        }).then(async (funcionario) => {


            if (!await bcrypt.compare(senha, funcionario.senha)) {

                return res.status(500).json({
                    message: 'Algo deu errado ao tentar fazer o login!'
                })
            }
            funcionario.senha = null
            return res.json({
                usuario: funcionario,
                token: jwt.sign({ funcionario }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            })
        })
            .catch(err => {
                return err
            });









    }
}

module.exports = new Funcionario