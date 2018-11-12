const products = (squelize, DataType) => {
    return squelize.define('prodcut', {
        name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        price: {
            type: DataType.NUMBER,
            allowNull: false
        }
    })
}