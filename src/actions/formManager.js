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

export const fetchAll = (serviceName) => dispatch => {
  axios
    .get(`${baseUrl}forms/${serviceName}}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FORM_FETCH_ALL,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.FORM_ERROR,
        payload: 'Something went wrong, please try again'
      })
    )
}

export const fetchById = (id, serviceName, onSuccess, onError) => dispatch => {
  axios
    .get(`${baseUrl}forms/${id}/${serviceName}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FORM_FETCH_BY_ID,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.FORM_ERROR,
        payload: 'Error loading form, something went wrong. Please try again'
      })
//onError(error.response)
    })
}

export const create = (data, onSuccess, onError) => dispatch => {
  axios
    .post(`${baseUrl}forms/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FORM_CREATE,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.FORM_ERROR,
        payload: 'Something went wrong, please try again'
      })
      onError(error.response)
    })
}

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}forms/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FORM_UPDATE,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.FORM_ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

export const saveEncounter = (data, onSuccess, onError) => dispatch => {
  axios
    .post(`${baseUrl}encounters/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FORM_SAVE_ENCOUNTER,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.FORM_ERROR,
        payload: 'Something went wrong, please try again'
      })
      onError(error.response)
    })
}
