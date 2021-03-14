<template>
    <v-container class="fill-height justify-center" fluid>
        <v-row align="center" justify="center">
            <v-col cols="8">
                <v-date-picker
                    v-model="dates"
                    range
                ></v-date-picker>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col cols="8">
                <PieChart graphName="Pie-Chart" title=""/>
            </v-col>
        </v-row>        
    </v-container>
</template>

<script>
import PieChartGeneral from '../PieGraphs/PieChartGeneral.vue';

export default {
    data() {
        return {
            dates: [],
        }
    },
    components: {
        PieChartGeneral,
    },
    methods: {

    },
    mounted() {
        console.log("Hello from detailed...");
    }
}
</script>

<style scoped>

</style>