
import Services from '../services/services';
const { getBackgroundColors, getBorderColors } = require('../utils/utils');

export default {
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
    async CreateTodaysPieChart() {
        const requestedData = await Services.getTodaysData();
        const data = requestedData.data;

        console.log(data);
        const backgroundColors = getBackgroundColors();
        const borderColors = getBorderColors();

        return {
            type: 'pie',
            data: {
                labels: ['Sleep', 'Travel', 'Exercise', 'On the phone', 'On the computer', 'Playing games', 'Doing something else'],
                datasets: [{
                    label: 'Just some numbers',
                    data: [data.sleep, data.travel, data.exercise, data.on_phone, data.on_computer, data.games, data.somethingelse],
                    backgroundColor: [
                        backgroundColors.sleep,
                        backgroundColors.travel,
                        backgroundColors.exercise,
                        backgroundColors.onPhone,
                        backgroundColors.onComputer,
                        backgroundColors.games,
                        backgroundColors.somethingelse
                    ],
                    borderColor: [
                        borderColors.sleep,
                        borderColors.travel,
                        borderColors.exercise,
                        borderColors.onPhone,
                        borderColors.onComputer,
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
    }

}
