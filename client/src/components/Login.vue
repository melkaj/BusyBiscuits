<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters class="justify-center">
      <v-col sm="6">
        <div class="white elevation-2">
          <v-toolbar flat dense color="#116466" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-4 pb-4">
            <v-text-field
              v-model="email"
              label="E-mail"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
            ></v-text-field>  
            <v-alert
              v-if="this.error !== null"
              border="left"
              color="red"
              dark
            >
              {{error}}
            </v-alert>
            <v-alert
              v-if="this.loggedIn === true"
              border="left"
              color="green"
              dark
            >
              {{email}} Logged In
            </v-alert>
            <v-btn             
              @click="login" 
              color="#116466" 
              class="white--text elevation-2">
                Login
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Services from '../services/services'

export default {
  // data is the stuff you can bind (2 ways or 1 way) to the template above
  data () {
    return {
      email: 'temp@email.com',
      password: 'Password',
      error: null,
      loggedIn: false
    }
  },
  // Methods are functions the template can access
  methods: {
    async login () {
      try{
        // Will return a promise. If resolve, it will stay in the try
        //    If reject, then it will jump to the catch
        const response = await Services.login({
          email: this.email,
          password: this.password
        });
        console.log(response);
        this.error = null;
        this.loggedIn = true;
      } catch (error) {
        this.error = error.response.data.error;
        this.loggedIn = false;
      }
    }
  }
}
</script>

<!-- scoped makes sure no other vue comonent can see these styles -->
<style scoped>
</style>



