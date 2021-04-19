// import Services from '../services/services';
const { extractDatesAndData, extractLineChartData } = require('../utils/utils');

const state = () => ({
  // Test variable
  bbtt: 8,

  // Array of objects that will hold time-spent entries from the past week
  dataFromLastSevenDays: [],

  // Array that will hold the dates. The indexes of the date will match the data from
  // the index in 'datafromlastsevendays
  dates: [],

  // Object that will hold line chart data for all categories 
  // TODO: Find better name
  weekOfData: {},

  // Array of categories
  categories: ['Sleep', 'Travel', 'Exercise', 'On the phone', 'On the computer', 'Playing games', 'Doing something else'],
});

const mutations = {
  incrementbbtt(state) {
    state.bbtt++;
  },
  commitDataFromLastSevenDays(state, dataFromLastSevenDays) {
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
  },

  setLineChartData(state, data) {
    state.weekOfData = data;
  },
}

const actions = {
  incrementbbtt(context) {
    context.commit('incrementbbtt');
  },
  // Function to get the 
  setDataFromLastSevenDays({ commit, getters, rootGetters }) {
    // Getting the last seven days of time-spent entries
    // const response = await Services.getLastSevenDays();
    // const response = getters['bbttDatabase/getLastSevenEntries'];
    const response = rootGetters['bbttDatabase/getLastSevenEntries'];
    // const responseData = response.data;
    console.log(response.dates);
    console.log(response.data);
    console.log("GETTING DATA/....");

    // objects with two elements
    // First will be array of dates and second will be array of objects with data
    const data = extractDatesAndData(response);
    console.log("GETTING DATA2/....");

    // Manipulating the data received from the database to be used for linecharts
    const lineChartData = extractLineChartData(data.data);
    console.log(lineChartData);
    console.log("GETTING DATA3/....");
    
    // Commiting a mutation to change 'weekOfData'
    commit('setLineChartData', lineChartData);
    console.log("GETTING DATA4/....");
    
    // Commiting a mutation to change 'dates' state
    commit('setDates', response.dates);
    console.log(response.dates);

    // Commiting a mutation to change 'dataFromLastSevenDays' state
    commit('commitDataFromLastSevenDays', response.data);
    console.log(response.data);
    console.log(getters.getDataFromLastSevenDays);
    console.log("GETTING DATA5/....");
  },

  // Adding data to front of the data and date states
  addNewTimeSpentEntryToFront(context, payload) {
    context.commit('addDataToFront', payload.data);
    context.commit('addDateToFrontOfDates', payload.date);
  },

  //Getting line chart data for week of each category
  setLineChartData({ commit, getters }) {
    const data = extractLineChartData(getters['bbtt/getDataFromLastSevenDays']);
    console.log("getters['bbtt/getDataFromLastSevenDays']");
    console.log(getters['bbtt/getDataFromLastSevenDays']);

    commit('setLineChartData', data);
  }
}

const getters = {
  getbbtt: state => {
    return state.bbtt;
  },
  getDataFromLastSevenDays: state => {
    return state.dataFromLastSevenDays;
  },
  getDates: state => {
    return state.dates;
  },
  getWeekOfData: state => {
    return state.weekOfData;
  },
  getCategories: state => {
    return state.categories;
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}















// const state = () => ({
//   bbtt: 8,
//   // Array of objects that will hold time-spent entries from the past week
//   dataFromLastSevenDays: [],

//   // Array that will hold the dates. The indexes of the date will match the data from
//   // the index in 'datafromlastsevendays
//   dates: [],

//   // Object that will hold line chart data for all categories 
//   // TODO: Find better name
//   weekOfData: {},

//   // Array of categories
//   categories: ['Sleep', 'Travel', 'Exercise', 'On the phone', 'On the computer', 'Playing games', 'Doing something else'],
// });

// const mutations = {
//   incrementbbtt(state) {
//     state.bbtt++;
//   },
//   commitDataFromLastSevenDays(state, dataFromLastSevenDays) {
//     state.dataFromLastSevenDays = dataFromLastSevenDays;
//   },

//   setDates(state, dates) {
//     state.dates = dates;
//   },

//   addDataToFront(state, newDataEntry) {
//     state.dataFromLastSevenDays.unshift(newDataEntry);
//   },

//   addDateToFrontOfDates(state, newDate) {
//     state.dates.unshift(newDate);
//   },

//   setLineChartData(state, data) {
//     state.weekOfData = data;
//   },
// }

// const actions = {
//   incrementbbtt(context) {
//     context.commit('incrementbbtt');
//   },
//   // Function to get the 
//   async setDataFromLastSevenDays(context) {
//     // Getting the last seven days of time-spent entries
//     const response = await Services.getLastSevenDays();
//     const responseData = response.data;

//     // objects with two elements
//     // First will be array of dates and second will be array of objects with data
//     const data = extractDatesAndData(responseData);

//     // Manipulating the data received from the database to be used for linecharts
//     const lineChartData = extractLineChartData(data.data);
    
//     // Commiting a mutation to change 'weekOfData'
//     context.commit('setLineChartData', lineChartData);
    
//     // Commiting a mutation to change 'dates' state
//     context.commit('setDates', data.dates);

//     // Commiting a mutation to change 'dataFromLastSevenDays' state
//     context.commit('commitDataFromLastSevenDays', data.data);
//   },

//   // Adding data to front of the data and date states
//   addNewTimeSpentEntryToFront(context, payload) {
//     context.commit('addDataToFront', payload.data);
//     context.commit('addDateToFrontOfDates', payload.date);
//   },

//   //Getting line chart data for week of each category
//   setLineChartData(context) {
//     const data = extractLineChartData(context.getters.getDataFromLastSevenDays);

//     context.commit('setLineChartData', data);
//   }
// }

// const getters = {
//   getbbtt: state => {
//     return state.bbtt;
//   },
//   getDataFromLastSevenDays: state => {
//     return state.dataFromLastSevenDays;
//   },
//   getDates: state => {
//     return state.dates;
//   },
//   getWeekOfData: state => {
//     return state.weekOfData;
//   },
//   getCategories: state => {
//     return state.categories;
//   }
// }


// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters,
// }

