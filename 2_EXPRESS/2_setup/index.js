const express = require('express')
const app = express()

app.get('/', (requisicao, resposta) => {
    resposta.send('Seja bem vindo bb')
})

app.listen(8080, () => {
    console.log('App rodando na porta 8080')
})