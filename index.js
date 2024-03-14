const express = require("express");
const cors = require("cors");

const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta ,() => {
    console.log("Servidor Iniciado Na Porta " + porta);
});

app.get("/", (request, response) =>{ // request -> vem para o front-end | Response -> Vai para o front-end
    response.send("Hellow World");
});