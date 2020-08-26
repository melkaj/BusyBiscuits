<template>
    <v-container> 
        <v-row>
            <v-col sm="12">
                <h1>Hello from the component</h1>
                <v-card flat>
                    <v-card-title class="justify-center chart-title">
                        {{title}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{subTitle}}
                    </v-card-subtitle>
                    <!-- <canvas class="line-graph"></canvas> -->
                    <canvas :class='canvasName'></canvas>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chart from 'chart.js';
import ChartStuff from '../../data/chartdata';

export default {
    data() {
        return {
            title: "Line Graph",
            subTitle: "Choose a category to visualize"
        }
    },
    props: {
        canvasName: {
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
    },
    mounted() {
        // this.$store.dispatch('setLineChartData');
        console.log(`MOUNTED: ${this.$store.getters.getDataFromLastSevenDays}`);
        this.createPieChart('line-graph', ChartStuff.CreateLineGraphData("on_phone"));
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