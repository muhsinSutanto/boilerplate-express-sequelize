const model = require("../models")

module.exports.getAll = (req, res) => {
        model.products.findAll()
            .then(products => res.send(products))
            .catch(err => console.log(err))

}

module.exports.post = (req, res) => {
        model.products.create(req.body)
        .then(product => res.send(product))
        .catch(err => console.log(err))
}