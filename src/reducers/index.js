import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'
import encounterReducer from './encounterReducer'
import formManagerReducer from './formManagerReducer'
import pharmReducer from "./pharmacyReducer";
import laboratoryReducer from "./laboratoryReducer"

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
  laboratory: laboratoryReducer,
  formManager: formManagerReducer,
  pharmacy: pharmReducer,
  encounter: encounterReducer,
});
