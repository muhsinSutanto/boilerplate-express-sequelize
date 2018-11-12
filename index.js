require("dotenv").config()

const PORT = process.env.PORT
const express = require("express")

const app = express()
const products = require("./api/products")

app.use("/products", products)


app.listen(PORT, ()=> console.log(`app running at ${PORT}`))