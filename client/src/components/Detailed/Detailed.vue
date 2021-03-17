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
                        <canvas :class="lineGraphName"></canvas>
                    </v-card>
                </v-col>
            </v-expand-x-transition>
        </v-row>        
    </v-container>
</template>

<script>
// import PieGraphGeneral from '../PieGraphs/PieGraphGeneral.vue';
import Chart        from 'chart.js';
import ChartManager from '../../data/chartdata.js';

export default {
    data() {
        return {
            dates: [],
            pieChart: null,                          // The pie chart itself
            pieChartName: "Pie-Chart-Detailed",      // The name of the pie chart
            lineGraph: null,                         // The line graph itself
            lineGraphName: "Line-Graph-Detailed",    // The name of the line graph   
            isDateSingular: false,                   // Might not even need
            message: '',    
            messageResponses: {
                error: "Something went wrong",
            }
        }
    },
    components: {
        // PieGraphGeneral,
    },
    methods: {
        pressedButton() {
            this.message = "Button was pressed...";
        },
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

            if (this.dates.length == 1)
            {
                // Generating new pie chart data based on the selected date
                const pieChartData = await ChartManager.GetPieChartOptionsByDate(this.dates[0]);
                this.pieChart = this.createGraph(this.pieChartName, pieChartData);
            }
            else if (this.dates.length == 2)
            {
                this.dates.sort();                

                // Generating new pie chart data based on the selected date
                const pieChartData = await ChartManager.GetPieChartOptionsByRange(this.dates);
                this.pieChart = this.createGraph(this.pieChartName, pieChartData);

                // TODO: Create line graph stuff here
            }
            else 
            {
                this.pieChart.destroy();
            }
        },
    },
    watch: {
        // dates: function () { console.log(`dates: ${this.dates}`); }
    },
    mounted() {
        console.log(`Hello from detailed... ${this.dates}`);
    }
}
</script>

<style scoped>
.error-text {
    color: red;
}
</style>