import { combineReducers } from "redux";
import checkInReducer from "./checkInReducer";
import patientReducer from "./patientReducer";
import encounterReducer from "./encounterReducer";
import pharmReducer from "./pharmacyReducer";
import laboratoryReducer from "./laboratoryReducer"

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
  encounter: encounterReducer,
  laboratory: laboratoryReducer,
  pharmacy: pharmReducer
});
 