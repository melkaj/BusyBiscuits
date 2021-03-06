<template>
    <v-container> 

        <!-- Second Row - Another pie chart -->
        <v-row no-gutters>
            <v-col sm="7" class="ma-auto py-3">
                <v-card flat>
                    <v-card-title class="justify-center chart-title">
                        {{ title }}
                    </v-card-title>
                    <canvas :class='graphName'></canvas>
                </v-card>
            </v-col>

            <v-divider inset vertical></v-divider>

            <!-- Column two - Dropdown to change the data in the pie chart -->
            <v-col sm="3" class="ma-auto">
                <v-select
                :items="pieGraphItems"
                item-value="id"
                item-text="date"
                v-model="defaultItems.pieItem"
                label="Choose Date"
                chips
                @input='changePieChartBasedOnDate'
                ></v-select>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Chart from 'chart.js';
import ChartManager from '../../data/chartdata.js';
const { createPieGraphItems } = require('../../utils/utils');
// import ChartStuff from '../../data/chartdata';

export default {
    data() {
        return {
            title: "Pie Graph",
            subTitle: "Choose a date",
            pieGraphItems: [],
            defaultItems: { pieItem: null },
            pieChart: null,
            // graphType: '',
        }
    },
    props: {
        graphName: {
            type: String
        }
    },
    methods: {
        createPieChart(canvasId, chartData) {
            var ctx = document.getElementsByClassName(canvasId);
            return new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        },
        async changePieChartBasedOnDate(newDate) {
            // Destroys the already created linechart as to avoid hover issues            
            this.pieChart.destroy();

            // Generating new pie chart data based on the selected date
            const PieChartDataByDate = await ChartManager.CreatePieChartDataByDate(newDate);
            this.pieChart = this.createPieChart(this.graphName, PieChartDataByDate);
        },
        getDateItems() {
            // Getting the items
            const items = createPieGraphItems(this.$store.getters.getDates); 
            // Setting the default item
            this.defaultItems.pieItem = items[0].id;
            console.log(`items: ${items}`);
            // Returning the full array of items
            return items;
        },
    },
    async mounted() {
        // Getting the data from the database and caching it to the store
        // await this.$store.dispatch('setDataFromLastSevenDays'); 
        console.log(`hellp from piegraph:`);
        this.pieGraphItems = this.getDateItems();
        console.log(`mounted: ${this.pieGraphItems[0].id}`);

        // Getting the chart data needed to create the pie chart
        // const thisWeeksPieChartData = ChartManager.CreateThisWeeksPieChart();
        const mostRecentPieChartData = await ChartManager.CreatePieChartDataByDate(this.pieGraphItems[0].id); 

        // Accessing the DOM, and placing a pie chart at a specific location
        this.pieChart = this.createPieChart(this.graphName, mostRecentPieChartData);
    },  
}
</script>

<style scoped>
.chart-title {
    font-family: 'Segoe UI Light', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: Bold;
    font-size: 36px;
}
.chart-sub-title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
    font-size: 28px;
}
</style>