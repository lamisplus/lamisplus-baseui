import { url } from "../api";
import { handleResponse } from '../_helpers';
import store from '../store';
import * as ACTION_TYPES from "../actions/types";

const { dispatch } = store;

/**
 * @Actions
 *  User Operations
 * returns API response from server => payload: response || error
 * =================================
 * @method POST => register() -> register a new User

 */

  export function register(firstName, lastName, userName, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, userName, password })
    };

    return fetch(`${url}register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            dispatch({
                type: ACTION_TYPES.REGISTER,
                payload: "Registered"
            });
        });
}