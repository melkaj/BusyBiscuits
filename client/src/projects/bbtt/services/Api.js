
import axios from 'axios'

// This 'Api' module returns an axios object and it points to that baseURL
export default () => {
    return axios.create({
        baseURL: process.env.VUE_APP_BASE_URL
    })
}