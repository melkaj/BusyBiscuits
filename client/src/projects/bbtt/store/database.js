const { populateDatabase, lastSevenEntries } = require('../utils/databaseutils.js');

const state = () => ({
    database: {}
});

const mutations = {
    initializeDatabase(state, data){
        state.database = data;
    }
};
 
const actions = {
    initializeDatabase(context) {
        const data = populateDatabase();
        context.commit('initializeDatabase', data);
    }
};

const getters = {
    getDatabase(state) {
        return state.database;
    },
    getLastSevenEntries(state) {
        // console.log(lastSevenEntries(state.database));
        return lastSevenEntries(state.database);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
  