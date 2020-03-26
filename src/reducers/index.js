<<<<<<< HEAD
import { combineReducers } from "redux";
import checkInReducer from "./checkInReducer";
import patientReducer from "./patientReducer";
import encounterReducer from "./encounterReducer";
import pharmReducer from "./pharmacyReducer";
=======
import { combineReducers } from 'redux'
import checkInReducer from './checkInReducer'
import patientReducer from './patientReducer'
import encounterReducer from './encounterReducer'
import laboratoryReducer from './laboratoryReducer'
>>>>>>> a95293c9f6e66fefc23bc3c1461e8ea052d46cb9

export default combineReducers({
  patients: patientReducer,
  checkedIn: checkInReducer,
<<<<<<< HEAD
  laboratory: encounterReducer,
  pharmacy: pharmReducer
});
=======
  encounter: encounterReducer,
  laboratory: laboratoryReducer,
})
>>>>>>> a95293c9f6e66fefc23bc3c1461e8ea052d46cb9
