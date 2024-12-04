
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


/// ROTA DA PÁGINA PRINCIPAL ////

app.get('/views/pagina_principal', function(req, res) {
    res.render('principal')
})

app.get('/views/pagina_usuario', function(req, res) {
    res.render('usuario')
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

        /*ROTA PARA CADASTRO DE USUÁRIO*/

// ------------------------------------------------------ {

app.post('/usuario', function(req, res){
   
   const nome = req.body.inputNome;
   const sobrenome = req.body.inputSobrenome;
   const email = req.body.inputEmail4;
   const usuario = req.body.inputUsuario;
   const cpf = req.body.inputCPF;
   const rg = req.body.inputRG; 
   const senha = req.body.inputSenha;
   const confirmar = req.body.inputConfirmar;
   const endereco = req.body.inputEndereco;
   const cidade = req.body.inputCidade;
   const estado = req.body.inputEstado;
   const cep = req.body.inputCEP;
   
   const query = `INSERT INTO usuarios 
   (nome, sobrenome, usuario, email, cpf, rg, endereco, cidade, estado, senha, senha_confirmar, cep)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
   
 console.log(nome) 
console.log(sobrenome)
console.log(email)
console.log(usuario)
console.log(rg)
console.log(cpf)
console.log(senha)
console.log(confirmar)
console.log(endereco)
console.log(cidade)
console.log(estado)
console.log(cep)


})

//--------------------------------------------------------}


////// ROTA DO SERVIDOR ////

app.listen(8080, () => {
    console.log("Servidor rodando: http://localhost:8080/");
})