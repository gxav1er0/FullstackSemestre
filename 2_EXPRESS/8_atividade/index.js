const express = require('express');
const app = express();

const path = require('path');
const caminho = path.join(__dirname, 'templates');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(`${caminho}/index.html`);
});

app.get('/funcionario/cadastrar', (req, res) => { // Alterado de /usuario/cadastro para /funcionario/cadastro
    res.sendFile(path.join(caminho, 'cadastrar.html'));
});

app.post('/funcionario/salvar', (req, res) => { // Alterado de /usuario/salvar para /funcionario/salvar
    const nome = req.body.nome;
    const idade = req.body.idade;

    console.log(`
        Funcionário: ${nome} 
        Idade: ${idade}
    `);

    res.redirect('/');
});

app.use(express.json());

app.listen(5000);
