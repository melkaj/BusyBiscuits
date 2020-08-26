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


        <!-- Second Row - Secondary charts (Going to be line charts with some filters) -->
        <v-row no-gutters>
            <v-col sm="5" class="ma-auto py-3">
                <v-card flat>
                    <v-card-title class="justify-center chart-title">
                        {{titles[0].title}}
                    </v-card-title>
                    <canvas class="dashboard-second-chart"></canvas>
                </v-card>
            </v-col>

            <v-col sm="5" class="ma-auto py-3">
                <!-- <LineGraph cavasName="line-graph"/> -->
                <LineGraph graphName="line-graph"/>

                <!-- <v-card flat>
                    <v-card-title class="justify-center chart-title mb-2">
                        {{lineGraphTitle}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{lineGraphSubTitle}}
                    </v-card-subtitle>
                    <canvas class="line-graph"></canvas>
                    <canvas canvasName="line-graph"></canvas>
                </v-card> -->
            </v-col>


            <!-- <v-col sm="5" class="ma-auto py-3" v-for="(title, i) in titles" :key="i">
                <v-card flat>
                    <v-card-title class="justify-center chart-title">
                        {{title.title}}
                    </v-card-title>
                    <canvas class="dashboard-secondary-chart"></canvas>
                </v-card>
            </v-col> -->
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
import Chart from 'chart.js';
import PieChartStuff from '../../data/chartdata.js';
import LineGraph from '../../components/linegraphs/LineGraphSection';
// const { startUp } = require('../../utils/utils');

export default {
    name: 'Home',
    data () {
        return {
            mainPieChartTitle: "Busy Chart From Past Week",
            lineGraphTitle: "Line Graph",
            lineGraphSubTitle: "Choose a category to visualize",
            titles: [
                { title: "Today's Pie Chart", id: 0},
                { title: "Secondary Graph (2)", id: 1 },
            ],
            graphName: "line-graph"
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
        // createThisWeeksPieChart() {
        //     this.$store.getters.getLastSevenDays
        // }
    },
    async mounted() {

        await this.$store.dispatch('setDataFromLastSevenDays');

        // Getting the chart data needed to create the pie chart
        const todaysPieChartData = await PieChartStuff.CreateTodaysPieChart(); 
        const thisWeeksPieChartData = PieChartStuff.CreateThisWeeksPieChart();
        const lineChartData = PieChartStuff.CreateLineGraphData("on_phone");

        // Accessing the DOM, and placing a pie chart at a specific location
        this.createPieChart('dashboard-main-chart', thisWeeksPieChartData);
        this.createPieChart('dashboard-second-chart', todaysPieChartData);
        this.createPieChart('line-graph', lineChartData);
        // this.createPieChart('line-graph', PieChartStuff.CreateLineGraphData("sleep"));
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