
/**
 * Converts this array of objects into one object that can be used to create a chart
 *      by taking the average of all the elements
 * @param {Array} data - Array of Objects. Each object is a time-spent-entry 
 */
function convertDataToChartData(data) {
    // TODO: Maybe turn this chart data object to an array
    var chartDataObject = {
        sleep: 0,
        travel: 0,
        exercise: 0,
        on_phone: 0,
        on_computer: 0,
        games: 0,
        somethingelse: 0
    }

    const numberOfRows = data.length;

    for (let i = 0; i < data.length; i++) {
        chartDataObject.sleep += data[i].sleep;
        chartDataObject.travel += data[i].travel;
        chartDataObject.exercise += data[i].exercise;
        chartDataObject.on_phone += data[i].on_phone;
        chartDataObject.on_computer += data[i].on_computer;
        chartDataObject.games += data[i].games;
        chartDataObject.somethingelse += data[i].somethingelse;


        // console.log(`From utils-For : ${data[i].sleep}`);
        // console.log(`From utils-For : ${data[i].travel}`);
        // console.log(`From utils-For : ${data[i].exercise}`);
        // console.log(`From utils-For : ${data[i].on_phone}`);
        // console.log(`From utils-For : ${data[i].on_computer}`);
        // console.log(`From utils-For : ${data[i].games}`);
        // console.log(`From utils-For : ${data[i].somethingelse}`);
    }

    chartDataObject.sleep = (chartDataObject.sleep / numberOfRows).toFixed(1); 
    chartDataObject.travel = (chartDataObject.travel / numberOfRows).toFixed(1); 
    chartDataObject.exercise = (chartDataObject.exercise / numberOfRows).toFixed(1); 
    chartDataObject.on_phone = (chartDataObject.on_phone / numberOfRows).toFixed(1); 
    chartDataObject.on_computer = (chartDataObject.on_computer / numberOfRows).toFixed(1); 
    chartDataObject.games = (chartDataObject.games / numberOfRows).toFixed(1); 
    chartDataObject.somethingelse = (chartDataObject.somethingelse / numberOfRows).toFixed(1); 


    // console.log("\n\n");

    // console.log(`From utils- : ${chartDataObject.sleep}`);
    // console.log(`From utils- : ${chartDataObject.travel}`);
    // console.log(`From utils- : ${chartDataObject.exercise}`);
    // console.log(`From utils- : ${chartDataObject.on_phone}`);
    // console.log(`From utils- : ${chartDataObject.on_computer}`);
    // console.log(`From utils- : ${chartDataObject.games}`);
    // console.log(`From utils- : ${chartDataObject.somethingelse}`);

    return chartDataObject;
}



/**
 * Returning an object that will holds all array for each category
 * @param {Array} lastSevenDays - Array of objects
 */
function extractLineChartData(lastSevenDays) {
    var weekOfData = {
        sleep: [],
        travel: [],
        exercise: [],
        on_phone: [],
        on_computer: [],
        games: [],
        somethingelse: []
    };

    for (let i = 0; i < lastSevenDays.length; i++) {
        weekOfData.sleep.push(lastSevenDays[i].sleep);
        weekOfData.travel.push(lastSevenDays[i].travel);
        weekOfData.exercise.push(lastSevenDays[i].exercise);
        weekOfData.on_phone.push(lastSevenDays[i].on_phone);
        weekOfData.on_computer.push(lastSevenDays[i].on_computer);
        weekOfData.games.push(lastSevenDays[i].games);
        weekOfData.somethingelse.push(lastSevenDays[i].somethingelse);
    }

    return weekOfData;
}



/**
 * Returning an object that holds two arrays
 *      First is an array holding dates
 *      Second is array of objects that will hold the rest of the data
 * @param {Array} data - array of objects
 */
function extractDatesAndData(arrayOfObjects) {
    var dates = [];
    var dataColumns = [];

    for (let i = 0; i < arrayOfObjects.length; i++) {
        // Getting the date and placing it in its own array
        //      Then deleting it from the original object
        dates.push(arrayOfObjects[i].date_created);
        delete arrayOfObjects[i].date_created;

        // Placing the rest of the data into its own array as well
        dataColumns.push(arrayOfObjects[i]);
    }

    return { dates: dates, data: dataColumns };
}



/**
 * When labeling the line-graph, it should say 'Hours of' followed by the category
 *  However 'Hours of on_phone' does not seem correct
 *  Returns the correct ending to this label
 *  ex: category='on_phone'         returns 'phone time'
 * @param {String} category 
 */
function getCorrectPhrasingOfCategory(category) {
    switch(category) {
        case "sleep":
            return "sleep";
        case "travel":
            return "travel";
        case "exercise":
            return "exercise";
        case "on_phone":
            return "phone time";
        case "on_computer":
            return "computer time";
        case "games":
            return "gaming";
        case "somethingelse":
            return "doing something else";
        default:
            return "nothing";
    }
}



/**
 * Returns an array of objects. One element in the object will have the wording that the users sees
 *      And the other element will hold the wording that the program will understand
 * @param {Array} items - The linegraph labels in the v-select dropdown
 */
function getLineGraphDropDownSelections(items) {
    var ids = ['sleep', 'travel', 'exercise', 'on_phone', 'on_computer', 'games', 'somethingelse'];
    var dropDownSelections = [];

    for (let i = 0; i < items.length; i++) {
        let itemEntry = {};

        itemEntry["id"] = ids[i];
        itemEntry["category"] = items[i];

        dropDownSelections.push(itemEntry);
    }

    return dropDownSelections;
}


/**
 * Returns an array of objects. One element in the object will have the wording that the users sees
 *      And the other element will hold the wording that the program will understand
 * @param {Array} items - The piegraph labels in the v-select dropdown
 */
function getPieChartDropDownSelections(items) {
    var dropDownSelections = [];

    for (let i = 0; i < items.length; i++) {
        let itemEntry = {};

        itemEntry["id"] = items[i];
        itemEntry["date"] = items[i];

        dropDownSelections.push(itemEntry);
    }

    return dropDownSelections;
}



/**
 * Returning an object that holds the various colors of categories
 */
function getBackgroundColors() {
    return {
        sleep: 'rgba(255, 123, 0,1)',
        travel: 'rgba(166,49,224,1)',
        exercise: 'rgba(255, 247, 13,1)',
        on_phone: 'rgba(43,224,66,1)',
        on_computer: 'rgba(227, 57, 125,1)',
        games: 'rgba(30,61,227,1)',
        somethingelse: 'rgba(117, 223, 224,1)'
    }
}



/**
 * Returning an object that holds the various colors of categories
 * @param {String} chartType - Return colors based on what chart is calling it
 */
function getBorderColors(chartType) {
    if (chartType == "pie") {
        return {
            sleep: 'rgba(255, 255, 255,1)',
            travel: 'rgba(255, 255, 255,1)',
            exercise: 'rgba(255, 255, 255,1)',
            on_phone: 'rgba(255, 255, 255,1)',
            on_computer: 'rgba(255, 255, 255,1)',
            games: 'rgba(255, 255, 255,1)',
            somethingelse: 'rgba(255, 255, 255,1)',    
        }
    }
    return {
        sleep: 'rgba(255, 123, 0,1)',
        travel: 'rgba(166,49,224,1)',
        exercise: 'rgba(255, 247, 13,1)',
        on_phone: 'rgba(43,224,66,1)',
        on_computer: 'rgba(227, 57, 125,1)',
        games: 'rgba(30,61,227,1)',
        somethingelse: 'rgba(117, 223, 224,1)'    
    }
}



/**
 * Returns boolean depending on if the input is valid or not
 *      Valid input if string is in 'YYYY-MM-DD' format
 * @param {String} date - Input from the user
 */
function ValidateDate(date) {

    if (date === null || date.length > 10 || date.length < 8) return false;

    var yearmonthday = date.split('-');

    // Checking input was all integers
    for (let i = 0; i < yearmonthday.length; i++) {
        for (let j = 0; j < yearmonthday[i].length; j++) {
            if (yearmonthday[i].charCodeAt(j) < 48 || yearmonthday[i].charCodeAt(j) > 57)  return false;
        }
    }

    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (yearmonthday.length != 3)                          return false;
    if (yearmonthday[0] < 2020 || yearmonthday[0] > 2021)  return false;
    if (yearmonthday[1] < 1 || yearmonthday[1] > 12)       return false;
    if (yearmonthday[2] < 1 || yearmonthday[2] > 31)       return false;
    
    var month;
    // If month has 2 digits but the first is zero
    if (yearmonthday[1][0] == '0')                                 month = parseInt(yearmonthday[1][1]);
    
    // If month has 2 digits but the first is greater than zero
    if (yearmonthday[1][0] != '0' && yearmonthday[1].length > 1)   month = 10 + parseInt(yearmonthday[1][1]); 
    
    // If month has only one digit
    if (yearmonthday[1][0] != '0' && yearmonthday[1].length == 1)  month = 10 + parseInt(yearmonthday[1][0]); 

    // Checking if date is valid
    if (yearmonthday[2] > ListofDays[month-1] || yearmonthday[2] < 1)  return false; 

    return true;
}



/**
 * Returns a date formatted properly for SQL insertion
 * @param {String} unformattedDate
 */
function GetSQLDateFormat(unformattedDate) {
    var count = 0;
    var monthdayyear = [];
    var temp = ""
    while (unformattedDate[count] != ',')
    {
        if (unformattedDate[count] != '/')
        {
            temp+=unformattedDate[count];
        }
        else
        {
            monthdayyear.push(temp);
            temp = "";
        }
        count++;
    }
    // Gets the year    
    monthdayyear.push(temp);

    if (monthdayyear[0].length == 1)  monthdayyear[0] = '0' + monthdayyear[0];
    if (monthdayyear[1].length == 1)  monthdayyear[1] = '0' + monthdayyear[1];

    var formattedDate = `${monthdayyear[2]}-${monthdayyear[0]}-${monthdayyear[1]}`;
    return formattedDate;
}



/**
 * Returns a templated String with the given dates
 * @param {Array} dates 
 * 
 */
function getGraphTitle(dates) {
    if (dates.length == 1)  return `Graph from ${dates[0]}`;
    else                    return `Graphs from ${dates[0]} - ${dates[dates.length-1]}`;
}


module.exports = {
    getBackgroundColors,
    getBorderColors,
    getCorrectPhrasingOfCategory,
    extractDatesAndData,
    extractLineChartData,
    convertDataToChartData,
    getLineGraphDropDownSelections,
    getPieChartDropDownSelections,
    ValidateDate,
    GetSQLDateFormat,
    getGraphTitle,
}