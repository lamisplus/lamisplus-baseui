import axios from 'axios'
import { url as baseUrl } from '../api'
import * as ACTION_TYPES from './types'

/**
 * @Actions
 * Encounter CRUD OPERATIONS
 * returns API response from server
 * =================================
 * fetchAll()
 * fetchById()
 * create()
 * update()
 * Delete()
 */

export const fetchAll = (serviceName, formName) => dispatch => {
  axios
    .get(`${baseUrl}encounters/${serviceName}/${formName}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.ENCOUNTER_FETCH_ALL,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ENCOUNTER_ERROR,
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

export const create = (data, onSuccess, onError) => dispatch => {
  axios
    .post(`${baseUrl}encounters/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.ENCOUNTER_CREATE,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.ENCOUNTER_ERROR,
        payload: 'Something went wrong, please try again'
      })
      onError(error.response)
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

export const Delete = (id, onSuccess) => dispatch => {
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

