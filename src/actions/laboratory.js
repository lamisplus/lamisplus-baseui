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

export const fetchAll = () => dispatch => {
  axios
    .get(`${baseUrl}visits/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_FETCH_ALL,
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
    .post(`${baseUrl}visits/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CHECKIN_CREATE,
        payload: response.data
      })
      onSuccess()
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

