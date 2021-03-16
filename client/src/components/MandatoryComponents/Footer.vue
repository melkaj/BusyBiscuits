<template>
    <!-- THE FOOTER -->
    <v-footer padless color="#116466">
        <v-col
            class="text-center"
            cols="12"
            style="color:white;"  
        >
            {{ new Date().getFullYear() }} — <strong>Busy Biscuits Online</strong>
        </v-col>
    </v-footer>
</template>

<script>

export default {
    date() {
        return {
            padless: false,
        }
    }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>