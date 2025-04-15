const express = require("express");
 
const userRoutes = require('./src/router/userRoutes');

const app = express();
 
app.use(express.json());
 
app.use("/api", userRoutes);
 
app.listen(8080, () => {
    console.log("API ONLINE");
});