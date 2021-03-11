<template>
        <v-card class="fill-height justify-center">
            <v-card-title class="form-card-heading">
                Update an entry:
            </v-card-title>
            <v-card-subtitle class="form-card-subheading">
                (Give instructions)<br/>(Give some more instructions)
            </v-card-subtitle>

            <!-- <v-divider></v-divider> -->

            <v-form ref="form">

                <v-row align="center" justify="center">
                    <v-col cols="8" md="4">
                        <v-text-field
                            v-model="date"
                            label="YYYY-MM-DD"
                            :counter=10
                            type="string"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="8" md="4">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="getEntryFormBasedOnDate">
                            Find Entry
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="8" md="4">
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

                    <v-col cols="8" md="4" align="end">
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
                    <v-col cols="8" sm="8">
                        <v-card-text :class="setMessageColor">
                            {{message}}
                        </v-card-text>
                    </v-col>
                    
                    <v-col cols="8" sm="4">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="isDataModified">
                            Update Entry
                        </v-btn>
                    </v-col>
                </v-row>

            </v-form>
        </v-card>
</template>

<script>
// @ is an alias to /src
import Services from '../../services/services';
const { ValidateDate } = require('../../utils/utils');

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            date: null,
            sleep: null,
            travel: null,
            exercise: null,
            on_phone: null,
            on_computer: null,
            games: null,
            somethingelse: 0,
            total: 0,
            formerEntry: {},
            isSuccess: null,
            message: '',
            messageResponses: {
                invalidHours: "The total number of hours must be between 0 and 24",
                success: "Form was submitted",
                entryNotFound: "Entry was not found. Double check your input",
                invaliddate: "Date entered was invalid",
                alreadyPosted: "Already posted for today, wait until tomorrow",
                dataNotModified: "Entry is unchanged or invalid",
            }
        }
    },
    computed: {
        setMessageColor() {
            return this.isSuccess ? 'form-success' : 'form-failed';
        },
    },
    methods: {
        async getEntryFormBasedOnDate() {
            if (!this.validateDate())
            {
                this.isSuccess = false;
                this.message = this.messageResponses.invaliddate;
            }
            else
            {
                this.isSuccess = true;  this.message = null;
                const entryForm = await Services.getEntryBasedOnDate({ date: this.date });
    
                this.sleep =       entryForm.data.sleep;
                this.travel =      entryForm.data.travel;
                this.exercise =    entryForm.data.exercise;
                this.on_phone =    entryForm.data.on_phone;
                this.on_computer = entryForm.data.on_computer;
                this.games =       entryForm.data.games;

                this.formerEntry = entryForm.data;
            }
        },
        validateDate() {
            return ValidateDate(this.date);
        },
        async isDataModified() {    
            // Validating date again so that if the user removes the date, they cannot add sql inject code
            var isDateValid = ValidateDate(this.date);
            var currentInput = [this.sleep, this.travel, this.exercise, this.on_phone, this.on_computer, this.games ];
            var formerEntry =  [this.formerEntry.sleep, this.formerEntry.travel, this.formerEntry.exercise, this.formerEntry.on_phone, this.formerEntry.on_computer, this.formerEntry.games];

            // Checking if the new input is the same as the current existing entry and if the input is null or not
            var isEqual = formerEntry.every( (elem, index) => (elem === currentInput[index] || currentInput[index] === null) );

            if (!isEqual && isDateValid)  { this.isSuccess=true; this.message=null; await this.isTotalHoursValid(); }
            else                          { this.isSuccess=false;  this.message = this.messageResponses.dataNotModified; }
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

            this.updateEntry()
            .then( res => {
                this.isSuccess = true;
                this.message =   res.data;
            })
            .catch( error => {
                this.isSuccess = false;
                this.message =   error.response.data;
            });
        },
        async updateEntry() {
            // Getting data ready to send
            const form = {
                sleep:         this.sleep,
                travel:        this.travel,
                exercise:      this.exercise,
                on_phone:      this.on_phone,
                on_computer:   this.on_computer,
                games:         this.games,
                somethingelse: this.somethingelse
            }
            
            // Adding the form to the store
            var date = this.date; 
            this.$store.dispatch('addNewTimeSpentEntryToFront', { date: date, data: form });

            // Pushing the form data to the database
            return await Services.updateEntry({ date: date, updatedForm: form });
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
</style>