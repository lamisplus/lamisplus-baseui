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
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.ERROR,
        payload: 'Something went wrong, please try again'
      })
    )
}

export const fetchById = id => dispatch => {
  axios
    .get(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FETCH_BY_ID,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.GET_ERROR,
        payload: 'Something went wrong, please try again'
      })
    )
}

export const create = (data, onSuccess, onError) => dispatch => {
  axios
    .post(`${baseUrl}visits/`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: response.data
      })
      onSuccess()
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}visits/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

export const Delete = (id, onSuccess) => dispatch => {
  axios
    .delete(`${baseUrl}visits/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: response.data
      })
    })
    .catch(error => {
      dispatch({
        types: ACTION_TYPES.ERROR,
        payload: 'Something went wrong, please try again'
      })
    })
}

// const formateData = data => ({
//     ...data
// })

//===============================================
//import api from './checkInApi'
//import * as ACTION_TYPES from '../types'
//===============================================
//     if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         // console.log(error.response.data.apierror.message);
//         const errorCode = error.response.data.apierror
//             ? error.response.data.apierror.status
//             : error.response.data.status
//         const errormessage = error.response.data.apierror
//             ? error.response.data.apierror.message
//             : error.response.data.message
//         onError(errormessage)
//         console.log(errorCode)
//         if (errorCode >= 500) {
//             onError('Something went wrong, please contact adminstration!')
//         }

//         // console.log(error.response.apierror.status);
//         // console.log(error.response.apierror.headers);
//     } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the
//         // browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request)
//     } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message)
//     }
//     console.log(error)
// })
