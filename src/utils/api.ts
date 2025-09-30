import axios from 'axios';

let baseURL = "https://api.gmpentertainment247.com/api/v1"
// process.env.REACT_APP_BASEURL;
const getInitialToken = () => sessionStorage.getItem("token") || "";

export const createApiClient = () => axios.create({
    baseURL,
    timeout: 15000, // can be increased
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
        "Authorization": `Bearer ${getInitialToken()}`
    },
});