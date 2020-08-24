const express = require('express');
const controller = require('./controller');
const utils = require('../../utils/utils');

const router = express.Router();


/**
 * GET request for last seven days of time-spent entries
 */
router.get('/last-seven-days', (req, res, next) => {

    // Response will be an array of objects. 
    // response[0] will be the most recent entry where response [6] will be the 7th latest entry
    controller.getDataFromLastSevenDays()
        .then( (response) => {
            res.status(200).send(response);
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});


/**
 * Gets TODAYS time-spent entry
 */
router.get('/today', (req, res, next) => {

    const today = [utils.GetTodaysDate()];

    controller.getDataFromToday(today)
        .then( (response) => {
            res.status(200).send(response[0]);
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});

module.exports = router;