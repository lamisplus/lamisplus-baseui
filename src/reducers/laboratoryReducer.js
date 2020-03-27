import * as ACTION_TYPES from '../actions/types'

const initialState = {
  list: [],
  status: 0,
  patient: {}
}

const laboratoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LABORATORY_TESTORDER:
      return { ...state, list: action.payload }

    case ACTION_TYPES.PATIENTS_FETCH_BY_ID:
      return { ...state, patient: action.payload }

    case ACTION_TYPES.PATIENTS_CREATE:

      return { ...state, status: action.payload }


    case ACTION_TYPES.PATIENTS_UPDATE:
      return { ...state, updated: action.payload }

    case ACTION_TYPES.PATIENTS_DELETE:
      return { ...state, list: action.payload }

    default:
      return state
  }
}

export default laboratoryReducer

