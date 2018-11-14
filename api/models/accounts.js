const accounts = (sequelize, DataType) => {
    return sequelize.define('accounts', {
        name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        email: {
            type: DataType.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataType.STRING(255),
            allowNull: false
        }
    })
}

module.exports = accounts