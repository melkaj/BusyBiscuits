
import store from '../store/index.js'
import Services from '../services/services';
const { getBackgroundColors, getBorderColors, convertDataToChartData, getCorrectPhrasingOfCategory } = require('../utils/utils');

const chartLabels = ['Sleep', 'Travel', 'Exercise', 'On the phone', 'On the computer', 'Playing games', 'Doing something else']

export default {
    /**
     * Returns an object that contains mock data
     */
    mockPieChartData() {
        return {
            type: 'pie',
            data: {
                labels: ['One', 'Two', 'Three'],
                datasets: [{
                    label: 'Just some numbers',
                    data: ['100', '200', '300'],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
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
     * Returns an object that can used to create a pie chart 
     */
    CreateThisWeeksPieChart() {
        // The data for the last seven days will be an array of objects
        const thisWeeksData = store.getters.getDataFromLastSevenDays;

        // Converts thisWeeksData to one object that can be used for the pie chart
        const data = convertDataToChartData(thisWeeksData);

        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'pie',
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
            }
        }

    },

    /**
     * Returns object with todays data 
     */
    async CreateTodaysPieChart() {
        // Axios call to receive todays time-spent entry
        const requestedData = await Services.getTodaysData();
        const data = requestedData.data;

        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'pie',
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
            }
        }
    },
    CreateLineGraphData(category) {
        // Getting the data for the line charts
        // Data will be an object of arrays
        //      Each element in the object will hold an array of data for the week
        const allTheData = store.getters.getWeekOfData;
        
        // Specifically getting the category needed
        const dataFromCategory = (allTheData[category]).reverse();

        // Getting the right phrasing for the labels
        //      ex: category is 'on_phone', so the label should be "Hours of 'phone time'"
        const categoryPhrasing = getCorrectPhrasingOfCategory(category);

        // Getting the dates for the past week to be the labels for the x-axis
        const lineChartLabels = (store.getters.getDates).reverse();

        // Colors used for the pie chart
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'line',
            data: {
                labels: lineChartLabels,
                datasets: [{
                    label: `Hours of ${categoryPhrasing}`,
                    data: dataFromCategory,
                    backgroundColor: [
                        backgroundColors[category]
                        // backgroundColors.sleep,
                        // backgroundColors.travel,
                        // backgroundColors.exercise,
                        // backgroundColors.onPhone,
                        // backgroundColors.onComputer,
                        // backgroundColors.games,
                        // backgroundColors.somethingelse
                    ],
                    borderColor: [
                        borderColors[category]
                        // borderColors.sleep,
                        // borderColors.travel,
                        // borderColors.exercise,
                        // borderColors.onPhone,
                        // borderColors.onComputer,
                        // borderColors.games,
                        // borderColors.somethingelse
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
