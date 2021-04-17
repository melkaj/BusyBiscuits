// const { GetSQLDateFormat } = require('./utils.js');



/**
 * Returns an array of strings. The strings are dates from the past week
 *  excluding todays date

 * @param { None }  None
 * @param { Array } Array of Strings
 */
function getDatesForMockData() {
    
    let dates = []
    let date = new Date();
    var listofDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    let year  = date.getFullYear();       // Number
    let month = date.getMonth() + 1;      // Number
    let day   = date.getDate();           // Number

    // Getting the past 6 dates (excluding todays date)
    for (let i = 0; i < 6; i++) 
    {
        let newDate = "";
        let newDay;
        let newMonth;
        let newYear;

        // Because we are moving backwards, we need to make sure the day or month does not 
        // become ZERO and just have it roll back to the previous month or year
        if (day !== 1)        { newDay = day-1;               newMonth = month;   newYear = year;   }
        else
        {
            if (month !== 1)  { newDay = listofDays[month-2]; newMonth = month-1; newYear = year;   }
            else              { newDay = listofDays[11];      newMonth = 12;      newYear = year-1; }
        }

        newDate = `${newYear}-${newMonth}-${newDay}`;
        dates.push(newDate);

        day = newDay;  month = newMonth;  year = newYear;
    }

    return dates;
}



/**
 * 
 */
function populateDatabase() {
    const dates = getDatesForMockData();
    console.log(`dates: ${dates}`);
}



module.exports = {
    populateDatabase,
    getDatesForMockData,
}