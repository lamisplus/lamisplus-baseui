import axios from 'axios'
import { url as baseUrl } from '../api'
import * as ACTION_TYPES from './types'

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
    .get(`${baseUrl}ecounter/GENERAL_SERVICE/LABTEST_ORDER_FORM/01-01-2020/01-04-2020`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTORDER,
        payload: 'Something went wrong, please try again'
      })
    )
}

export const fetchAllLabTestResult = () => dispatch => {
  axios
    .get(`${baseUrl}ecounter/GENERAL_SERVICE/LABTEST_ORDER_FORM`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTRESULT,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.LABORATORY_TESTRESULT,
        payload: 'Something went wrong, please try again'
      })
    )
}
export const fetchById = id => dispatch => {
  axios
    .get(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_FETCH_BY_ID,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: 'Something went wrong, please try again'
      })
    )
}

export const create = (data) => dispatch => {
  axios
    .post(`${baseUrl}visits/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_CREATE,
        payload: response.data
      })
    
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}visits/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_UPDATE,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

export const Delete = (id) => dispatch => {
  axios
    .delete(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_DELETE,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        types: ACTION_TYPES.CHECKIN_ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

