<template>
    <v-container> 

        <!-- Pie Chart -->
        <v-row no-gutters>
            <v-col cols="12" sm="7" class="ma-auto py-3">
                <v-card flat>
                    <v-card-title class="center-element chart-title mb-2">
                        {{ title }}
                    </v-card-title>
                    <v-card-subtitle class="center-element">
                        {{ subTitle }}
                    </v-card-subtitle>
                    <canvas :class='graphName'></canvas>
                </v-card>
            </v-col>

            <v-divider inset vertical></v-divider>

            <!-- Column two - Dropdown to change the data in the pie chart -->
            <v-col cols="12" sm="3" class="ma-auto">
                <v-select
                :items="pieGraphItems"
                item-value="id"
                item-text="date"
                v-model="defaultDropdownSelection"
                label="Choose Date"
                chips
                @input='changePieChartBasedOnDate'
                ></v-select>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import Chart                  from 'chart.js';
import ChartManager           from '../../data/chartdata.js';
const { getPieChartDropDownSelections } = require('../../utils/utils');

export default {
    data() {
        return {
            subTitle:       "Choose a date or see the average over the past week",
            pieGraphItems: [],
            defaultDropdownSelection: null,
            pieChart:      null,
        }
    },
    props: {
        graphName: { type: String },
        title:     { type: String },
    },
    watch: {
        "$store.state.bbttDatabase.database": {
            handler: function() {
                this.redoChart();
            },
            deep: true,
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

            if (newDate == "7-Day Average")
            {
                const thisWeeksPieChartData = ChartManager.GetPieChartOptionsByAverage();
                this.pieChart = this.createPieChart(this.graphName, thisWeeksPieChartData);
            }
            else
            {
                // Generating new pie chart data based on the selected date
                const PieChartDataByDate = await ChartManager.GetPieChartOptionsByDate(newDate);
                this.pieChart = this.createPieChart(this.graphName, PieChartDataByDate);
            }
        },
        getDateItems() {
            // Getting the items
            var items = getPieChartDropDownSelections(this.$store.getters['bbtt/getDates'], "pie");
            items.unshift({ id: "7-Day Average", date: "7-Day Average" });            
            
            // Setting the default item
            this.defaultDropdownSelection = items[0].id;

            // Returning the full array of items
            return items;
        },
        redoChart() {
            // When the store changes, the pie chart will changed based off the new data    
            this.pieChart.destroy();

            // Getting the data from the database and caching it to the store
            this.pieGraphItems = this.getDateItems();
            this.defaultDropdownSelection = this.pieGraphItems[0].id;

            const thisWeeksPieChartData = ChartManager.GetPieChartOptionsByAverage();
            this.pieChart = this.createPieChart(this.graphName, thisWeeksPieChartData);
        }
    },
    mounted() {
        // Getting the data from the database and caching it to the store
        this.pieGraphItems = this.getDateItems();

        const thisWeeksPieChartData = ChartManager.GetPieChartOptionsByAverage();
        this.pieChart = this.createPieChart(this.graphName, thisWeeksPieChartData);
    },  
}
</script>

<style scoped>
.chart-title {
    font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 36px;
    color: #116466;
    padding: 20px;
    word-break: normal;
}
.chart-sub-title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
    font-size: 28px;
    color: #116466;
}
.center-element {
  display: flex;
  justify-content: center;
}
</style>