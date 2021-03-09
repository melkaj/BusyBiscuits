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
                    <v-col cols="8" md="5">
                        <v-text-field
                            v-model="date"
                            label="YYYY-MM-DD"
                            :counter=10
                            type="string"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model.number="travelTime"
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
                            v-model.number="onPhone"
                            label="on the phone?"
                            :counter=2     
                            type="number"                           
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="8" md="5" align="end">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="getEntryFormBasedOnDate">
                            Find Entry
                        </v-btn>

                        <v-text-field
                            v-model.number="sleep"
                            label="sleeping?"
                            :counter=2   
                            type="number"                             
                            required
                        ></v-text-field>
                        
                        <v-text-field
                            v-model.number="onComputer"
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
                        @click="canPostToday">
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

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            date: null,
            sleep: null,
            travelTime: null,
            exercise: null,
            onPhone: null,
            onComputer: null,
            games: null,
            somethingelse: 0,
            total: 0,
            isSuccess: null,
            message: '',
            messageAboutHours: {
                error: "The total number of hours must be between 0 and 24",
                success: "Form was submitted",
                cannotFind: "Entry was not found. Double check your input",
                invaliddate: "Date entered was invalid",
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
                this.message = this.messageAboutHours.invaliddate;
            }
            else
            {
                this.isSuccess = true;  this.message = null;
                const entryForm = await Services.getEntryBasedOnDate( this.date );
                console.log(`entryFormtype: ${typeof(entryForm.data)}`);
                console.log(`entryFormOBJ: ${Object.keys(entryForm.data)}`);
    
                this.sleep = entryForm.data.sleep;
                this.travelTime = entryForm.data.travel;
                this.exercise = entryForm.data.exercise;
                this.onPhone = entryForm.data.on_phone;
                this.onComputer = entryForm.data.on_computer;
                this.games = entryForm.data.games;
    
                // console.log(`entryForm.sleep: ${entryForm.sleep}`);
            }
        },
        validateDate() {
            if (this.date.length > 10)  return false;

            for (let i = 0; i < 4; i++)
            {
                console.log(this.date[i]);
                console.log(this.date.charCodeAt(i));
                if (this.date.charCodeAt(i) < 48 || this.date.charCodeAt(i) > 57)  return false;
            }
            return true;
        },
        async canPostToday() {  //DELETE THIS WILL NOT BE NEEDED HERE (i think)
            var latest_entry_date = this.$store.getters.getDates[0];
            var todays_date =       new Date().toISOString().slice(0, 10);

            if (latest_entry_date !== todays_date)  await this.isTotalHoursValid(); 
            else                                    this.isSuccess=false;  this.message = "Already posted for today, wait until tomorrow";
        },
        async isTotalHoursValid() {
            this.total = Number(this.sleep) + Number(this.travelTime) + Number(this.exercise) 
                        + Number(this.onPhone) + Number(this.onComputer) + Number(this.games);

            // If the total number of hours is not between [0, 24]
            if (this.total > 24 || this.total < 0)  { 
                this.isSuccess = false;
                this.message =   this.messageAboutHours.error;
                throw new Error("Hours don't make sense");
            }

            // Placing unallocated hours into one category
            this.somethingelse = 24 - this.total; 

            this.sendTimeSpentForm()
            .then( res => {
                this.isSuccess = true;
                this.message =   res.data;
                
                // Redirect back to dashboard
                // this.$router.push('home');
            })
            .catch( error => {
                this.isSuccess = false;
                this.message =   error.response.data;
            });
        },
        async sendTimeSpentForm() {
            // Getting data ready to send
            const form = {
                sleep: this.sleep,
                travel: this.travelTime,
                exercise: this.exercise,
                on_phone: this.onPhone,
                on_computer: this.onComputer,
                games: this.games,
                somethingelse: this.somethingelse
            }
            
            // Adding the form to the store
            var date = new Date().toISOString().slice(0, 10);
            this.$store.dispatch('addNewTimeSpentEntryToFront', { date: date, data: form });

            // Pushing the form data to the database
            return await Services.sendTimeSpentForm(form);
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