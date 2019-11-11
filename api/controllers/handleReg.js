const express = require('express');
const bodyParser = require('body-parser');
const sha1hash = require('sha1');
const router = express.Router();
const uniqid = require('uniqid');
const {User} = require('../models/connectDb');
router.use(bodyParser.urlencoded({ extended: true }));

function handleReg(req,resp) {
    new User({
        login: req.body.login, 
        password: req.body.pass,
        token: `${uniqid()}${sha1hash(req.body.login)}`,
        notes: []
    }).save().then(data => resp.send(data)).catch(err => resp.send({userExists: true}));
}

module.exports = handleReg;