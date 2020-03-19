import * as ACTION_TYPES from '../actions/types'
// const initialState = {
//     list: []
// }

const checkInReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return [...state, action.payload]

    case ACTION_TYPES.CREATE:
      return [...state, action.payload]

    case ACTION_TYPES.UPDATE:
      return [...state, action.payload]

    case ACTION_TYPES.DELETE:
      return [...state, action.payload]

    default:
      return state
  }
}

export default checkInReducer
