const express = require('express');
const cors = require('cors');
const router = require('./routes');
require("./dataBase/connect")

class App {
    constructor() {

        this.server = express()
        this.middleware()
        this.routes()

    };

    routes() {

        this.server.use(router)
    }
    middleware() {
        this.server.use(cors());
        this.server.use((req, res, next) => {

            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");

            next();

        })

        this.server.use(express.json())
    }
}

module.exports = new App().server;