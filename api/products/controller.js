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

module.exports.deleteOne = (req, res) => {
    model.products.findOne({where: {id: req.params.id}})
    .then(product => product.destroy()
        .then(result => res.send(result))
        .catch(err => console.log(err)))
    .catch(err => console.log(err))
}

module.exports.deleteAll =  (req, res) => {
    model.products.destroy({
        where : {},
        truncate: true
    }).then(result => {
        console.log(result)
        if(result === 1){
            res.send('success')}
        else if (result === 0) {
            res.send('failed')
        }
    }).catch( err => console.log('error')
    )
}

module.exports.search = (req, res) => {
    model.products.findAll({where: req.query})
        .then(products => res.send(products))
        .catch(err => console.log(err))
}

module.exports.update= (req, res) => {
    model.products.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result =>  res.send(result) )
    .catch(err => console.log(err))
}

