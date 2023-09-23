const express = require('express');

const server = express();
require("./dataBase/connect")
server.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});