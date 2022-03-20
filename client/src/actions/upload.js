import api from "../utils/api";
import { setAlert } from "./alert";
import {
  DELETE_POST,
  DELETE_SUCCESS,
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
    dispatch(setAlert("File Uploaded!!", "success"));
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
export const deleteFile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST,
    });
    await api.delete(`/upload?id=${id}`);
    dispatch(setAlert("Deleted !!", "success"));
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Delete failed!!", "danger"));
  }
};
export const updateFile = (id, notes) => async (dispatch) => {
  try {
    await api.put(`/upload`, { id, notes });
    dispatch(setAlert("Update Success !!", "success"));
  } catch (err) {
    console.error(err);
    dispatch(setAlert("Update failed!!", "danger"));
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
      console.log(item);
      let file = await urltoFile(item.doc, item.name, item.doc.split(";")[0]);
      console.log(file);
      let blob = new Blob([file], { type: file.type });
      return {
        name: item.name,
        blob: blob,
        type: item.doc.split(";")[0],
        date: item.time,
        id: item._id,
        notes: item.notes,
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
