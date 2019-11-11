const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const {User} = require('../models/connectDb');
router.use(bodyParser.urlencoded({ extended: true }));

function getNote(req,res) {
    User.findOne({notes:{ $elemMatch: { noteId: req.params.noteId }}}, 'login notes', (err, profile) => { 
        res.send(profile);
    });
}

module.exports = getNote;