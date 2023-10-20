

class Buscar {

    async listUser(req, res) {

    }


    async listImovel(req, res) {

        return res.status(200).json([
            {
                id: 1,
                data_construcao: "17-10-2023"
            },
            {
                id: 2,
                data_construcao: "17-10-2022"
            },
            {
                id: 3,
                data_construcao: "17-10-2022"
            }
        ],)

    }

    async indexImovel(req, res) {


        return res.status(200).json(
            {
                id: 1,
                data_construcao: "17-10-2023",
                id_enviado: req.params.id
            }
        )

    }
}

module.exports = new Buscar