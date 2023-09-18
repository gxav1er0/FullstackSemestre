const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Configurar pasta public para arquivos estáticos
app.use(express.static('public'));

// Configurar o Handlebars como template engine
app.engine('handlebars', exphbs.engine()); // Remova os parênteses vazios
app.set('view engine', 'handlebars');

const products = [
  {
    id: 1,
    name: "Violão Takamine GDD10",
    price: "1998,99 $",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9c9lTy0a9o--D1wUVZ3Y-46q0gvo0pmocw&usqp=CAU" 
  },
  {
    id: 2,
    name: "Microfone Shure SV100",
    price: "1095,99 $",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeh-44aJrLW5Hz5K_18JCT_Acq_kI1D2aHaA&usqp=CAU"
  },
  {
    id: 3,
    name: "Cabo P10 Shure",
    price: "92,99 $",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS160-zxxu0-90eLdnwt9u_tREn9DKxz-Czrw&usqp=CAU"
  }
];

app.get('/', (req, res) => {
  const auth = true;
  res.render('products', { products, auth });
});

app.get("/produto/:id", (req, res) => {
  const productId = req.params.id;
  const produto = products[productId - 1];

  if (!produto) {
    return res.status(404).send("Produto não encontrado");
  }

  res.render("produto", { produto });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
