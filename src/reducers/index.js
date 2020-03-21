import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'
import encounterReducer from './encounterReducer'

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
  laboratory: encounterReducer
})
