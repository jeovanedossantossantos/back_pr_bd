const express = require('express')
const Imovel = require('../controllers/searchQueries/imovel')
const Update = require('../controllers/updateQueries/index')
const Funcionario = require('../controllers/writeQueries/loginFuncionario')
const Cliente = require('../controllers/writeQueries/createClientes')
const ListarUsers = require('../controllers/searchQueries/listUsers')
const ListImovel = require('../controllers/searchQueries/imovel/imovelFilter')
const FilterImovel = require('../controllers/searchQueries/imovel/imovelFilterDois')
const Contrato = require("../controllers/searchQueries/contratos/index");

const Router = express.Router()


Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))
Router.post('/login', Funcionario.login)
Router.get('/imovel', Imovel.listarTodosImoveis)
Router.get('/imovel/proprietario/:id_client', ListImovel.listImovel)
Router.get('/imovel/cliente/:id_client', ListImovel.listaImovelClienteUser)
Router.get('/imovel/:id_client', FilterImovel.filterImovel)


// Roda privada
Router.get('/user', ListarUsers.listUsers)
Router.put('/user/update', Update.updateUser)

Router.post('/proprietario', Cliente.createCliente)
Router.post('/cliente', Cliente.createCliente)


//Rotas de Acesso Privado para Administrador
Router.get("/contratos", Contrato.listarTodosOsContratos);
Router.post("/contratos/tipoContrato", Contrato.listarPorTipoDeContrato);
Router.post("/contratos/cargoFuncionario", Contrato.listarPorCargoDeFuncionario);
Router.post("/contratos/funcionario", Contrato.listarPorFuncionario);

module.exports = Router;

