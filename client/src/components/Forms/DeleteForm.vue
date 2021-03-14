<template>
        <v-card class="fill-height justify-center">
            <v-card-title class="form-card-heading">
                Delete an entry:
            </v-card-title>
            <v-card-subtitle class="form-card-subheading">
                (Instructions)<br/>(More Instructions)
            </v-card-subtitle>

            <!-- <v-divider></v-divider> -->

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
                    <v-col cols="8" md="3">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="validateDate">
                            Delete Entry
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row align="center" justify="center">
                    <v-col cols="8" sm="8">
                        <v-card-text :class="setMessageColor">
                            {{message}}
                        </v-card-text>
                    </v-col>
                    
                    <!-- <v-col cols="8" sm="4">
                        <v-btn 
                        text
                        depressed
                        color="primary"
                        style="background: white;"
                        class="mx-5 my-2"
                        @click="isDataModified">
                            Update Entry
                        </v-btn>
                    </v-col> -->
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
            formerEntry: {},
            isSuccess: null,
            message: '',
            messageResponses: {
                success: "Entry was deleted",
                entryNotFound: "Entry was not found. Double check your input",
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
        async validateDate() {
            const isDateValid = ValidateDate(this.date);

            if (isDateValid)    { this.isSuccess = true;  this.message = null; await this.removeEntry(); }
            else                { this.isSuccess = false; this.message = this.messageResponses.invaliddate; }
        },
        async removeEntry() {
            // Pushing the form data to the database
            console.log(`this.date: ${this.date}`);
            const response = await Services.removeEntry(this.date);

            // Outputting message to user based on response
            if      (response.data.affectedRows === 1) { this.isSuccess = true;  this.message = response.data.message; }
            else if (response.data.affectedRows !== 1) { this.isSuccess = false; this.message = this.messageResponses.entryNotFound; }
            else                                       { this.isSuccess = false; this.message = "Something went wrong"; }
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