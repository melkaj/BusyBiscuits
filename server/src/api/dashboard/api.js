const express = require('express');
const controller = require('./controller');
const utils = require('../../utils/utils');

const router = express.Router();


router.get('/', (req, res, next) => {

    const today = [utils.GetTodaysDate()];

    controller.getDataFromToday(today)
        .then( (response) => {
            console.log(`Hello from /dashboard/api: ${response[0]}`);
            res.status(200).send(response[0]);
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});

module.exports = router;