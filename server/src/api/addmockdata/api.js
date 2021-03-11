const express = require('express');
const controller = require('./controller');
const utils = require('../../utils/utils');

const router = express.Router();


router.get('/', (req, res, next) => {
    const form = [today, 1, sleep, travel, exercise, on_phone, on_computer, games, somethingelse, 0];

    let numberOfRowsToEnter = 7; 
    let data = [];
    let total = 24;

    for (let i = 1; i < numberOfRowsToEnter; i++) {
        let row = [];

        // 3 - 10
        let sleep = Math.floor((Math.random() * 8) + 3);
        row.append(sleep);
        
        // 0 - 3
        let travel = Math.floor((Math.random() * 4));
        row.append(travel);

        // 0 - 5
        let exercise = Math.floor(Math.random() * 6);
        row.append(exercise);

        // 1 - 6
        let on_phone = Math.floor((Math.random() * 6) + 1);
        row.append(on_phone);

        // 1 - 6
        let on_computer = Math.floor((Math.random() * 6) + 1);
        row.append(on_computer);


    }

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