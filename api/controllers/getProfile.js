const express = require("express");
const bodyParser = require("body-parser");
const { User } = require("../models/connectDb");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

function getProfile(req, res) {
    User.findOne(
        { token: req.params.token },
        "login token notes",
        (err, profile) => {
            if (err) {
                res.send({ wrongInfo: true });
            } else if (profile == null) {
                res.send({ wrongInfo: true });
            } else {
                res.send(profile);
            }
        }
    );
}

module.exports = getProfile;
