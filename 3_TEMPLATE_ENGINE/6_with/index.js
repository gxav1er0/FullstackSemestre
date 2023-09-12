const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

//Configurar pasta publc para arquivos estático
app.use(express.static('public'))

//configurar o hasndlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender na marra',
        category: 'Javascript',
        body: "este arquivo vai te ajudar a aprender node.JS (ou tentar rs)",
        coments: 4
    }
    res.render('blogpost', { post })
})

app.get('/dashboard', (req, res) => {
    const itens = ['item 1', 'item 2', 'item 3']

    res.render('dashboard', { itens })
})

app.get('/', (req, res) => {
    const user = {
        name: "Gustavo Xavier",
        age: 21
    }

    const auth = true
    res.render('home', {user, auth})
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
