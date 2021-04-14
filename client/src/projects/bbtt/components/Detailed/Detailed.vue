<template>
    <v-container class="fill-height justify-center" fluid>
        
<!-- THE DATE PICKER -->
        <v-row align="center" justify="center">
            <v-col cols="8" class="center-element">
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
            <v-col cols="12" class="center-element">
                <v-btn 
                text
                depressed
                color="#116466"
                style="background: white;"
                class="mx-5 my-2"
                @click="setGraphs">
                    Reveal Graphs
                </v-btn>

                <!-- THE INFOMATION BUTTON -->
                <v-btn
                    style="background:white;"                    
                    text
                    icon
                    depressed
                    color="#116466"
                    @click.stop="dialog=true"
                >
                    ?
                </v-btn>
            </v-col>
        </v-row>

        <!-- THE DIALOG FOR THE INFO BUTTON -->
        <v-dialog
            v-model="dialog"
            max-width="300"
        >
            <v-card class="dialog-font-color">
                <v-card-title>
                    What to do?
                </v-card-title>

                <v-card-text>
                    Using the date picker above, choose a date (or a range of dates) to retrieve the entries and visualize them. From there you can interact with the graphs!
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="#116466"
                        style="background:white;"
                        @click="dialog=false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

<!-- WHERE THE ERRORS WILL SHOW -->
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card-text class="error-text center-element">
                    {{ message }}
                </v-card-text>
            </v-col>
        </v-row>


<!-- USED FOR THE PIE GRAPH -->
        <v-expand-x-transition>
            <v-row align="center" justify="center">
                <v-col sm="7" class="ma-auto py-3">
                    <!-- <PieGraphGeneral :dates="dates" :graphName="piechart" :title="dates" /> -->
                    <v-card flat>
                        <v-card-title v-if="pieChart!=null" class="justify-center chart-title mb-2">
                            {{ title }}
                        </v-card-title>
                        <!-- <canvas id="test"></canvas> -->
                        <canvas :class="pieChartName"></canvas>
                    </v-card>
                </v-col>
            </v-row>        
        </v-expand-x-transition>
        
<!-- USED FOR THE LINE GRAPH - WILL ONLY DISPLAY WHEN THERE IS A RANGE OF DATES -->
        <v-expand-x-transition>
            <v-row v-show="showLineGraph" align="center" justify="center">
                <!-- <v-card> -->
                    <v-col sm="8" class="ma-auto py-3">
                        <v-card flat>
                            <canvas :class='lineGraphName'></canvas>
                        </v-card>
                    </v-col>

                    <v-divider inset vertical></v-divider>

                    <!-- Column two - Drop down to change the linegraph -->
                    <v-col sm="2" class="ma-auto">
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
        </v-expand-x-transition>
    </v-container>
</template>

<script>
// import PieGraphGeneral from '../PieGraphs/PieGraphGeneral.vue';
import Chart        from 'chart.js';
import ChartManager from '../../data/chartdata.js';
import Services     from '../../services/services.js';
const { getLineGraphDropDownSelections, convertDataToChartData, 
        extractDatesAndData, extractLineChartData, 
        getGraphTitle } = require('../../utils/utils');


export default {
    data() {
        return {
            dates:                    [],
            title:                    `Graphs from dates: ${this.dates}`,
            dialog:                   false,
            
            pieChart:                 null,                     // The pie chart itself
            pieChartName:             "Pie-Chart-Detailed",     // The name of the pie chart

            lineGraph:                null,                     // The line graph itself
            lineGraphName:            "Line-Graph-Detailed",    // The name of the line graph   
            lineGraphItems:           [],                       // Available options for the line graph drop down
            lineGraphData:            [],                       // Entry data retrieved based on the user input
            lineGraphDates:           [],
            defaultDropdownSelection: null,                     // Default drop down selection when graph is made
            showLineGraph:            false,
            
            message:                  '',    
            messageResponses: {
                error:                "Something went wrong",
                nothingFound:         "No entries were found from those date(s)",
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
            if (this.pieChart !== null)  this.pieChart.destroy();
            if (this.lineGraph !== null) this.lineGraph.destroy();

            var data;

            // Check how many dates were entered
            //      If only date, check if the entry is cached in the store
            //      If not, then query it against the database
            //      If more than one date, then just run the query against
            //          the database
            if (this.dates.length == 1) 
            {
                if (this.$store.getters.getDates.includes(this.dates[0]))
                {
                    const index = this.$store.getters.getDates.indexOf(this.dates[0]);
                    data = this.$store.getters.getDataFromLastSevenDays[index];
                }
                // If the date is not cached, need to see if its in the database
                else
                {
                    const requestedData = await Services.getEntryByDate({ date: this.dates[0] });
                    data = requestedData.data;  
                }    
            }
            else 
            {
                this.dates.sort();          // Just in case the dates were chosen backwards             
                const rangeOfData = await Services.getEntriesByRange({ dates: this.dates });
                data = rangeOfData.data;  
            }

            // Checking what data was sent back and creating the necessary charts
            //      If one entry was sent back, Create a pie chart
            //      If more than one entry was sent back, then create pei and line graph
            //      If nothing was sent back, then put error message and clear graphs
            if (Object.keys(data)[0] == "sleep")      // Show only the Pie Chart 
            {
                this.title =          getGraphTitle(this.dates);
                this.message =        null;
                this.showLineGraph =  false;
                var pieChartOptions = ChartManager.GetPieChartOptions(data);
                this.pieChart =       this.createGraph(this.pieChartName, pieChartOptions);                    
            }
            else if (Object.keys(data)[0] == 0)       // Show both graphs 
            {
                this.message =        null;
                this.title =          getGraphTitle(this.dates);

                // Pie Chart
                var averagedData =    convertDataToChartData(data);
                pieChartOptions =     ChartManager.GetPieChartOptions(averagedData);
                this.pieChart =       this.createGraph(this.pieChartName, pieChartOptions);

                // Line Graph
                this.showLineGraph =     true;
                var dataAndDates =       extractDatesAndData(data);
                this.lineGraphData =     extractLineChartData(dataAndDates.data);
                this.lineGraphDates =    dataAndDates.dates;
                const lineGraphOptions = ChartManager.GetLineChartOptions(this.lineGraphData , "sleep", this.lineGraphDates);
                this.lineGraph =         this.createGraph(this.lineGraphName, lineGraphOptions);
            }
            else                                      // Clear the graphs
            {
                this.message =       this.messageResponses.nothingFound;
                this.showLineGraph = false;
                this.title =         null;
            }
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
            if (this.pieChart !== null)  this.lineGraph.destroy();

            // Creating new Line Graph
            const newLineChartData = ChartManager.GetLineChartOptions(this.lineGraphData ,newCategory, this.lineGraphDates);
            this.lineGraph = this.createGraph(this.lineGraphName, newLineChartData);
        },

    },
    mounted() {
        this.lineGraphItems = this.getLineGraphItems();
        this.defaultDropdownSelection = this.lineGraphItems[0].id;
    }
}
</script>

<style scoped>
.error-text {
    color: red;
}
.dialog-font-color {
    color:#116466 !IMPORTANT;
}
.center-element {
  display: flex;
  justify-content: center;
}
</style>