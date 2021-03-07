
import Api from '@/services/Api'

export default {
    login(credentials) {
        return Api().post('/login', credentials);
    },
    register(credentials) {
        return Api().post('/register', credentials);
    },
    sendTimeSpentForm(form) {
        return Api().post('/forms', form);
    },
    getTodaysEntry() {
        return Api().get('/time-spent/today');
    },
    getLastSevenDays() {
        return Api().get('/time-spent/last-seven-days');
    },
    getEntryBasedOnDate(date) {
        // Maybe make this a param in the url
        return Api().post('/time-spent/date', { date: date });
    }
}

