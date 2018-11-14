const model = require("../models")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.getAll = (req, res) => {
        model.accounts.findAll()
            .then(accounts => res.send(accounts))
            .catch(err => console.log(err))

}

module.exports.login = (req, res) => {
    model.accounts.findOne({where : {email: req.body.email}})
        .then(account => {
            if(account === null) {
                return res.send('account not found')
            }

            const validPassword = bcrypt.compareSync(req.body.password, account.password)
            
            if (validPassword == false) {
                return res.send("password is not valid")
            }
    
            const token_data =  {
                payload: {
                    id : account.id,
                    name: account.name,
                },
                secret: process.env.JWT_SECRET,
                options: {
                    expiresIn : "7d"
                }
            }
    
            const token = jwt.sign(token_data.payload, token_data.secret, token_data.options)
            res.send({
                message: "you are logg in",
                id: account.id,
                token: token
            })
        })
        .catch(err => res.send(err))
}

module.exports.post = (req, res) => {
        const SALT_WORK_FACTOR = 7
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)

        req.body.password = bcrypt.hashSync(req.body.password, salt)

        model.accounts.create(req.body)
        .then(accounts => res.send(accounts))
        .catch(err => console.log(err))
}

module.exports.deleteOne = (req, res) => {
    model.accounts.findOne({where: {id: req.params.id}})
    .then(account => account.destroy()
        .then(result => res.send(result))
        .catch(err => console.log(err)))
    .catch(err => console.log(err))
}

module.exports.deleteAll =  (req, res) => {
    model.accounts.destroy({
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
    model.accounts.findAll({where: req.query})
        .then(accounts => res.send(accounts))
        .catch(err => console.log(err))
}

module.exports.update= (req, res) => {
    model.accounts.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(result =>  res.send(result) )
    .catch(err => console.log(err))
}

