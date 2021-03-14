const express = require('express');
const controller = require('./controller');

const router = express.Router();

// REMOVE ENTRY
/**
 * PATCH request to update entry based on date
 */
router.delete('/:date', (req, res, next) => {
    const date = req.params.date;

    controller.removeEntry([date])
        .then( (response) => {
            res.status(200).json({ message:"Entry was deleted", affectedRows:response.affectedRows });
        })
        .catch( (error) => {
            console.log(error);
            next(error);
        });

});


module.exports = router;