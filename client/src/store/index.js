import Vue from 'vue';
import Vuex from 'vuex';
import Services from '../services/services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataFromLastSevenDays: []
  },

  mutations: {
    // addTimeSpentOnDay(state, dataForTheDay) {
    //   state.lastSevenDays.append(dataForTheDay);
    // },
    setDataFromLastSevenDays(state, dataForLastSevenDays) {
      state.dataFromLastSevenDays = dataForLastSevenDays;
      console.log(`from mutation: ${state.dataFromLastSevenDays}`);
    }
  },

  actions: {
    // Should be mounted somewhere (main App.vue)
    async setDataFromLastSevenDays(context) {
      // Getting the last seven days of time-spent entries
      const response = await Services.getLastSevenDays();
      const data = response.data;

      // Commiting a mutationt to change state
      context.commit('setDataFromLastSevenDays', data);
    }
  },

  getters: {
    getDataFromLastSevenDays: state => {
      return state.dataFromLastSevenDays;
    }
  },

  modules: {
  }
})
