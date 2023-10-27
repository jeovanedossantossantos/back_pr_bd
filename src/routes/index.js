const express = require('express')
const Imovel = require('../controllers/searchQueries/imovel')
const CriarImovel = require('../controllers/writeQueries/createImovel')
const ImovelUpdate = require('../controllers/updateQueries/imovel/updateImovel')
const ImovelDelete = require('../controllers/deleteQueries/imovel/DeleteImovel')
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
const PagamentoCreate = require('../controllers/writeQueries/pagamento/createPagamento')
const PagamentoUpdate = require('../controllers/updateQueries/pagamento/updatePagamento')
const PagamentoDelete = require('../controllers/deleteQueries/pagamento/deletePagamento')
const PagamentoSearch = require('../controllers/searchQueries/pagamento/index')
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
Router.get('/imovel/veder_locacao', Imovel.listarParaVendaELocacao)
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

//rotas para Forma de Pagamento
Router.post('/pagamento/create', PagamentoCreate.criarFormaPagamento)
Router.delete('/pagamento/delete', PagamentoDelete.deletarPagamento)
Router.put('/pagamento/update', PagamentoUpdate.atualizarFormaPagamento)
Router.get('/pagamento', PagamentoSearch.listarPagamento)

//Rotas de Acesso Privado para Administrador
Router.get('/user', ListarUsers.listUsers)
Router.put('/user/update', Update.updateUser)

Router.post('/proprietario', Cliente.createCliente)
Router.post('/cliente', Cliente.createCliente)

Router.post('/imovel', CriarImovel.createImovel)
Router.post('/casa', CriarImovel.createImovel)
Router.post('/apartamento', CriarImovel.createImovel)
Router.post('/sala', CriarImovel.createImovel)
Router.delete('/imovel/delete', ImovelDelete.deleteImovel)
Router.put('/imovel/update', ImovelUpdate.atualizarImovel)

Router.get("/contratos", Contrato.listarTodosOsContratos);
Router.post("/contratos/tipoContrato", Contrato.listarPorTipoDeContrato);
Router.post("/contratos/cargoFuncionario", Contrato.listarPorCargoDeFuncionario);
Router.post("/contratos/funcionario", Contrato.listarPorFuncionario);
Router.post("/contratos/cliente", Contrato.listarPorCliente);
Router.post("/contratos/detalhar", Contrato.detalharContrato);

//Rotas Criando os Imoveis (separdo por tipo)


module.exports = Router;