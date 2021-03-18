<template>
    <v-container> 
        <v-row no-gutters>

            <v-col sm="7" class="ma-auto py-3">
                <v-card flat>
                    <v-card-title class="justify-center chart-title mb-2">
                        {{ title }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ subTitle }}
                    </v-card-subtitle>
                    <canvas :class='graphName'></canvas>
                </v-card>
            </v-col>

            <v-divider inset vertical></v-divider>

            <!-- Column two - Drop down to change the linegraph -->
            <v-col sm="3" class="ma-auto">
                <v-select
                :items="lineGraphItems"
                item-value="id"
                item-text="category"
                v-model="defaultDropdownSelection"
                label="Choose Category"                
                chips
                @input='changeLineGraphBasedOnCategory'
                ></v-select>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import Chart                   from 'chart.js';
import ChartManager            from '../../data/chartdata.js';
const { getLineGraphDropDownSelections } = require('../../utils/utils');

export default {
    data() {
        return {
            subTitle: "Choose a category to visualize",
            lineGraph: null,
            lineGraphItems: [],
            defaultDropdownSelection: null,
        }
    },
    props: {
        graphName: { type: String },
        title:     { type: String },
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
            return getLineGraphDropDownSelections(this.$store.getters.getCategories);
        },
        changeLineGraphBasedOnCategory(newCategory) {
            // Destroys the already created linechart as to avoid hover issues
            this.lineGraph.destroy();

            // Creating new Line Graph
            const newLineChartData = ChartManager.CreateLineGraphData(newCategory);
            this.lineGraph = this.createPieChart(this.graphName, newLineChartData);
        },
    },
    mounted() {
        this.lineGraphItems = this.getLineGraphItems();
        this.defaultDropdownSelection = this.lineGraphItems[0].id;

        const lineChartData = ChartManager.CreateLineGraphData("sleep");
        this.lineGraph = this.createPieChart(this.graphName, lineChartData);
    },  
}
</script>

<style scoped>
.chart-title {
    /* font-family: 'Segoe UI Light', Tahoma, Geneva, Verdana, sans-serif; */
    font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 36px;
    color: #116466;
}
.chart-sub-title {
    font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
    font-size: 28px;
    color: #116466;
}
</style>