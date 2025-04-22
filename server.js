const express = require("express");

const sequelize = require("./src/config/config");
const router = require("./src/router/router");

const app = express();
 
app.use(express.json());

sequelize.authenticate()
    .catch((err) => {
        console.log(err);
        console.log("Não foi possivel se conectar MYSQl")
    })

sequelize.sync()
    .then(() => {
        console.log("Tabelas sincronizadas")
    })
    .catch((err) => {
        console.log(err)
    });
 
app.use("/api", router);
 
app.listen(8080, () => {
    console.log("API ONLINE");
});