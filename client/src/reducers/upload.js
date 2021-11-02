import {
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from "../actions/types";

const initialState = {
  files: [],
  loading: true,
  uploading: false,
  total_pages: 0,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_START:
      return { ...state, uploading: true };
    case FETCH_START:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        files: payload.files,
        total_pages: payload.total_pages,
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
