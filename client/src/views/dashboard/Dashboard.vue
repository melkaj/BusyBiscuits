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
                <h1 class="chart-title">Put dropdown here</h1>
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
import LineGraph from '../../components/linegraphs/LineGraphSection';
const { createLineGraphItems } = require('../../utils/utils');

export default {
    name: 'Home',
    data () {
        return {
            mainPieChartTitle: "Busy Chart From Past Week",
            lineGraphTitle: "Line Graph",
            lineGraphSubTitle: "Choose a category to visualize",
            title: "Today's Pie Chart",
            graphName: "line-graph",
            lineGraphItems: this.getLineGraphItems(),
            lineGraph: null,
            // lineChartData: ChartManager.CreateLineGraphData("sleep")

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
        getLineGraphItems(){
            // Getting the categories for the line graph
            return createLineGraphItems(this.$store.getters.getCategories);
        },
        changeLineGraphBasedOnCategory(newCategory) {
            // Destroys the already created linechart as to avoid hover issues
            this.lineGraph.destroy();

            // Creating new Line Graph
            const newLineChartData = ChartManager.CreateLineGraphData(newCategory);
            this.lineGraph = this.createPieChart('line-graph', newLineChartData);
        }
    },
    async mounted() {
        // Getting the data from the database and caching it to the store
        await this.$store.dispatch('setDataFromLastSevenDays');

        // Getting the chart data needed to create the pie chart
        const todaysPieChartData = await ChartManager.CreateTodaysPieChart(); 
        const thisWeeksPieChartData = ChartManager.CreateThisWeeksPieChart();
        const lineChartData = ChartManager.CreateLineGraphData("on_phone");

        // Accessing the DOM, and placing a pie chart at a specific location
        this.createPieChart('dashboard-main-chart', thisWeeksPieChartData);
        this.createPieChart('dashboard-second-chart', todaysPieChartData);
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