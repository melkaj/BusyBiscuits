<template>        
    <v-card v-if='isDataLoaded' flat class="fill-height">

        <!-- <v-divider></v-divider> -->

        <v-tabs
            v-model="tab"
            backgroud-color="transparent"
            grow
        >      
            <v-tab
                v-for="item in items"
                :key="item"
                class="tab-font"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <!-- Charts and data -->
            <v-tab-item>
                <v-card flat>
                    <PieChart graphName="Pie-Chart" title="Wheres the time going?"/>
                    <LineGraph graphName="Line-Graph" title="See the trends"/>
                </v-card>
            </v-tab-item>                            

            <!-- Forms to perform CRUD operations on the data -->
            <v-tab-item>
                <v-card flat>
                    <EntryForm />
                </v-card>
            </v-tab-item>                            

        </v-tabs-items>

    </v-card>
</template>

<script>
// @ is an alias to /src
import PieChart from '../../components/PieGraphs/PieGraph.vue';
import LineGraph from '../../components/LineGraphs/LineGraph.vue';
import EntryForm from '../../components/Forms/EntryForm.vue';

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            items: ["Pie Chart", "FORMS"], 
            tab: null,           
            isDataLoaded: false,
            cur_index: 100,
        }
    },
    components: {
        PieChart,
        LineGraph,
        EntryForm,
    },
    async created() {
        await this.$store.dispatch('setDataFromLastSevenDays'); 
        this.isDataLoaded = true;
    }, 
    mounted() {
        // call function
    },
}
</script>

<style scoped>
.form-card-heading {
    background: #116466;
    color:white !IMPORTANT;
}
.form-border {
    border-left: 2px solid #116466; 
    border-bottom: 2px solid #116466; 
    border-right: 2px solid #116466;
}
.tab-font {
    font-family: "Montserrat-SemiBold", 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: lighter;
}
.test-back{
    height: 100%;
}
</style>