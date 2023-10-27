const express = require('express')
const Imovel = require('../controllers/searchQueries/imovel')
const Update = require('../controllers/updateQueries/index')
const Funcionario = require('../controllers/writeQueries/loginFuncionario')
const Cliente = require('../controllers/writeQueries/createClientes')
const ListarUsers = require('../controllers/searchQueries/listUsers')
const ListImovel = require('../controllers/searchQueries/imovel/imovelFilter')
const FilterImovel = require('../controllers/searchQueries/imovel/imovelFilterDois')
const Contrato = require("../controllers/searchQueries/contratos/index");
const FuncioarioConsulta = require('../controllers/searchQueries/funcionarios')
const FuncionarioDelete = require('../controllers/deleteQueries/funcionario/deleteFuncionario')
const FuncionarioCreate = require('../controllers/writeQueries/createFuncionario')
const Router = express.Router()


Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))
Router.post('/login', Funcionario.login)
Router.get('/imovel', Imovel.listarTodosImoveis)
Router.get('/imovel/preco', Imovel.listarPorPreco)
Router.get('/imovel/endereco', Imovel.listarPorEndereco)
Router.get('/imovel/vender', Imovel.listarParaVenda)
Router.get('/imovel/locacao', Imovel.listarParaLocacao)
Router.get('/imovel/veder_locacao', Imovel.listarParaLocacao)
Router.get('/imovel/proprietario/:id_client', ListImovel.listImovel)
Router.get('/imovel/cliente/:id_client', ListImovel.listaImovelClienteUser)
Router.get('/imovel/:id_client', FilterImovel.filterImovel)

//rotas para funcionario
Router.get('/funcionario/cargoFuncionario', FuncioarioConsulta.listarFuncionarioCargo)
Router.get('/funcionario/dataIngressoFuncionario', FuncioarioConsulta.listarFuncionarioDataIngresso)
Router.get('/funcionario/enderecoFuncionario', FuncioarioConsulta.listarFuncionarioEndereco)
Router.get('/funcionario/idadeFuncionario', FuncioarioConsulta.listarFuncionarioIdade)
Router.get('/funcionario', FuncioarioConsulta.listarTodosFuncionarios)
Router.get('funcionario/cpf/:cpf', FuncioarioConsulta.detalharFuncionarioPorCPF)
Router.post('/funcionario/create', FuncionarioCreate.criarFuncionario)
Router.delete('/funcuinario/delete', FuncionarioDelete.excluirFuncionario)

//Rotas de Acesso Privado para Administrador
Router.get('/user', ListarUsers.listUsers)
Router.put('/user/update', Update.updateUser)

Router.post('/proprietario', Cliente.createCliente)
Router.post('/cliente', Cliente.createCliente)



Router.get("/contratos", Contrato.listarTodosOsContratos);
Router.post("/contratos/tipoContrato", Contrato.listarPorTipoDeContrato);
Router.post("/contratos/cargoFuncionario", Contrato.listarPorCargoDeFuncionario);
Router.post("/contratos/funcionario", Contrato.listarPorFuncionario);
Router.post("/contratos/cliente", Contrato.listarPorCliente);
Router.post("/contratos/detalhar", Contrato.detalharContrato);


module.exports = Router;