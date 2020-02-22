const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { User } = require("../models/connectDb");

router.use(bodyParser.urlencoded({ extended: true }));

async function deleteNote(req, res) {
    let noteId = req.params.noteId;
    User.findOne({ token: req.params.loginToken }, async (err, doc) => {
        if (err) {
        } else {
            doc.notes = doc.notes.filter(note => note.noteId != noteId);
            await doc.save();
            res.send({ sucess: true });
        }
    });
}

module.exports = deleteNote;
