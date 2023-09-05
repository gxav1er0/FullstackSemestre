const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

//configurar o hasndlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
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
