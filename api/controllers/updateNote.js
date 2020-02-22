const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { User } = require("../models/connectDb");

router.use(bodyParser.urlencoded({ extended: true }));

function updateNote(req, res) {
    User.findOneAndUpdate(
        {
            notes: {
                $elemMatch: { noteId: req.params.noteId }
            }
        },
        {
            $set: {
                "notes.$.text": req.body.text,
                "notes.$.title": req.body.title
            }
        },
        { new: true, useFindAndModify: false }
    ).then(data => {
        res.send(data);
    });
}

module.exports = updateNote;
