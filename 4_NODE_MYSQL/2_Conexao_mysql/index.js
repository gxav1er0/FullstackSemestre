const { response } = require("express");
const express = require("express")
const exphbs =  require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.engine('handlebars', exphbs.engine()); 
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post("/register/save", (req, res) =>{
   const {title, pg_qtd} = req.body

   const query = `
   INSERT INTO films (title, pg_qtd)
   VALUES ('${title}', '${pg_qtd}')
   `

   conn.query(query, (error) =>{
    if (error) {
        console.log(error)
        return
    } 

    res.redirect("/")
   })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/", (req, res) =>{
    res.render("home")
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3307
})

conn.connect((error) =>{
    if (error){
    console.log(error)
    return
    }
    console.log("conection sucess")

    app.listen(3000, () =>{
        console.log('servidor rodando na porta 3000')
    })
})