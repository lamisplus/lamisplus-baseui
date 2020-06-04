import axios from "axios";
import { url as baseUrl } from "../api";
import * as ACTION_TYPES from "./types";

/**
 * @Actions
 *  User Operations
 * returns API response from server => payload: response || error
 * =================================
 * @method POST => register() -> register a new User

 */
export const register = (firstName, lastName, userName, password) => dispatch => {
    const data = { firstName, lastName, userName, password }
    axios
      .post(`${baseUrl}register`, data)
      .then(response => {
        dispatch({
            type: ACTION_TYPES.REGISTER_SUCCESS,
            payload: "Registered"
        });
      })
      .catch(error => {
        dispatch({
            type: ACTION_TYPES.REGISTER_FAILURE,
            payload: "Erro registering"
        });
      });
  };