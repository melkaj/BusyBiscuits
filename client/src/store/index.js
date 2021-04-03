import Vue from 'vue';
import Vuex from 'vuex';
const bbtt = require('../projects/bbtt/store');
// import Services from '../services/services';
// const { extractDatesAndData, extractLineChartData } = require('../utils/utils');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: 24,
  },

  mutations: {
    incrementRoot(state) {
      state.root++;
    },
  },

  actions: {
    incrementRoot(context) {
      context.commit('incrementRoot');
    }
  },

  getters: {
    getRoot: state => {
      return state.root;
    },
  },

  modules: {
    bbtt: bbtt.default
  }
})
