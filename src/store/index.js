import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import patientReducer from './reducers/patientReducer';
import checkInReducer from './reducers/checkInReducer';
import thunk from 'redux-thunk';

const middleWare = [thunk]; 
const reducer = combineReducers({
     checkinpatient: checkInReducer,
     patients: patientReducer
});


const store = createStore(reducer, compose(applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


export default store ;