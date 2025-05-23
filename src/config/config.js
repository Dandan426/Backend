
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "user_db", // Nome do banco
    "root", // Usuario do banco
    "admin", // Senha do banco
    {
        host: "localhost", // Host do banco
        port: 3306, // MySQL
        dialect: "mysql",
        logging: false
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Conexão estabelecida com sucesso MYSQL")
    })
    .catch((err) => {
        console.log("Não foi possivel se conectar MySQL")
    })

module.exports = sequelize;