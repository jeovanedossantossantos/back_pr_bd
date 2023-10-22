const express = require('express')
const Buscar = require('../controllers/searchQueries/index')
const Update = require('../controllers/updateQueries/index')
const Funcionario = require('../controllers/writeQueries/loginFuncionario')
const Cliente = require('../controllers/writeQueries/createClientes')
const ListarUsers = require('../controllers/searchQueries/listUsers')
const Router = express.Router()

const Contrato = require("../controllers/searchQueries/contratos/index");

Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))
Router.post('/login', Funcionario.login)
Router.get('/imovel', Buscar.listImovel)
Router.get('/imovel/:id', Buscar.indexImovel)



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
Router.post("/contratos/cliente", Contrato.listarPorCliente);
Router.post("/contratos/detalhar", Contrato.detalharContrato);


module.exports = Router;