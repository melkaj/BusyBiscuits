<template>
    <v-container class="fill-height" fluid>

        <!-- First Row - Main Pie Chart and a button to add data -->
        <v-row no-gutters class="my-6">

            <!-- Column one - Main pie chart -->
            <v-col sm="7" class="ma-auto">
                <v-card class="py-3" flat>
                    <v-card-title class="justify-center">
                        {{mainPieChartTitle}}
                    </v-card-title>
                    <canvas class="dashboard-main-chart"></canvas>
                </v-card>
            </v-col>

            <v-divider vertical></v-divider>

            <!-- Column two - Button to register data for the day -->
            <v-col sm="3" class="ma-auto">
                <h1 style="background:#26c6da;">This is just some wording</h1>
                <v-btn 
                text
                depressed
                color="primary"
                class="ma-5"
                to="timeentry">
                    Time Spent?
                </v-btn>
            </v-col>
        </v-row>


        <!-- Second Row - Secondary charts (Going to be line charts with some filters) -->
        <v-row no-gutters>
            <v-col sm="4" class="ma-auto py-3" v-for="(title, i) in titles" :key="i">
                <v-card>
                    <v-card-title class="justify-center">
                        {{title.title}}
                    </v-card-title>
                    <canvas class="dashboard-secondary-chart"></canvas>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
import Chart from 'chart.js';
import PieChartStuff from '../data/chartdata.js';

export default {
    name: 'Home',
    data () {
        return {
            mainPieChartTitle: "Wheres the time going?",
            titles: [
                { title: "Secondary Graph (1)", id: 0},
                { title: "Secondary Graph (2)", id: 1 },
            ],
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
        }
    },
    async mounted() {
        const mainPieChartData = await PieChartStuff.CreateTodaysPieChart(); 
        this.createPieChart('dashboard-main-chart', mainPieChartData);
        this.createPieChart('dashboard-secondary-chart', PieChartStuff.mockPieChartData());
    }
}
</script>
