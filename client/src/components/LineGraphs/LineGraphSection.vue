<template>
    <v-container> 
        <v-row>
            <v-col sm="12">
                <v-card flat>
                    <v-card-title class="justify-center chart-title mb-2">
                        {{title}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{subTitle}}
                    </v-card-subtitle>
                    <canvas :class='graphName'></canvas>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Chart from 'chart.js';
// import ChartStuff from '../../data/chartdata';

export default {
    data() {
        return {
            title: "Line Graph",
            subTitle: "Choose a category to visualize",
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
    },
    // mounted() {
    //     // this.$store.dispatch('setLineChartData');
    //     this.createPieChart(this.graphName, ChartStuff.CreateLineGraphData("on_phone"));
    // },  
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