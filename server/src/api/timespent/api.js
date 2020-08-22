const express = require('express');
const controller = require('./controller');
const utils = require('../../utils/utils');

const router = express.Router();


router.post('/', (req, res, next) => {

    const { sleep, travel, exercise, games, onPhone, onComputer, somethingelse } = req.body;

    const today = utils.GetTodaysDate();

    const form = [today, 1, sleep, travel, exercise, onPhone, onComputer, games, somethingelse, 0];

    controller.submitForm(form)
        .then( (response) => {
            console.log(response);
            res.status(201).json("Form was successfully submitted");
        })
        .catch( (error) => {
            console.log(error);
            console.log(`inside the api:the catch: Just some stuff`);
            next(error);
        });

});

module.exports = router;