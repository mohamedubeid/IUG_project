require('dotenv').config()
const User = require('../models/loginModels');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    User.findEmail(email).then((user) => {
        if (user.length !== 0) {
            return res.status(409).send({ msg: "user is already exist" });
        } else {
            const newUser = {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
            };
            bcrypt.hash(newUser.password, 10, function (err, hash) {
                if (err) throw err;
                newUser.password = hash;
                User.saveUser(newUser)
                    .then(res.status(201).send({ msg: 'user added successfully ^_^' }))
                    .catch((err) => console.log(err));
            });
        };
    });
};

const loginUser = async (req, res) => {
    const { email, password, remember } = req.body;
    User.findEmail(email).then((user) => {
        if (user.length === 0) {
            return res.status(404).send({ msg: "email dosent exist" });
        };
        bcrypt.compare(password, user[0].password, (bErr, bResult) => {
            if (bErr) {
                return res.status(401).send({
                    msg: "mail or password is incorrect!"
                });
            } else if (!bResult) {
                return res.status(401).send({ msg: "Invalid Password!" });
            } else {
                const userToken = {
                    id: user[0].id,
                    email: email,
                }
                const exTime = remember ? '72h' : '24h';
                const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: `${exTime}` });
                User.updateUser(user[0].id, accessToken).then((result, err) => {
                    if (err) return res.status(400).send({ msg: err });
                    return res.status(200).send({
                        msg: 'Logged in!',
                        accessToken: accessToken
                    });
                })
            }
        });
    });
};

const logOut = async (req, res) => {
    const user = req.user;
    User.deleteToken(user.id).then((result, err) => {
        if (err) return res.status(400).send({ msg: err });
        return res.sendStatus(204);
    });
};

module.exports = {
    registerUser,
    loginUser,
    logOut
};