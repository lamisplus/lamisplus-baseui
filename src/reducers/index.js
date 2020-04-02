import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'
import encounterReducer from './encounterReducer'
import formManagerReducer from './formManagerReducer'
import consultationReducer from './consultationReducer'
import medicationReducer from './medicationReducer'

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
  laboratory: encounterReducer,
  formManager: formManagerReducer,
  consultations: consultationReducer,
  medication: medicationReducer
})
