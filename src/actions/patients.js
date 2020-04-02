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
 * fetchPatientVitals()
 * fetchPatientAllergies()
 * fetchPatientLatestVitalSigns()
 * fetchPatientTestOrders()
 */

export const fetchAll = () => dispatch => {
  console.log(baseUrl);
  axios
    .get(`${baseUrl}patients/`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: ACTION_TYPES.PATIENTS_FETCH_ALL,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      })
    );
};

export const fetchById = id => dispatch => {
  axios
    .get(`${baseUrl}patients/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_FETCH_BY_ID,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      })
    );
};


export const create = data => dispatch => {
  axios
    .post(`${baseUrl}patients/`, data)
    .then(response => {
      console.log(response);
      console.log(response.status);
      dispatch({
        type: ACTION_TYPES.PATIENTS_CREATE,
        payload: response.status
      });
      // console.log(response.data)
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      });
      // console.log(error.response.data.apierror.message);
    });
};

export const update = (id, data) => dispatch => {
  axios
    .put(`${baseUrl}patients/${id}`, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_UPDATE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

export const Delete = (id, onSuccess) => dispatch => {
  axios
    .delete(`${baseUrl}patients/${id}`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENTS_DELETE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        types: ACTION_TYPES.PATIENTS_ERROR,
        payload: "Something went wrong, please try again"
      });
    });
};

// export const fetchPatientAllergies = id => dispatch => {
//   axios
//     .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/CONSULATION_FORM/`)
//     .then(response => {
//       dispatch({
//         type: ACTION_TYPES.PATIENT_ALLERGIES,
//         payload: response.data
//       })
//     })
//     .catch(error =>
//       dispatch({
//         type: ACTION_TYPES.PATIENTS_ERROR,
//         payload: 'Something went wrong, please try again'
//       })
      
//     )
   
// }


export const fetchPatientAllergies = id => dispatch => {
  axios
    .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/CONSULATION_FORM/`)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENT_ALLERGIES,
        payload: response.data
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: 'Something went wrong, please try again'
      })
      
    )
   
}

export const fetchPatientLatestVitalSigns = (id) => dispatch => {
 if(id){
  axios
    .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/VITAL_SIGNS_FORM`, {limit: 1, sortField: "dateEncounter", sortOrder: "desc"} )
    .then(response => {
      dispatch({
        type: ACTION_TYPES.PATIENT_LATEST_VITAL_SIGNS,
        payload: response.data[0]
      })
    })
    .catch(error =>
      dispatch({
        type: ACTION_TYPES.PATIENTS_ERROR,
        payload: 'Something went wrong, please try again'
      })
      
    )
    }  
}


export const fetchPatientVitalSigns = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/VITAL_SIGNS_FORM`)
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_VITAL_SIGNS,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }


 export const fetchPatientTestOrders = (id, onSuccess, onError) => dispatch => {
  if(id){
   axios
     .get(`${baseUrl}patients/${id}/encounter/GENERAL_SERVICE/LAB_ORDER_FORM`)
     .then(response => {
       dispatch({
         type: ACTION_TYPES.PATIENT_LAB_ORDERS,
         payload: response.data
       })
       onSuccess()
     })
     .catch(error => {
       dispatch({
         type: ACTION_TYPES.PATIENTS_ERROR,
         payload: 'Something went wrong, please try again'
       })
       onError()
      }
     )
     }  
 }
//const formateData = data => ({
//   ...data
// })

// import api from './patientApi'
// import { history } from '../../history'

// export const fetchAll = () => dispatch => {
//   api
//     .patient()
//     .fetchAll()
//     .then(response => {
//       dispatch({
//         type: ACTION_TYPES.FETCH_ALL,
//         payload: response.data
//       })
//     })
//     .catch(err => console.log(err))
// }

// export const create = (data, onSuccess, onError) => dispatch => {
//   data = formateData(data)
//   console.log(data)
//   api
//     .patient()
//     .create(data)
//     .then(res => {
//       console.log(res)
//       dispatch({
//         type: ACTION_TYPES.CREATE,
//         payload: res.data
//       })
//       onSuccess()
//       history.push('/')
//     })
//     .catch(error => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data.apierror.message)
//         const errormessage = error.response.data.apierror.message
//         onError(errormessage)
//         // console.log(error.response.apierror.status);
//         // console.log(error.response.apierror.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the
//         // browser and an instance of
//         // http.ClientRequest in node.js
//         console.log(error.request)
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message)
//       }
//       console.log(error)
//     })
// }

// export const update = (id, data, onSuccess) => dispatch => {
//   data = formateData(data)
//   api
//     .patient()
//     .update(id, data)
//     .then(res => {
//       dispatch({
//         type: ACTION_TYPES.UPDATE,
//         payload: { id, ...data }
//       })
//       onSuccess()
//     })
//     .catch(err => console.log(err))
// }

// export const Delete = (id, onSuccess) => dispatch => {
//   api
//     .patient()
//     .delete(id)
//     .then(res => {
//       dispatch({
//         type: ACTION_TYPES.DELETE,
//         payload: id
//       })
//       onSuccess()
//     })
//     .catch(err => console.log(err))
// }
