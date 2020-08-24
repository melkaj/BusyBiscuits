

// async function startUp() {
//     // await this.$store.dispatch('addTimeSpentForLastSevenDays');
//     await store.dispatch('addTimeSpentForLastSevenDays');
// }


/**
 * Converts this array of objects into one object that can be used to create a chart
 * @param {Array} data - Array of Objects. Each object is a time-spent-entry 
 */
function convertDataToChartData(data) {
    // Maybe turn this chart data object to an array
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
    }

    chartDataObject.sleep = (chartDataObject.sleep / numberOfRows).toFixed(1); 
    chartDataObject.travel = (chartDataObject.travel / numberOfRows).toFixed(1); 
    chartDataObject.exercise = (chartDataObject.exercise / numberOfRows).toFixed(1); 
    chartDataObject.on_phone = (chartDataObject.on_phone / numberOfRows).toFixed(1); 
    chartDataObject.on_computer = (chartDataObject.on_computer / numberOfRows).toFixed(1); 
    chartDataObject.games = (chartDataObject.games / numberOfRows).toFixed(1); 
    chartDataObject.somethingelse = (chartDataObject.somethingelse / numberOfRows).toFixed(1); 


    return chartDataObject;
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
 * Returning an object that holds the various colors of categories
 */
function getBackgroundColors() {
    return {
        sleep: 'rgba(214,82,47,0.80)',
        travel: 'rgba(166,49,224,0.80)',
        exercise: 'rgba(54,140,201,0.8)',
        onPhone: 'rgba(43,224,66,0.8)',
        onComputer: 'rgba(214,190,42,0.8)',
        games: 'rgba(30,61,227,0.8)',
        somethingelse: 'rgba(201,227,27,0.8)'
    }
}

/**
 * Returning an object that holds the various colors of categories
 */
function getBorderColors() {
    return {
        sleep: 'rgba(214,82,47,1)',
        travel: 'rgba(166,49,224,1)',
        exercise: 'rgba(54,140,201,1)',
        onPhone: 'rgba(43,224,66,1)',
        onComputer: 'rgba(214,190,42,1)',
        games: 'rgba(30,61,227,1)',
        somethingelse: 'rgba(201,227,27,1)'
    }
}

module.exports = {
    getBackgroundColors,
    getBorderColors,
    // startUp,
    extractDatesAndData,
    convertDataToChartData,
}