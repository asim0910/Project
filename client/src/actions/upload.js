import api from "../utils/api";
import { setAlert } from "./alert";
import { UPLOAD_FAILED, UPLOAD_SUCCESS } from "./types";

export const uploadFile = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/upload", formData);

    dispatch({
      type: UPLOAD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: UPLOAD_FAILED,
    });
  }
};
export const getFile = (formData) => async (dispatch) => {
  try {
    const res = await api.get("/upload", formData);

    dispatch({
      type: UPLOAD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: UPLOAD_FAILED,
    });
  }
};
