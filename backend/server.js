const express = require("express");
const cors = require("cors");

const app = express();

// Permite que o React faça requisições para este servidor
app.use(cors());

// Permite receber dados em formato JSON
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.send("Servidor do Feedback 360 funcionando!");
});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});