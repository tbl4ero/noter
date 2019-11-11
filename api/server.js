const express = require('express');
const routes = require('./routes/index')
const {connectDb} = require('./models/connectDb');
const server = express();

server.use(routes.router);
server.use(express.static('../build'));

connectDb().then(async() => {
    server.listen(process.env.PORT || 5000);
}).catch(err => {
    console.log(err); 
});
