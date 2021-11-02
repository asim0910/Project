import "styled-components/macro";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFile, uploadFile } from "../../actions/upload";
const convert = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Upload = () => {
  const [file, setFile] = useState();
  const [type, setType] = useState();
  const [name, setName] = useState();
  const onChange = (e) => {
    const document = e.target.files[0];
    console.log(document);
    setFile(document);
  };

  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    const doc = await convert(file);
    dispatch(uploadFile({ doc, type, name: name + ".dcm" }));
  };

  return (
    <>
      <h1 className='large text-primary'>Upload Records</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Record Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>Type of Record</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option>Select</option>
            <option>X-Ray</option>
            <option>Prescription</option>
          </select>
        </div>
        <div className='form-group'>
          <label
            className='form-label'
            css={`
              display: block;
            `}
          >
            Select File
          </label>
          <input type='file' onChange={onChange} />
        </div>
        <input type='submit' className='btn btn-primary' value='Submit' />
      </form>
      <p className='my-1'>
        You can view your uploads at <Link to='/dashboard'>My Profile</Link>
      </p>
    </>
  );
};

export default Upload;
