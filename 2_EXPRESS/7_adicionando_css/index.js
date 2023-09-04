const express = require('express')
const app = express()

const path = require('path')
const caminho = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.listen(5000)