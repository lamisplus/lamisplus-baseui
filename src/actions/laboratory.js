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
    .get(`${baseUrl}encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER,
        payload: response.data
      })
      ///console.log(response)
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ERROR_LABORATORY_TESTORDER,
        payload: 'Something went wrong, please try again'
      })
    );
};
export const fetchAllLabTestOrderOfPatient = () => dispatch => {
  axios
    .get(`${baseUrl}encounters/GENERAL_SERVICE/LABTEST_ORDER_FORM/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER_FOR_PATIENT,
        payload: response.data
      })
      ///console.log(response)
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ERROR_LABORATORY_TESTORDER_FOR_PATIENT,
        payload: 'Something went wrong, please try again'
      })
    );
};
export const createCollectedSample = (data) => dispatch => {
  console.log(data)
  axios
    .put(`${baseUrl}ecounter/GENERAL_SERVICE/LABTEST_ORDER_FORM`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CREATE_COLLECT_SAMPLE,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ERROR_CREATE_COLLECT_SAMPLE,
        payload: 'Something went wrong, please try again'
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

export const fetchAllTestGroup = (onSuccess, onError) => dispatch => {
  axios
    .get(`${baseUrl}lab-test-groups/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_TEST_GROUP,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_ERROR,
        payload: 'Something went wrong, please try again'
      })
      onError(error.response)
    })
}

export const fetchAllTestsByTestGroup = (id, onSuccess, onError) => dispatch => {
  axios
    .get(`${baseUrl}lab-test-groups/${id}/lab-tests`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_TESTS_BY_TEST_GROUP,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_ERROR,
        payload: 'Something went wrong, please try again'
      })
      onError(error.response)
    })
}

