class Update {
    async updateUser(req, res) {



        return res.json({
            Message: "ok",
            data: req.body
        })


    }
}

module.exports = new Update