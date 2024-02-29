const express = require("express");
const { request } = require("http");

const app = express();

//const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta ,() => {
    console.log("Servidor Iniciado Na Porta " + porta);
});

app.get("/", (request, response) =>{ // request -> Vai para o front-end | Response -> Vai para o front-end
    response.send("Hellow World");
});