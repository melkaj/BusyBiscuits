
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
    getTodaysData() {
        return Api().get('/time-spent/today');
    },
    getLastSevenDays() {
        return Api().get('/time-spent/last-seven-days');
    },
    getDataFromDate(date) {
        // Maybe make this a param in the url
        // SOMETHING FROM HERE. ISSUE WITH THE BODY
        console.log(`date from services: ${date}`);
        return Api().post('/time-spent/date', { date: date });
    }
}

