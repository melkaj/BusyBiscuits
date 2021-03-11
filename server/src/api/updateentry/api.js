const express = require('express');
const controller = require('./controller');

const router = express.Router();


/**
 * PATCH request to update entry based on date
 */
router.patch('/date', (req, res, next) => {

    const { date, updatedForm } = req.body;

    const { sleep, travel, exercise, games, on_phone, on_computer, somethingelse } = updatedForm;

    const form = [sleep, travel, exercise, on_phone, on_computer, games, somethingelse, date];

    controller.updateEntry(form)
        .then( (response) => {
            console.log(response);
            res.status(201).json("Entry was updated");
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});


module.exports = router;