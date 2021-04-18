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
    for (let i = 0; i < 7; i++) 
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
 * Returns a object of objects 
 */
function populateDatabase() {
    const dates = getDatesForMockData();

    let data = {}

    const entries = [
        { sleep: 10, travel: 1, exercise: 2, on_phone: 3, on_computer: 5, games: 1, somethingelse: 2 },
        { sleep: 9, travel: 1, exercise: 1, on_phone: 2, on_computer: 6, games: 1, somethingelse: 4 },
        { sleep: 7, travel: 1, exercise: 1, on_phone: 1, on_computer: 7, games: 1, somethingelse: 6 },
        { sleep: 7, travel: 2, exercise: 2, on_phone: 3, on_computer: 6, games: 0, somethingelse: 4 },
        { sleep: 8, travel: 1, exercise: 0, on_phone: 2, on_computer: 5, games: 3, somethingelse: 5 },
        { sleep: 8, travel: 2, exercise: 3, on_phone: 3, on_computer: 8, games: 0, somethingelse: 0 },
        { sleep: 8, travel: 1, exercise: 3, on_phone: 1, on_computer: 6, games: 4, somethingelse: 1 }
    ];


    for (let i = 0; i < dates.length; i++) 
    {
        let date = dates[i];
        data[date] = entries[i];
    }

    return data;
}



module.exports = {
    populateDatabase,
    getDatesForMockData,
}