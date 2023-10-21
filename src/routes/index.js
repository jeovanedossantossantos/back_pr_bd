const express = require('express')
const Buscar = require('../controllers/searchQueries/index')
const Update = require('../controllers/updateQueries/index')
const Funcionario = require('../controllers/writeQueries/createFuncionario')
const Cliente = require('../controllers/writeQueries/createClientes')
const Router = express.Router()

Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))
Router.post('/login', Funcionario.login)
Router.get('/imovel', Buscar.listImovel)
Router.get('/imovel/:id', Buscar.indexImovel)



// Roda privada
Router.get('/user', Buscar.listUser)
Router.put('/user/update', Update.updateUser)

Router.post('/proprietario', Cliente.createClienteProprietario)

module.exports = Router