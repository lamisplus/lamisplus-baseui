import * as ACTION_TYPES from '../actions/types'

const initialState = {
  list: [],
  status: 0,
  vitalSigns: {},
  vitalSignsList: [],
  allergies: {},
  patient: {},
  previousMedications: []
}

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENTS_FETCH_ALL:
      return { ...state, list: action.payload }

    case ACTION_TYPES.PATIENTS_FETCH_BY_ID:
      return { ...state, patient: action.payload }

    case ACTION_TYPES.PATIENTS_CREATE:
      return { ...state, status: action.payload }

    case ACTION_TYPES.PATIENTS_UPDATE:
      return { ...state, updated: action.payload }

    case ACTION_TYPES.PATIENTS_DELETE:
      return { ...state, list: action.payload }

    case ACTION_TYPES.PATIENT_VITAL_SIGNS:
        return { ...state, vitalSignsList: action.payload }

    case ACTION_TYPES.PATIENT_LATEST_VITAL_SIGNS:
          return { ...state, vitalSigns: action.payload }
  
    case ACTION_TYPES.PATIENT_ALLERGIES:
          return { ...state, allergies: action.payload }

    case ACTION_TYPES.PATIENT_LATEST_MEDICATION_LIST:
      return { ...state, previousMedications: action.payload }    
          
    default:
      return state
  }
}

export default patientReducer


