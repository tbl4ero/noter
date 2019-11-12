const express = require('express');
const routes = require('./api/routes/index')
const {connectDb} = require('./api/models/connectDb');
const server = express();
const path = require('path');

server.use(routes.router);
server.use(express.static(path.resolve(__dirname,'build')));
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

connectDb().then(async() => {
    server.listen(process.env.PORT || 5000);
}).catch(err => {
    console.log(err); 
});
