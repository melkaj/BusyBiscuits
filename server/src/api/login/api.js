const express = require('express');
const controller = require('./controller');
const { jwtSignUser } = require('../../jwt/jwt');

const router = express.Router();


router.post('/', (req, res, next) => {

    const { email, password } = req.body;

    controller.login(email)
        .then( (response) => {
            // TODO: Add refresh token implementation
            console.log(resonse);
            res.status(200).json("Login successful");
        })
        .catch( (error) => {
            next(error);
        });

});

module.exports = router;