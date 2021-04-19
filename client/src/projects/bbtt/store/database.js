const { populateDatabase, lastSevenEntries } = require('../utils/databaseutils.js');

const state = () => ({
    database: {}
});

const mutations = {
    initializeDatabase(state, data){
        state.database = data;
    },
    insertEntryIntoDatabase(state, newEntry) {
        let key = Object.keys(newEntry)[0];
        state.database[key] = newEntry[key];
    }
};
 
const actions = {
    initializeDatabase(context) {
        const data = populateDatabase();
        context.commit('initializeDatabase', data);
    },
    insertEntryIntoDatabase(context, payload) {
        context.commit('insertEntryIntoDatabase', payload);
    }
};

const getters = {
    getDatabase(state) {    
        return state.database;
    },
    getLastSevenEntries(state) {
        return lastSevenEntries(state.database);
    },
    // getEntryByDate(state)
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
  