import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import patientReducer from './reducers/patientReducer';
import thunk from 'redux-thunk';

const middleWare = [thunk]; 
const reducer = combineReducers({
    // users: userReducer,
    patients: patientReducer
});


const store = createStore(reducer, compose(applyMiddleware(...middleWare)));


export default store ;