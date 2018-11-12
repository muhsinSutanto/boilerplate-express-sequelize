const model = require("../models")

module.exports.getAll = (req, res) => {
        model.products.findAll()
            .then(products => console.log(products))
            .catch(err => console.log(err))
        res.send("list of products")
}

module.exports.post = (req, res) => {
        res.send("add new products")
}