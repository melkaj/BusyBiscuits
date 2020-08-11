const express = require('express');
const controller = require('./controller');
const { jwtSignUser } = require('../../jwt/jwt');

const router = express.Router();


router.post('/', (req, res, next) => {

    const { email, password } = req.body;

    controller.login(email)
        .then( (response) => {
            
        })
        .catch( (error) => {

        });

});

module.exports = router;