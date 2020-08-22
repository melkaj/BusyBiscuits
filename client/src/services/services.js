
import Api from '@/services/Api'

export default {
    login (credentials) {
        return Api().post('/login', credentials);
    },
    register (credentials) {
        return Api().post('/register', credentials);
    },
    sendTimeSpentForm (form) {
        return Api().post('/timespent', form);
    },
    getTodaysData () {
        return Api().get('/dashboard');
    }
}







// This will make use the POST request from the axios module,
// then it creates a post request to the 'register' endpoint on 
// our express server and it will use these credentials

// This is how this function would be used
// AuthenticationService.register({
//     email: 'test@email.com',
//     password: '123456'
// })