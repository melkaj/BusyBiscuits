import axios from 'axios';

export default {
    async login(credentials) {
        return await axios.post(process.env.VUE_APP_API_BACKEND + '/login', credentials);
    },

    async register(credentials) {
        return await axios.post(process.env.VUE_APP_API_BACKEND + '/register', credentials);
    },
}

// async function authenticateUser(credentials) {
//     return await axios.post(process.env.VUE_APP_API_BACKEND + '/login', credentials);
// }



// module.exports = {
//     authenticateUser,
// }