const express = require('express');
const controller = require('./controller');
const utils = require('../../utils/utils');

const router = express.Router();

/**
 * POST request for submitting a time-spent form for todays date
 */
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
            next(error);
        });

});

module.exports = router;