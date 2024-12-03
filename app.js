
const express = require('express');
const { engine } = require('express-handlebars')
const mysql = require('mysql2');


///////// CONEXÃO COM O BANCO DE DADOS /////////////

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'Admin',
    password: 'jv020904',
    database: 'gerenciamento_tarefas'
})


/*db.connect((err) => {

    if(err) throw err

    console.log("Conexão com banco concedida!")

})*/



//// CONFIGURAÇÕES /////
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'))
app.use("/css", express.static("./css"))
app.use('/imagens', express.static("./imagens"))
app.use(express.urlencoded({ extended:false}))
app.use(express.json());


////////// CRIAÇÃO DE ROTAS //////

app.get("/", function(req, res){
    res.render('login')
})


////// ROTA LOGIN /////

app.post("/principal", function(req, res){

var query = `SELECT * FROM usuarios`;

db.query(query, (err, retorno) => {
    if(err) throw err;

    var achou = false;
    for(var x = 0; x < retorno.length; x ++){

        if(req.body.input_usuario == retorno[x].usuario && req.body.input_senha == retorno[x].senha){
            achou = true;
            console.log("Bem vindo !", retorno[x].nome);
            res.render('principal');
            break
        }

        if(!achou) {
            console.log("Usuário ou senha inválidos");
            res.render('login')
        }

    }
})


})

////// ROTA DO SERVIDOR ////

app.listen(8080, () => {
    console.log("Servidor rodando: http://localhost:8080/");
})