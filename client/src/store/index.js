import Vue from 'vue';
import Vuex from 'vuex';
const bbtt = require('../projects/bbtt/store');
// import Services from '../services/services';
// const { extractDatesAndData, extractLineChartData } = require('../utils/utils');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    root: 24,
    currentPath: null,
    headerFooterColor: "#3C7E80", //"#661D16",//"#300070"
  },

  mutations: {
    incrementRoot(state) {
      state.root++;
    },
    setCurrentPath(state) {
      state.currentPath = this.$router.history.current.name;
    }
  },

  actions: {
    incrementRoot(context) {
      context.commit('incrementRoot');
    },
    setCurrentPath(context) {
      context.commit('setCurrentPath');
    }
  },

  getters: {
    getRoot(state) {
      return state.root;
    },
    getCurrentPath(state) {
      return state.currentPath;
    },
    getHeaderFooterColor(state) {
      return state.headerFooterColor;
    }
  },

  modules: {
    bbtt: bbtt.default
  }
})
