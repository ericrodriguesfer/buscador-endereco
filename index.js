const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cepPromise = require("cep-promise");
const app = express();

app.use(express.static('public/'));

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(require, response){
    response.render("home/index");
});

app.get("/erro", function(require,response){
    response.render("erro/index");
});

app.post("/search", function(require, response){
    cepPromise(require.body.cep_search).then((cep) => {
        response.render("home/index", {cep: cep});
    }).catch((eror) => {
        response.redirect("/erro");
    });    
});

app.listen(3333, () => {
    console.log('Aplication was started...');
});