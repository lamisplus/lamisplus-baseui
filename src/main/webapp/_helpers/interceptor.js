import axios from "axios";
import { authentication } from '../_services/authentication';
import { authHeader } from './auth-header';
import store from '../store';
import * as ACTION_TYPES from "../actions/types";

const { dispatch } = store;

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
    // handleResponse(response);
    if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        dispatch({
            type: ACTION_TYPES.UNAUTHORISED_ERROR,
            payload: response.status
        });
        authentication.logout();
        window.location.reload(true);
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  })