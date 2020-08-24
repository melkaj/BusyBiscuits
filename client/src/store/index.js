import Vue from 'vue';
import Vuex from 'vuex';
import Services from '../services/services';
import { extractDatesAndData } from '../utils/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Array of objects that will hold time-spent entries from the past week
    dataFromLastSevenDays: [],

    // Array that will hold the dates. The indexes of the date will match the data from
    // the index in 'datafromlastsevendays
    dates: [],

    // // Object that will hold data from 
    // dataFromToday: {}
  },

  mutations: {
    setDataFromLastSevenDays(state, dataFromLastSevenDays) {
      state.dataFromLastSevenDays = dataFromLastSevenDays;
    },

    setDates(state, dates) {
      state.dates = dates;
    },

    addDataToFront(state, newDataEntry) {
      state.dataFromLastSevenDays.unshift(newDataEntry);
    },

    addDateToFrontOfDates(state, newDate) {
      state.dates.unshift(newDate);
    }
  },

  actions: {
    // Should be mounted somewhere (main App.vue)
    async setDataFromLastSevenDays(context) {
      // Getting the last seven days of time-spent entries
      const response = await Services.getLastSevenDays();
      const responseData = response.data;

      // objects with two elements
      // First will be array of dates and second will be array of objects with data
      const data = extractDatesAndData(responseData);

      // Commiting a mutation to change 'dates' state
      context.commit('setDates', data.dates);

      // Commiting a mutation to change 'dataFromLastSevenDays' state
      context.commit('setDataFromLastSevenDays', data.data);
    },

    // Adding data to front of the data and date states
    addNewTimeSpentEntryToFront(context, payload) {
      context.commit('addDataToFront', payload.data);
      context.commit('addDateToFrontOfDates', payload.date);
    }
  },

  getters: {
    getDataFromLastSevenDays: state => {
      return state.dataFromLastSevenDays;
    },
    getDates: state => {
      return state.dates;
    }
  },

  modules: {
  }
})
