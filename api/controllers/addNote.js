const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const uniqid = require('uniqid');
const {User} = require('../models/connectDb');

router.use(bodyParser.urlencoded({ extended: true }));

async function addNote(req, res) {
    let note = {
        title: req.body.title,
        text: req.body.text,
        noteId: uniqid()
    };
    await User.findOneAndUpdate(
        {token: req.params.loginToken}, 
        {
            $push: {
                notes: {
                    $each: [{...note}], 
                    $position: 0
                }
            }
        }, 
        {new: true,  useFindAndModify: false}
    ).then(data => {
        res.send(...data.notes.filter(el => el.noteId == note.noteId));
    });
    
} 

module.exports = addNote;