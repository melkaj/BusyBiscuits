<template>
        <v-card class="fill-height justify-center">
            <v-row justify="start" align="start" no-gutters>
                <v-card-title class="form-card-heading">
                    Delete an entry:
                </v-card-title>
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

            </v-row>

<!-- POPUP TO EXPLAIN WHAT THE SECTION OF THE FORM DOES -->
            <v-dialog
                v-model="dialog"
                max-width="400"
            >
                <v-card class="dialog-font-color">
                    <v-card-title>
                        What to do
                    </v-card-title>

                    <v-card-text>
                    To delete an entry, enter a date in the YYYY-MM-DD format and then hit the 'DELETE ENTRY' button
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

            <v-form ref="form">

                <v-row align="center" justify="center">
                    <v-col cols="8" md="3">
                        <v-text-field
                            v-model="date"
                            label="YYYY-MM-DD"
                            :counter=10
                            type="string"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="8" md="3" class="center-element">
                        <v-btn 
                        text
                        depressed
                        color="#116466"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="validateDate">
                            Delete Entry
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="8" sm="8">
                        <v-card-text :class="setMessageColor" class="center-element">
                            {{message}}
                        </v-card-text>
                    </v-col>
                </v-row>

            </v-form>
        </v-card>
</template>

<script>
// @ is an alias to /src
const { ValidateDate, getCorrectDateFromUser } = require('../../utils/utils');

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            date: null,
            formerEntry: {},
            isSuccess: null,
            dialog: false,
            message: '',
            messageResponses: {
                success:       "Entry was deleted",
                entryNotFound: "Entry was not found. Double check your input",
                invaliddate:   "Date entered was invalid",
                invalidInputs: "Check that all fields have values",
            }
        }
    },
    computed: {
        setMessageColor() {
            return this.isSuccess ? 'form-success' : 'form-failed';
        },
    },
    methods: {
        validateDate() {
            // Checking if the user input something
            if (this.date==null || this.date.length<1) { this.isSuccess = false; this.message = this.messageResponses.invalidInputs; return; }

            const isDateValid = ValidateDate(this.date);

            if (isDateValid)    { this.isSuccess = true;  this.message = null; this.removeEntry(); }
            else                { this.isSuccess = false; this.message = this.messageResponses.invaliddate; }
        },
        removeEntry() {
            // Pushing the form data to the database

            this.date       = getCorrectDateFromUser(this.date);
            const doesExist = this.doesEntryExist(this.date);

            // Deleting entry and outputting message to user based on response
            if (doesExist)
            {
                let database = this.$store.getters['bbttDatabase/getDatabase'];
                delete database[this.date];
                this.$store.dispatch('bbttDatabase/updateDatabase', database);

                let dates         = this.$store.getters['bbtt/getDates'];
                let lineGraphData = this.$store.getters['bbtt/getWeekOfData'];
                
                const index  = dates.indexOf(this.date);
                dates.splice(index,1);
                
                // let newLineGraphData = lineGraphData.splice(index, 1);
                const lineGraphDatalength = Object.keys(lineGraphData).length;

                for(let i = 0; i < lineGraphDatalength; i++) 
                {
                    const j = Object.keys(lineGraphData)[i];
                    lineGraphData[j].splice(index,1);
                }

                this.$store.dispatch('bbtt/setDates'           , dates);
                this.$store.dispatch('bbtt/updateLineChartData', lineGraphData);
                
                // Detele maye
                // this.$store.dispatch('bbtt/setDataFromLastSevenDays');
                
                this.isSuccess = true;  
                this.message = this.messageResponses.success;

                // Used to trigger the watch property on the pie and line graphs so that 
                //  they will reload when something changes. Watch only works when something
                //  changes, not when something gets deleted. Triggering it by incrementing 
                //  a property then updating the database and then decrementing then updating again
                database = this.$store.getters['bbttDatabase/getDatabase'];
                database[Object.keys(database)[0]].sleep = database[Object.keys(database)[0]].sleep++;
                this.$store.dispatch('bbttDatabase/updateDatabase', database);

                database[Object.keys(database)[0]].sleep = database[Object.keys(database)[0]].sleep--;
                this.$store.dispatch('bbttDatabase/updateDatabase', database);
            }
            else
            {
                this.isSuccess = false; this.message = this.messageResponses.entryNotFound;
            }

        },
        doesEntryExist(date) {
            const database = this.$store.getters['bbttDatabase/getDatabase'];
            if (Object.prototype.hasOwnProperty.call(database, date)) { return true; }
            
            console.log("404 ENTRY NOT FOUND");
            return false;
        }

    },
}
</script>

<style scoped>
.form-success { color: #116466; }
.form-failed  { color: red;     }

.form-card-heading {
    color:#116466; /* !IMPORTANT; */
    text-align: left;
    font-size: 2rem;
    margin-bottom: 0.4rem;
}
.form-card-subheading {
    color:#116466 !IMPORTANT;
    text-align: left;
    font-size: 1rem;
}
.form-border {
    border-left: 2px solid #116466; 
    border-bottom: 2px solid #116466; 
    border-right: 2px solid #116466;
}
.dialog-font-color {
    color:#116466 !IMPORTANT;
}
.center-element {
  display: flex;
  justify-content: center;
}
</style>