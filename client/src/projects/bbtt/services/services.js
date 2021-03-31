
import Api from '@/services/Api'

export default {



    /**
     * Login and Register has not yet been implemented 
     * @param {Object} credentials 
     */
    login(credentials) {
        return Api().post('/login', credentials);
    },
    register(credentials) {
        return Api().post('/register', credentials);
    },
    


    /**
     * form is an object that holds all the data needed to add an 
     *      entry in the database. sleep, travel, exercise, etc.
     * @param {Object} form 
     */
    sendTimeSpentForm(form) {
        return Api().post('/forms', form);
    },



    /**
     * Returns the most recent entry from the table that holds
     *      the entries
     */
    getTodaysEntry() {
        return Api().get('/time-spent/today');
    },



    /**
     * Returns the most recent seven entries in the table that holds
     *      the entries
     */
    getLastSevenDays() {
        return Api().get('/time-spent/last-seven-days');
    },



    /**
     * date is an object with the key 'date' which holds a string
     * @param {Object} date 
     */
    getEntryByDate(date) {
        // Maybe make this a param in the url
        return Api().post('/time-spent/date', date);
    },



    /**
     * Dates is an array (should be of length two)
     *      Returns the query of the table trying to get entries
     *      between certain dates
     * @param {Array} dates 
     */
    getEntriesByRange(dates) {
        return Api().post('/time-spent/range', dates);
    },



    /**
     * UpdateEntryForm has two keys, one with the date and the other
     *      with the updated form object
     * @param {Object} updatedEntryForm
     */
    updateEntry(updatedEntryForm) {
        return Api().patch('update-entry/date', updatedEntryForm)
    },



    /**
     * date is an object. { date: date }
     * @param {Object} date
     */
    removeEntry(date) {
        return Api().delete(`remove-entry/${date}`)
    }

}

