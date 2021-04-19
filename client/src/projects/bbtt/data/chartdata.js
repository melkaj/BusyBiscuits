// Importing main store
import store from '../../../store/index';
import Services from '../services/services';
const { getBackgroundColors, getBorderColors, convertDataToChartData, getCorrectPhrasingOfCategory } = require('../utils/utils');

// const chartLabels = store.getters.getCategories;
const chartLabels = store.getters['bbtt/getCategories'];

export default {


    /**
     * Gets the most recent week of data from the store and makes the 
     *      pie chart options out of it
     * @returns {Object}
     * 
     */
    GetPieChartOptionsByAverage() {
        // The data for the last seven days will be an ARRAY OF OBJECTS
        const thisWeeksData = store.getters['bbtt/getDataFromLastSevenDays'];        
        
        // Converts thisWeeksData to one object that can be used for the pie chart
        var data = convertDataToChartData(thisWeeksData);
        return this.GetPieChartOptions(data);
    },



    /**
     * Checks if the entry is cached in the store. If not, then we query 
     *      the database for it. Returns the pie chart options to create 
     *      the graph 
     * @param   {String} date
     * @returns {Object}
     * 
     */
    async GetPieChartOptionsByDate(date) {
        var data;

        // If the argument is a "date" that is in the cached array of dates
        // if (store.getters.getDates.includes(date))
        // {
        //     const index = store.getters.getDates.indexOf(date);
        //     data = store.getters.getDataFromLastSevenDays[index];
        // }
        if (store.getters['bbtt/getDates'].includes(date))
        {
            const index = store.getters['bbtt/getDates'].indexOf(date);
            data = store.getters['bbtt/getDataFromLastSevenDays'][index];
        }
        // If the date is not cached, need to see if its in the database
        else
        {
            const requestedData = await Services.getEntryByDate({ date: date });
            data = requestedData.data;        
        }

        return this.GetPieChartOptions(data);
    },



    /**
     * Calls Axios request to endpoint to query the database to get
     *      entries between a certain range. Then creates the options
     *      needed to make the pie chart
     * @param   {Array} data
     * @returns {Object}  
     * 
     */
    async GetPieChartOptionsByRange(range) {  
        console.log(`range: ${range}`);
        // TODO: create services and endpoint to get range 
        const rangeOfData = await Services.getEntriesByRange({ dates: range });

        var data = convertDataToChartData(rangeOfData.data);

        return this.GetPieChartOptions(data);
    },



    /**
     * Returns the options used to create the graph
     * @param   {Object} data
     * @returns {Object} 
     * 
     */
    GetPieChartOptions(data) {
        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors("pie");

        return {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Just some numbers',
                    data: [data.sleep, data.travel, data.exercise, data.on_phone, data.on_computer, data.games, data.somethingelse],
                    backgroundColor: [
                        backgroundColors.sleep,
                        backgroundColors.travel,
                        backgroundColors.exercise,
                        backgroundColors.on_phone,
                        backgroundColors.on_computer,
                        backgroundColors.games,
                        backgroundColors.somethingelse
                    ],
                    borderColor: [
                        borderColors.sleep,
                        borderColors.travel,
                        borderColors.exercise,
                        borderColors.on_phone,
                        borderColors.on_computer,
                        borderColors.games,
                        borderColors.somethingelse
                    ], 
                    borderWidth: 2
                }],
            },
            options: {
                responsive: true,
                legend: { display: false },
            }
        }
    },














    /**
    * @param {Array of Objects} totalData
    * @param {String}           category
    * 
    */
    GetLineChartOptions(totalData, category, dates) {
        // Specifically getting the category needed
        //      The labels come from most recent to oldest, so we make a deepcopy and
        //      then reverse it to get it into chronological order
        const dataBasedOnCategory = [...(totalData[category])];
        const reversedData = dataBasedOnCategory.reverse();

        // const allTheData = (store.getters.getWeekOfData);
        // const dataBasedOnCategory = [...(allTheData[category])];


        // Getting the right phrasing for the labels
        //      ex: category is 'on_phone', so the label should be "Hours of 'phone time'"
        const categoryPhrasing = getCorrectPhrasingOfCategory(category);

        // Getting the dates for the past week to be the labels for the x-axis
        //      The labels come from most recent to oldest, so we make a deepcopy and
        //      then reverse it to get it into chronological order
        const lineChartLabelsReverseOrder = [...(dates)];
        var lineChartLabels;
        if (lineChartLabelsReverseOrder[0] > lineChartLabelsReverseOrder[1])  lineChartLabels = lineChartLabelsReverseOrder.reverse();
        else  lineChartLabels = lineChartLabelsReverseOrder;
        
        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'line',
            data: {
                labels: lineChartLabels,
                datasets: [{
                    label: `Hours of ${categoryPhrasing}`,
                    data: reversedData,
                    fill: false,
                    backgroundColor: 
                        backgroundColors[category]
                        ,
                    borderColor: [
                        borderColors[category]
                    ], 
                    borderWidth: 2
                }],
            },
            options: {
                responsive: true,
            }
        }
    },












    /**
     * Returns the data needed to create a line graph based on the argument
     * The argument is the selection made from the dropdown
     * @param {Sting} category  
     */
    CreateLineGraphData(category) {
        // Getting the data for the line charts
        // Data will be an object of arrays
        //      Each element in the object will hold an array of data for the week
        // const allTheData = (store.getters.getWeekOfData);
        const allTheData = (store.getters['bbtt/getWeekOfData']);

        // Specifically getting the category needed
        //      The labels come from most recent to oldest, so we make a deepcopy and
        //      then reverse it to get it into chronological order
        const dataBasedOnCategory = [...(allTheData[category])];
        const reversedData = dataBasedOnCategory.reverse();
        
        // Getting the right phrasing for the labels
        //      ex: category is 'on_phone', so the label should be "Hours of 'phone time'"
        const categoryPhrasing = getCorrectPhrasingOfCategory(category);
        
        // Getting the dates for the past week to be the labels for the x-axis
        //      The labels come from most recent to oldest, so we make a deepcopy and
        //      then reverse it to get it into chronological order
        // const lineChartLabelsReverseOrder = [...(store.getters.getDates)];
        const lineChartLabelsUnOrdered = [...(store.getters['bbtt/getDates'])];
        const lineChartLabels = lineChartLabelsUnOrdered.sort();//.reverse();

        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'line',
            data: {
                labels: lineChartLabels,
                datasets: [{
                    label: `Hours of ${categoryPhrasing}`,
                    data: reversedData,
                    fill: false,
                    backgroundColor: 
                        backgroundColors[category]
                        ,
                    borderColor: [
                        borderColors[category]
                    ], 
                    borderWidth: 2
                }],
            },
            options: {
                responsive: true,
            }
        }
    }

}
