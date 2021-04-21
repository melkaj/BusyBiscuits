<template>
    <!-- <v-container class="fill-height justify-center" fluid> -->
        <v-row justify="start" align="start" no-gutters>
            <v-card-title class="form-card-heading">
                {{ heading }}
            </v-card-title>
            <v-btn
                style="background:white;"                    
                text
                icon
                depressed
                color="#116466"
                @click.stop="showDialog=true"
            >
                ?
            </v-btn>


            <v-dialog
                v-model="showDialog"
                max-width="300"
            >
                <v-card>
                    <v-card-title>
                    What to do?
                    </v-card-title>

                    <v-card-text>
                        {{ infoText }}
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="#116466"
                            style="background:white;"
                            @click="showDialog=false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    <!-- </v-container> -->
</template>

<script>
export default {
    date() {
        return {
            showDialog: false,
        }
    },
    computed: {
        showDialog: {
            get()      { return this.value; },
            set(value) { this.$emit('input', value); }
        }
    },
    methods: {
        invertDialog() {
            this.showDialog = !this.showDialog;
        }
    },
    props: {
        heading:  { type: String  },
        infoText: { type: String  },
        dialog:   { type: Boolean },
    }
}
</script>

<style scoped>
.form-card-heading {
    color:#116466; /* !IMPORTANT; */
    text-align: left;
    font-size: 2rem;
    margin-bottom: 0.4rem;
}
</style>