const products = (squelize, DataType) => {
    return squelize.define('products', {
        name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        price: {
            type: DataType.INTEGER,
            allowNull: false
        }
    })
}

module.exports = products