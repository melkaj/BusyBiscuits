<template>
    <v-container class="fill-height justify-center" fluid>

        <v-card style="background: #aabffa;" flat>
            <v-card-title class="form-card-heading">
                How much time was spent...
            </v-card-title>
            <v-card-subtitle class="form-card-heading">
                (Enter in the amount in hours, i.e. enter 2 for two hours)
            </v-card-subtitle>

            <v-divider></v-divider>

            <v-form ref="form">
                <v-row align="center" justify="center">

                    
                    <v-col sm=5>
                        <v-text-field
                            v-model="travelTime"
                            label="traveling?"
                            :counter=2
                            type="number"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="exercise"
                            label="exercising?"
                            :counter=2
                            type="number"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="onPhone"
                            label="on the phone?"
                            :counter=2     
                            type="number"                           
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col sm=5>
                        <v-text-field
                            v-model="sleep"
                            label="sleeping?"
                            :counter=2   
                            type="number"                             
                            required
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="onComputer"
                            label="on the computer?"
                            :counter=2    
                            type="number"                            
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="games"
                            label="playing games?"
                            :counter=2    
                            type="number"                            
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8">
                        <v-card-text style="color:red;">
                            {{message}}
                        </v-card-text>
                    </v-col>
                    
                    <v-col cols="12" sm="4">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="isTotalHoursValid">
                            Submit
                        </v-btn>
                    </v-col>

                </v-row>

            </v-form>
        </v-card>

    </v-container>
</template>

<script>
// @ is an alias to /src
import Services from '../../services/services';

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            sleep: 2,
            travelTime: 2,
            exercise: 2,
            onPhone: 2,
            onComputer: 2,
            games: 2,
            somethingelse: 0,
            total: 0,
            message: '',
            messageAboutHours: {
                error: "The total number of hours must be between 0 and 24",
                success: "Form was submitted"
            }
        }
    },
    methods: {
        async isTotalHoursValid() {
            this.total = Number(this.sleep) + Number(this.travelTime) + Number(this.exercise) 
                        + Number(this.onPhone) + Number(this.onComputer) + Number(this.games);

            // If the total number of hours is not between [0, 24]
            if (this.total > 24 || this.total < 0)  { 
                this.message = this.messageAboutHours.error;
                throw new Error("Hours don't make sense");
            }

            // Placing unallocated hours into one category
            this.somethingelse = 24 - this.total; 

            this.sendTimeSpentForm()
            .then( res => {
                this.message = res.data;
                this.$router.push('dashboard')
            })
            .catch( error => {
                this.message = error.response.data;
            });
        },
        async sendTimeSpentForm() {
            // Getting data ready to send
            const form = {
                sleep: this.sleep,
                travel: this.travelTime,
                exercise: this.exercise,
                onPhone: this.onPhone,
                onComputer: this.onComputer,
                games: this.games,
                somethingelse: this.somethingelse
            }

            // Pushing the form data to the database
            return await Services.sendTimeSpentForm(form);

        },
    },
}
</script>

<style scoped>
.form-card-heading {
    background: #749CCC;
    /* background: #116466; */
    color:white !IMPORTANT;
}
</style>