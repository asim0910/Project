import { FETCH_FAILED, FETCH_SUCCESS } from "../actions/types";

const initialState = {
  files: [],
  loading: true,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        files: payload,
        loading: false,
      };
    case FETCH_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default reducer;
