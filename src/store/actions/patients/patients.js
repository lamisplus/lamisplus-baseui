import api from "./patientApi";
import { history } from '../../../history';
export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data
})

export const fetchAll = () => dispatch => {
    api.patient().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess, onError) => dispatch => {
    data = formateData(data)
    console.log(data);
    api.patient().create(data)
        .then(res => {
            console.log(res);
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
            history.push("/");
        })
        .catch(error => {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.apierror.message)
            console.log(error.response.data.apierror)
             //console.log(error.response.data.apierror.message);
             //const errormessage= error.response.data.apierror.message;
             //onError(errormessage);
            // console.log(error.response.apierror.status);
            // console.log(error.response.apierror.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error);
    }
        )
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.patient().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.patient().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}