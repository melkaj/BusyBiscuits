<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters class="justify-center">
      <v-col sm="6">
        <div class="white elevation-2">
          <v-toolbar flat dense color="#116466" dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-4 pb-2">
            <v-text-field
              v-model="email"
              label="E-mail"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
            ></v-text-field>            
            <div class="error" v-html="error" />
            <v-btn             
              @click="register" color="#116466" class="white--text elevation-2">
              Register
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Services from '../../services/services';

export default {
  // data is the stuff you can bind (2 ways or 1 way) to the template above
  data () {
    return {
      email: 'abc',
      password: '123',
      error: null
    }
  },
  // Methods are functions the template can access
  methods: {
    // async means this function will always return a promise
    async register () {
      try{
        const response = await Services.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>



