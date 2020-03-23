import * as ACTION_TYPES from "../actions/types";

const pharmReducer = (state = { formData: [] }, action) => {
  switch (action.type) {
    case ACTION_TYPES.PHARMACY_FETCH_PRESCRIPTIONS:
      return { ...state, formData: [...action.payload] };
    default:
      return state;
  }
};

export default pharmReducer;
