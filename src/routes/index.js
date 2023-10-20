const express = require('express')

const Router = express.Router()

const contratos = require("../controllers/searchQueries/contratos/index");

Router.get('/', (req, res) => res.status(200).json({
    "detail": "Sucess!"
}))

//Rotas de Acesso Privado para Administrador
Router.get("/contratos", contratos.listarTodosOsContratos);
Router.get("/contratos/tipoContrato", contratos.listarPorTipoDeContrato);
Router.get("/contratos/cargoFuncionario", contratos.listarPorCargoDeFuncionario);
Router.get("/contratos/funcionario", contratos.listarPorFuncionario);

module.exports = Router;