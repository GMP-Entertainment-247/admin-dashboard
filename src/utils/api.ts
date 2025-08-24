import axios from 'axios';

let baseURL = "https://api.gmpentertainment247.com/api/v1"
// "https://v2.jokeapi.dev"
// process.env.REACT_APP_BASEURL;

export const createApiClient = () => axios.create({
    baseURL,
    timeout: 15000, // can be increased
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
    },
});