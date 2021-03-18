<template>        
    <v-card v-if='isDataLoaded' flat class="fill-height">

        <v-tabs
            v-model="tab"
            color="#116466"
            grow
        >      
            <!-- backgroud-color="transparent" -->
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
                <v-card flat class="mb-14">
                    <EntryForm />
                    <UpdateForm />
                    <DeleteForm />
                </v-card>
            </v-tab-item>                            

            <!-- Put component that will allow for more robust graph searching -->
            <v-tab-item>
                <v-card flat class="mb-14">
                    <Detailed />
                </v-card>
            </v-tab-item>                            

        </v-tabs-items>

    </v-card>
</template>

<script>
// @ is an alias to /src
import PieChart   from '../../components/PieGraphs/PieGraph.vue';
import LineGraph  from '../../components/LineGraphs/LineGraph.vue';
import EntryForm  from '../../components/Forms/EntryForm.vue';
import UpdateForm from '../../components/Forms/UpdateForm.vue';
import DeleteForm from '../../components/Forms/DeleteForm.vue';
import Detailed   from '../../components/Detailed/Detailed.vue';

export default {
    name: 'FormTimeSpent',
    data () {
        return {
            items: ["Overview", "Forms", "Detailed"], 
            tab: null,           
            isDataLoaded: false,
            cur_index: 100,
        }
    },
    components: {
        PieChart,
        LineGraph,
        EntryForm,
        UpdateForm,
        DeleteForm,
        Detailed,
    },
    async created() {
        await this.$store.dispatch('setDataFromLastSevenDays'); 
        this.isDataLoaded = true;
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
.tab-colors {
    background-color: #80c0ff;
}
</style>