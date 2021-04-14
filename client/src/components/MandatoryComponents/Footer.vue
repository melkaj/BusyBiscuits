<template>
    <!-- THE FOOTER -->
    <v-footer padless :color="color">
        <v-col
            class="text-center"
            cols="12"
            style="color:white;"  
        >
            {{ new Date().getFullYear() }} — <strong>Busy Biscuits Portfolio</strong>
        </v-col>
    </v-footer>
</template>

<script>
export default {
    date() {
        return {
            padless: true,
            color: null,
        }
    },
    created() {
        this.color = this.$store.getters.getHeaderFooterColor;
    }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
/* #116466 */
</style>