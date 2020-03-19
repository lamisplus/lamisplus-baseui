import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer
})
