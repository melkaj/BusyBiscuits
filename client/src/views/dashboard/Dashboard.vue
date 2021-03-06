<template>
    <v-container class="fill-height" fluid>

        <!-- First Row - Main Pie Chart and a button to add data -->
        <v-row no-gutters class="my-6">

            <!-- Column one - Main pie chart -->
            <v-col sm="7" class="ma-auto">
                <v-card class="py-3" flat>
                    <v-card-title class="justify-center chart-title">
                        {{mainPieChartTitle}}
                    </v-card-title>
                    <canvas class="dashboard-main-chart"></canvas>
                </v-card>
            </v-col>

            <v-divider vertical></v-divider>

            <!-- Column two - Button to register data for the day -->
            <v-col sm="3" class="ma-auto">
                <h1 class="chart-title">Click Below to Track What You Did Today!</h1>
                <v-btn 
                text
                depressed
                color="white"
                style="background:#116466;"
                class="ma-5"
                to="time-spent-entry">
                    Track Time
                </v-btn>
            </v-col>
        </v-row>


        <!-- Second Row - Another pie chart -->
        <v-row no-gutters>
            <v-col sm="7" class="ma-auto py-3">
                <v-card flat>
                    <v-card-title class="justify-center chart-title">
                        {{title}}
                    </v-card-title>
                    <canvas class="dashboard-second-chart"></canvas>
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


        <!-- Row Three - Line Graph -->
        <v-row no-gutters>

            <!-- Column one - The Line Graph -->
            <v-col sm="7" class="ma-auto py-3">
                <LineGraph graphName="line-graph"/>
            </v-col>

            <v-divider inset vertical></v-divider>

            <!-- Column two - Drop down to change the linegraph -->
            <v-col sm="3" class="ma-auto">
                <v-select
                :items="lineGraphItems"
                item-value="id"
                item-text="category"
                label="Choose Category"
                chips
                @input='changeLineGraphBasedOnCategory'
                ></v-select>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
// @ is an alias to /src
import Chart from 'chart.js';
import ChartManager from '../../data/chartdata.js';
import LineGraph from '../../components/LineGraphs/LineGraphSection';
const { createLineGraphItems, createPieGraphItems } = require('../../utils/utils');

export default {
    name: 'Dashboard',
    data () {
        return {
            mainPieChartTitle: "Busy Chart From Past Week",
            lineGraphTitle: "Line Graph",
            lineGraphSubTitle: "Choose a category to visualize",
            title: "Pie Chart by Date",
            graphName: "line-graph",
            lineGraphItems: this.getLineGraphItems(),
            lineGraph: null,
            pieGraphItems: [],
            secondaryPieChart: null,
            defaultItems: { pieItem: null }
        }
    },
    components: {
        LineGraph,
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
        getLineGraphItems() {
            // Getting the categories for the line graph
            return createLineGraphItems(this.$store.getters.getCategories);
        },
        getDateItems() {
            // Getting the items
            const items = createPieGraphItems(this.$store.getters.getDates); 
            // Setting the default item
            this.defaultItems.pieItem = items[0].id
            // Returning the full array of items
            return items;
        },
        changeLineGraphBasedOnCategory(newCategory) {
            // Destroys the already created linechart as to avoid hover issues
            this.lineGraph.destroy();

            // Creating new Line Graph
            const newLineChartData = ChartManager.CreateLineGraphData(newCategory);
            this.lineGraph = this.createPieChart('line-graph', newLineChartData);
        },
        async changePieChartBasedOnDate(newDate) {
            // Destroys the already created linechart as to avoid hover issues            
            this.secondaryPieChart.destroy();

            // Generating new pie chart data based on the selected date
            const PieChartDataByDate = await ChartManager.CreatePieChartDataByDate(newDate);
            this.secondaryPieChart = this.createPieChart('dashboard-second-chart', PieChartDataByDate);
        }
    },
    async mounted() {
        // Getting the data from the database and caching it to the store
        // await this.$store.dispatch('setDataFromLastSevenDays'); 
        this.pieGraphItems = this.getDateItems();
        console.log(`mounted: ${this.pieGraphItems[0].id}`);

        // Getting the chart data needed to create the pie chart
        const thisWeeksPieChartData = ChartManager.GetThisWeeksPieChartOptions();
        const mostRecentPieChartData = await ChartManager.CreatePieChartDataByDate(this.pieGraphItems[0].id); 
        const lineChartData = ChartManager.CreateLineGraphData("sleep");

        // Accessing the DOM, and placing a pie chart at a specific location
        this.createPieChart('dashboard-main-chart', thisWeeksPieChartData);
        this.secondaryPieChart = this.createPieChart('dashboard-second-chart', mostRecentPieChartData);
        this.lineGraph = this.createPieChart('line-graph', lineChartData);
    }
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