const express = require('express')
const Buscar = require('../controllers/searchQueries/index')
const Update = require('../controllers/updateQueries/index')
const Funcionario = require('../controllers/writeQueries/createFuncionario')
const Cliente = require('../controllers/writeQueries/createClientes')
const Router = express.Router()

const Contrato = require("../controllers/searchQueries/contratos/index");

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


//Rotas de Acesso Privado para Administrador
Router.get("/contratos", Contrato.listarTodosOsContratos);
Router.post("/contratos/tipoContrato", Contrato.listarPorTipoDeContrato);
Router.post("/contratos/cargoFuncionario", Contrato.listarPorCargoDeFuncionario);
Router.post("/contratos/funcionario", Contrato.listarPorFuncionario);

module.exports = Router;

