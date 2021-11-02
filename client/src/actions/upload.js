import api from "../utils/api";
import { setAlert } from "./alert";
import {
  FETCH_FAILED,
  FETCH_START,
  FETCH_SUCCESS,
  UPLOAD_FAILED,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from "./types";

export const uploadFile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_START });
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
    dispatch({ type: FETCH_START });
    const { filter, page } = formData;
    const res = await api.get(`/upload?filter=${filter}&page=${page}`);
    function urltoFile(url, filename, mimeType) {
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    }
    const dataObjectArrays = res.data.data.map(async (item) => {
      let file = await urltoFile(item.doc, item.name, item.doc.split(";")[0]);
      console.log(file);
      let blob = new Blob([file], { type: file.type });
      return {
        name: item.name,
        blob: blob,
        type: item.doc.split(";")[0],
      };
    });
    const data = await Promise.all(dataObjectArrays);
    dispatch({
      type: FETCH_SUCCESS,
      payload: { files: data, total_pages: res.data.total_count },
    });
  } catch (err) {
    dispatch({
      type: FETCH_FAILED,
    });
    console.error(err);
  }
};
