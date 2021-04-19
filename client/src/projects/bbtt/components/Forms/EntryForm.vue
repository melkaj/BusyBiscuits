<template>
    <!-- <v-container class="fill-height justify-center" fluid> -->

        <v-card class="fill-height justify-center">
            <v-row justify="start" align="start" no-gutters>
                <v-card-title class="form-card-heading">
                    Add an entry
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

            <v-dialog
                v-model="dialog"
                max-width="300"
            >
                <v-card class="dialog-font-color">
                    <v-card-title>
                    What to do?
                    </v-card-title>

                    <v-card-text>
                    Enter in the amount in hours, i.e. enter 2 for two hours. Also make sure you enter whole numbers
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
            <!-- <EntryFormHeader :heading="formHeading" :infoText="formInfoText" v-bind:dialog.sync="dialog"/> -->

            <v-form ref="form">

                <v-row align="center" justify="center" no-gutters>
                    <v-col cols="8" md="3">
                        <v-checkbox
                            v-model="isTodayCheckbox"
                            label="Today"
                        ></v-checkbox>
                    </v-col>

                    <v-col cols="8" md="3">
                        <v-expand-x-transition>
                            <v-text-field
                                v-if='!isTodayCheckbox'
                                v-model="date"
                                label="YYYY-MM-DD"
                                :counter=10
                                type="string"
                                required
                            ></v-text-field>
                        </v-expand-x-transition>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="8" md="3">
                        <v-text-field
                            v-model.number="travel"
                            label="traveling?"
                            :counter=2
                            type="number"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model.number="exercise"
                            label="exercising?"
                            :counter=2
                            type="number"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model.number="on_phone"
                            label="on the phone?"
                            :counter=2     
                            type="number"                           
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="8" md="3">
                        <v-text-field
                            v-model.number="sleep"
                            label="sleeping?"
                            :counter=2   
                            type="number"                             
                            required
                        ></v-text-field>
                        
                        <v-text-field
                            v-model.number="on_computer"
                            label="on the computer?"
                            :counter=2    
                            type="number"                            
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model.number="games"
                            label="playing games?"
                            :counter=2    
                            type="number"                            
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" class="center-element">
                        <v-card-text :class="setMessageColor" class="center-element">
                            {{message}}
                        </v-card-text>
                    </v-col>
                    
                    <v-col cols="12" sm="4" class="center-element">
                        <v-btn 
                        text
                        depressed
                        color="#116466"
                        style="background:white;"
                        class="mx-5 my-2"
                        @click="canPostToday">
                            Submit Entry
                        </v-btn>
                    </v-col>

                </v-row>

            </v-form>
        </v-card>

    <!-- </v-container> -->
</template>

<script>
// @ is an alias to /src
// import EntryFormHeader from './SubFormHeaders/EntryFormHeader.vue';
// import Services from '../../services/services';
const { GetSQLDateFormat, getCorrectDateFromUser, isSmallerThan } = require('../../utils/utils');
// const { populateDatabase } = require('../../utils/databaseutils');

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            column:            null,
            sleep:             null,
            travel:            null,
            exercise:          null,
            on_phone:          null,
            on_computer:       null,
            games:             null,
            somethingelse:     0,
            isTodayCheckbox:   true,
            date:              null,
            total:             0,
            isSuccess:         null,
            dialog:            false,
            message:           '',
            messageResponses: {
                invalidHours:  "The total number of hours must be between 0 and 24",
                success:       "Form was submitted successfully",
                alreadyPosted: "Already posted for today, wait until tomorrow",
                invalidInputs: "Check that all fields have values",
            },
            formHeading: "Add an entry",
            formInfoText: "Enter in the amount in hours, i.e. enter 2 for two hours. Also make sure you enter whole numbers"
        }
    },
    components: {
        // EntryFormHeader,
    },
    computed: {
        setMessageColor() {
            return this.isSuccess ? 'form-success' : 'form-failed';
        },
    },
    methods: {
        async canPostToday() {
            // Checking if the text fields have values
            if (this.sleep==null || this.travel==null || this.exercise==null 
                    || this.on_phone==null || this.on_computer==null || this.games==null
                    || (this.date==null && !this.isTodayCheckbox)) {
                this.isSuccess=false;  
                this.message = this.messageResponses.invalidInputs;
                return;
            }

            if (this.isTodayCheckbox)
            {
                var latestEntryDate = this.$store.getters['bbtt/getDates'][0];
                this.date           = GetSQLDateFormat(new Date().toLocaleString());
            }
            else  this.date = getCorrectDateFromUser(this.date);

            console.log(`latestEntryDate: ${latestEntryDate}`);
            console.log(`this.date: ${this.date}`);
            if (latestEntryDate !== this.date)  await this.isTotalHoursValid(); 
            else                                { this.isSuccess=false;  this.message = this.messageResponses.alreadyPosted; }
        },
        async isTotalHoursValid() {
            this.total = Number(this.sleep) + Number(this.travel) + Number(this.exercise) 
                        + Number(this.on_phone) + Number(this.on_computer) + Number(this.games);

            // If the total number of hours is not between [0, 24]
            if (this.total > 24 || this.total < 0)  { 
                this.isSuccess = false;
                this.message =   this.messageResponses.invalidHours;
                throw new Error("Hours don't make sense");
            }

            // Placing unallocated hours into one category
            this.somethingelse = 24 - this.total; 

            this.sendTimeSpentForm()
            .then( res => {
                this.isSuccess = true;
                this.message   = res;
                // Redirect back to dashboard
                // this.$router.push('home');
            })
            .catch( error => {
                this.isSuccess = false;
                this.message   = error;
            });
        },
        sendTimeSpentForm() {
            return new Promise( (resolve, reject) => {
                try {
                    // Getting data ready to send
                    let form = {};
                    const data = {
                        sleep: this.sleep,
                        travel: this.travel,
                        exercise: this.exercise,
                        on_phone: this.on_phone,
                        on_computer: this.on_computer,
                        games: this.games,
                        somethingelse: this.somethingelse,
                    }
                    form[this.date] = data;
        
                    
                    // Adding the form to the store
                    if (this.isTodayCheckbox)  this.date = GetSQLDateFormat(new Date().toLocaleString());

                    let recentDates = this.$store.getters['bbtt/getDates'];
                    recentDates.sort();

                    if (isSmallerThan(recentDates[0], this.date)) 
                    {
                        this.$store.dispatch('bbtt/addNewTimeSpentEntryToFront', { date: this.date, data: data });
                        this.$store.dispatch('bbtt/setDataFromLastSevenDays'); 
                    }

                    // Pushing the form data to the database
                    this.$store.dispatch('bbttDatabase/insertEntryIntoDatabase', form);
        
                    resolve(this.messageResponses.success);
                } 
                catch(err) {
                    reject("Cannot add new entry");
                }
            });
        },
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
.form-into-button {
    position: relative;
    left: 0;
}
.dialog-font-color {
    color:#116466 !IMPORTANT;
}
.center-element {
  display: flex;
  justify-content: center;
}
</style>