const express = require('express');
const controller = require('./controller');

const router = express.Router();

// REMOVE ENTRY
/**
 * PATCH request to update entry based on date
 */
router.delete('/:date', (req, res, next) => {
    const date = req.params.date;

    console.log(`datePARAMS: ${req.params.date}`);
    console.log(`date: ${date}`);
    // console.log(`dateTYPE: ${typeof(date)}`);

    controller.removeEntry([date])
        .then( (response) => {
            console.log(response);
            console.log(response.affectedRows);
            res.status(200).json({ message:"Entry was deleted", affectedRows:response.affectedRows });
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});


module.exports = router;