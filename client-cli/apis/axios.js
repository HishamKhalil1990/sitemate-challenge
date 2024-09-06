const axios = require('axios')

const baseURL = 'http://localhost:3001'

const axiosInstance = axios.create({
    baseURL,
});

module.exports = axiosInstance