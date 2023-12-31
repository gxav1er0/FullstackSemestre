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

app.post("/update/save", (req, res) =>{
    const {id_film, title, pg_qtd} = req.body

    console.log(id_film)
 
    const sql = `
    UPDATE films
    SET title = '${title}', pg_qtd = '${pg_qtd}'
    WHERE id_film = ${id_film}
    `
 
    conn.query(sql, (error) =>{
     if (error) {
         console.log(error)
         return
     } 
 
     res.redirect("/")
    })
})

app.post("/delete", (req, res) =>{
    const {id_film} = req.body

    const sql = `
        DELETE FROM films
        WHERE id_film = ${id_film}
    `
    conn.query(sql, (error) =>{
        if (error) {
            return console.log(error)
        }
        
        res.redirect("/")
    })

})

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

app.get("/update/:id_film", (req, res) =>{
    const id_film = req.params.id_film
    const sql = `
         SELECT * FROM films
            WHERE id_film =${id_film}
        `
    conn.query(sql, (error, data) =>{
        if (error){
            return console.log(error)
        }

        const film = data[0]

        res.render('update', {film})

    })
    
})

app.get("/film/:id_film", (req, res) =>{
    const id_film = req.params.id_film
    const sql = `
            SELECT * FROM films
            WHERE id_film =${id_film}
    `

    conn.query(sql, (error, data) =>{
        if (error){
            return console.log(error)
        }

        const film = data[0]

        res.render("film", {film})
    })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/", (req, res) =>{

    const consult = `select* from films`

    conn.query(consult, (error, data) => {
        if (error) {
            return console.log (error)
        }

        const film = data

        res.render("home", ({film}))
    })

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