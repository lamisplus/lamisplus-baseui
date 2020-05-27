import axios from "axios";

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('currentUser');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log('There is not token yet...');
    }
    return config;
});