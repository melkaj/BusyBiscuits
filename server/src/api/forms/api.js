const express = require('express');
const controller = require('./controller');

const router = express.Router();

/**
 * POST request for submitting a time-spent form for todays date
 */
router.post('/', (req, res, next) => {

    const { sleep, travel, exercise, games, on_phone, on_computer, somethingelse, date } = req.body;

    const form = [date, 1, sleep, travel, exercise, on_phone, on_computer, games, somethingelse, 0];

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