const express = require("express");
const path = require('path');
const routes = require("./api/routes/index");
const { connectDb } = require("./api/models/connectDb");
const server = express();

const staticFolder =
    process.env.PRODUCTION == "true"
        ? path.resolve(__dirname, "build")
        : path.resolve(__dirname, "public");
const entry = 
    process.env.PRODUCTION == "true"
        ? path.resolve(__dirname, "build", "index.html")
        : path.resolve(__dirname, "public", "index.html");

server.use(routes.router);
server.use(express.static(staticFolder));

server.get("*", (req, res) => {
    res.sendFile(entry);
});

connectDb(`${process.env.DB_ADDRESS}`)
    .then(async () => {
        server.listen(process.env.PORT || 5000);
    })
    .catch(err => {
        console.log(err);
    });
