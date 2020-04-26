import axios from 'axios'

import {url} from '../api'

import * as FORMTYPES from './types'


export const fetchModules = () => dispatch => {
    axios.get(`${url}modules`)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: FORMTYPES.FORMTYPES_FETCH_ALL,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'Something went wrong'

            })
        })
}

export const fetchService = () => dispatch => {
    axios.get(`${url}programs`)
        .then(response => {
            console.log(response)
            dispatch({
                type: FORMTYPES.FORMTYPES_FETCH_SERVICES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'Something went wrong'

            })
        })
}

export const createForm = (data) => dispatch => {
    console.log(data)
    axios
        .post(`${url}forms/`, data)
        .then(response => {
            dispatch({
                type: FORMTYPES.FORMTYPES_CREATE_FORM,
                payload: response.data
            })
            console.log(response)
        })
        .catch(error => {
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'please try again'
            })
        })
}

export const updateForm = (id, data) => dispatch => {
    axios
        .put(`${url}forms/${id}`, data)
        .then(response => {
            dispatch({
                type: FORMTYPES.FORMTYPES_UPDATE,
                payload: response.data
            })
        })
        .catch(error => {
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'Something went wrong, please try again'
            })
        })
}

export const fetchById = (id, programCode, onSuccess) => dispatch => {
    axios
        .get(`${url}forms/${id}/${programCode}`)
        .then(response => {
            dispatch({
                type: FORMTYPES.FORMTYPES_FETCH_BY_ID,
                payload: response.data
            })
            onSuccess()
        })
        .catch(error => {
            dispatch({
                type:  FORMTYPES.FORMTYPES_ERROR,
                payload: 'Error loading form, something went wrong. Please try again'
            })
        })
}

export const fetchPrograms = () => dispatch => {
    axios.get(`${url}programs`)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: FORMTYPES.FORMTYPES_FETCH_ALL,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'Something went wrong'

            })
        })
}

export const fetchForms = (programCode) => dispatch => {
    axios.get(`${url}programs?programCode=${programCode}`)
        .then(response => {
            console.log(response)
            dispatch({
                type: FORMTYPES.FORMTYPES_FETCH_SERVICES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: FORMTYPES.FORMTYPES_ERROR,
                payload: 'Something went wrong'

            })
        })
}


// export const fetchAll = (programCode) => dispatch => {
//   axios
//     .get(`${url}forms/${programCode}}`)
//     .then(response => {
//       dispatch({
//         type: FORMTYPES.FORMTYPES_FETCH_ALL,
//         payload: response.data
//       })
//     })
//     .catch(error =>
//       dispatch({
//         type: FORMTYPES.FORMTYPES_ERROR,
//         payload: 'Something went wrong, please try again'
//       })
//     )
// }