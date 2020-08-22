<template>
  <div class="home">
    <h1>Hello from Dashboard</h1>
    <canvas id="dashboard-chart"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import Chart from 'chart.js';
import chartData from '../data/chartdata.js'

export default {
    name: 'Home',
    data () {
        return {
            chartData: chartData
        }
    },
    methods: {
        createPieChart(canvasId, chartData) {
            var ctx = document.getElementById(canvasId);
            return new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        }
    },
    mounted() {
        this.createPieChart('dashboard-chart', this.chartData);
    }
}
</script>
