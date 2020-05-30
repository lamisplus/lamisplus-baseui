import axios from "axios";
import { handleResponse } from './handle-response';
import { authHeader } from './auth-header';

// Add authentication headers to requests
axios.interceptors.request.use(function (config) {
    const authenticationHeader = authHeader();
    if(authenticationHeader) {
        config.headers = authenticationHeader;
    } else {
        console.log('There is not token yet...'); 
    }
    return config;
});

// Check if token is still valid
axios.interceptors.response.use(function (response) {
    handleResponse(response);
    return response;
  }, function (error) {
    return Promise.reject(error);
  })