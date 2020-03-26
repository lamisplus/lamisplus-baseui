import axios from "axios";
import { url } from "../api";
import * as ACTION_TYPES from "./types";

/**
 * @Actions
 * Encounter CRUD OPERATIONS
 * returns API response from server => payload: response || error
 * =================================
 * @method GET => fetchPrescriptions() -> get all encounters: params {null} || query {dateStart}{dateEnd}
 *
 */

export const fetchPrescriptions = () => dispatch => {
  axios
    .get(`${url}encounters/GENERAL_SERVICE/DRUG_ORDER_FORM`)
    .then(response => {
      console.log(response);
      //   dispatch({
      //     type: ACTION_TYPES.PHARMACY_FETCH_PRESCRIPTIONS,
      //     payload: response.data
      //   });
      // })
      // .catch(error => {
      //   console.log("Pharmacy Error: ", error);
      //   dispatch({
      //     type: ACTION_TYPES.PHARMACY_ERROR,
      //     payload: "Something went wrong"
      //   });
    });
};
