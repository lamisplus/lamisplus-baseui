import axios from "axios";
import { url as baseUrl } from "../api";
import * as ACTION_TYPES from "./types";

//TODO: by Jeph => Complete documentation

/**
 * @Actions
 * CheckIn CRUD OPERATIONS
 * returns API response from server
 * =================================
 * fetchAll()
 * fetchById()
 * create()
 * update()
 * Delete()
 */

export const fetchAllLabTestOrder = () => dispatch => {
  axios
<<<<<<< HEAD
    .get(
      `${baseUrl}ecounter/GENERAL_SERVICE/LABTEST_ORDER_FORM/01-01-2020/01-04-2020`
    )
=======
    .get(`${baseUrl}encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM/`)
>>>>>>> a95293c9f6e66fefc23bc3c1461e8ea052d46cb9
    .then(response => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER,
        payload: response.data
<<<<<<< HEAD
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER,
        payload: "Something went wrong, please try again"
=======
      })
      ///console.log(response)
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ERROR_LABORATORY_TESTORDER,
        payload: 'Something went wrong, please try again'
>>>>>>> a95293c9f6e66fefc23bc3c1461e8ea052d46cb9
      })
    );
};

export const createCollectedSample = (data) => dispatch => {
  axios
    .post(`${baseUrl}ecounter/GENERAL_SERVICE/LABTEST_ORDER_FORM`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CREATE_COLLECT_SAMPLE,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
<<<<<<< HEAD
        type: ACTION_TYPES.LABORATORY_TESTRESULT,
        payload: "Something went wrong, please try again"
=======
        type: ACTION_TYPES.ERROR_CREATE_COLLECT_SAMPLE,
        payload: 'Something went wrong, please try again'
>>>>>>> a95293c9f6e66fefc23bc3c1461e8ea052d46cb9
      })
    );
};
export const fetchById = id => dispatch => {
  axios
    .get(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_FETCH_BY_ID,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: "Something went wrong, please try again"
      })
    );
};

export const create = data => dispatch => {
  axios
    .post(`${baseUrl}visits/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_CREATE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}visits/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_UPDATE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

export const Delete = id => dispatch => {
  axios
    .delete(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_DELETE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        types: ACTION_TYPES.CHECKIN_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};
