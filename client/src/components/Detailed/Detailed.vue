<template>
    <v-container class="fill-height justify-center" fluid>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-date-picker
                    v-model="dates"
                    color="#116466"
                    range
                    width="60VH"
                ></v-date-picker>
            </v-col>
        </v-row>

<!-- BUTTON TO GET THE DATA AND CREATE THE GRAPHS -->
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-btn 
                text
                depressed
                color="#116466"
                style="background: white;"
                class="mx-5 my-2"
                @click="setGraphs">
                    Reveal Graphs
                </v-btn>
            </v-col>
        </v-row>

<!-- WHERE THE ERRORS WILL SHOW -->
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card-text class="error-text">
                    {{ message }}
                </v-card-text>
            </v-col>
        </v-row>


        <!-- USED FOR THE PIE GRAPH -->
        <v-row align="center" justify="center">
            <v-expand-x-transition>
                <v-col sm="7" class="ma-auto py-3">
                    <!-- <PieGraphGeneral :dates="dates" :graphName="piechart" :title="dates" /> -->
                    <v-card flat>
                        <v-card-title>
                            Data from dates: {{ dates }}
                        </v-card-title>
                        <!-- <canvas id="test"></canvas> -->
                        <canvas :class="pieChartName" id="test"></canvas>
                    </v-card>
                </v-col>
            </v-expand-x-transition>
        </v-row>        
        
        <!-- USED FOR THE LINE GRAPH - WILL ONLY DISPLAY WHEN THERE IS A RANGE OF DATES -->
        <v-row align="center" justify="center">
            <v-expand-x-transition>
                
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

                                 
                <!-- <v-col sm="7" class="ma-auto py-3">
                    <v-card flat>
                        <canvas :class="lineGraphName"></canvas>
                    </v-card>
                </v-col> -->
            </v-expand-x-transition>
        </v-row>        
    </v-container>
</template>

<script>
// import PieGraphGeneral from '../PieGraphs/PieGraphGeneral.vue';
import Chart        from 'chart.js';
import ChartManager from '../../data/chartdata.js';
const { getLineGraphDropDownSelections } = require('../../utils/utils');


export default {
    data() {
        return {
            dates:                    [],
            
            pieChart:                 null,                     // The pie chart itself
            pieChartName:             "Pie-Chart-Detailed",     // The name of the pie chart

            lineGraph:                null,                     // The line graph itself
            lineGraphName:            "Line-Graph-Detailed",    // The name of the line graph   
            lineGraphItems:           [],                       // Available options for the line graph
            defaultDropdownSelection: null,                     // Default drop down selection when graph is made
            
            message:                  '',    
            messageResponses: {
                error:                "Something went wrong",
            }
        }
    },
    methods: {
        createGraph(canvasId, chartData) {
            var ctx = document.getElementsByClassName(canvasId);
            return new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        },
        async setGraphs() {
            if (this.pieChart !== null) this.pieChart.destroy();

            var pieChartData;

            // TODO: MAYBE DO THE AXIOS CALL HERE INSTEAD OF THE FUNCTIONS THEMSELVES. THEN PASS
            //      THE RESPONSE IN THOSE FUNCTIONS

            if (this.dates.length == 1)
            {
                // Generating new pie chart data based on the selected date
                pieChartData = await ChartManager.GetPieChartOptionsByDate(this.dates[0]);
            }
            else if (this.dates.length == 2)
            {
                this.dates.sort();                

                // Generating new pie chart data based on the selected date
                pieChartData =  await ChartManager.GetPieChartOptionsByRange(this.dates);

                // lineChartData = await ChartManager.LINEGRAPH(this.$store.getters.getWeekOfData, "sleep");
                // TODO: Create line graph stuff here
            }
            else 
            {
                // TODO: dont know what to do here
                this.pieChart.destroy();
            }

            this.pieChart = this.createGraph(this.pieChartName, pieChartData);
        
        },

        //============================================================
        // METHODS USED FOR THE LINE GRAPH
        //============================================================
        getLineGraphItems() {
            // Getting the categories for the line graph
            return getLineGraphDropDownSelections(this.$store.getters.getCategories);
        },
        changeLineGraphBasedOnCategory(newCategory) {
            // Destroys the already created linechart as to avoid hover issues
            this.lineGraph.destroy();

            // Creating new Line Graph
            const newLineChartData = ChartManager.CreateLineGraphData(newCategory);
            this.lineGraph = this.createPieChart(this.lineGraphName, newLineChartData);
        },

    },
    mounted() {
        this.lineGraphItems = this.getLineGraphItems();
        this.defaultDropdownSelection = this.lineGraphItems[0].id;

        const lineChartData = ChartManager.CreateLineGraphData("sleep");
        this.lineGraph = this.createPieChart(this.lineGraphName, lineChartData);
    }
}
</script>

<style scoped>
.error-text {
    color: red;
}
</style>