const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { User } = require("../models/connectDb");

router.use(bodyParser.urlencoded({ extended: true }));

function handleLogin(req, resp) {
    User.findOne(
        { login: req.body.login, password: req.body.pass },
        "login token",
        (err, profile) => {
            if (err || profile == null) {
                resp.send({ token: null });
            } else {
                resp.send(profile);
            }
        }
    );
}

module.exports = handleLogin;
