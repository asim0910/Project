import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFile } from "../../actions/upload";
import ImageViewer from "../DicomViewer/ImageViewer";
import "styled-components/macro";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFile());
  }, []);
  const { files, loading } = useSelector((state) => state.upload);
  const [selectedFile, setSelectedFile] = useState();
  return (
    <>
      <div
        className='row'
        css={`
          display: flex;
          width: 100%;
        `}
      >
        <div
          className='col-lg-6 col-md-6'
          css={`
            width: 50%;
          `}
        >
          <h1 className='large text-primary'>Uploaded Files</h1>
          {loading ? (
            <Spinner />
          ) : files.length ? (
            files.map((item, index) => (
              <ul>
                <li
                  css={`
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                  `}
                >
                  <a
                    key={item.name + index}
                    href={URL.createObjectURL(item.blob)}
                    download={item.name}
                    css={`
                      width: 50%;
                      display: inline-block;
                    `}
                  >
                    {item.name}
                  </a>
                  <button
                    className='btn btn-primary'
                    css={`
                      width: 50%;
                    `}
                    onClick={() => {
                      setSelectedFile(new File([item.blob], item.name));
                    }}
                  >
                    View
                  </button>
                </li>
              </ul>
            ))
          ) : (
            <div>
              No files Uploaded <Link to='/upload'>click here</Link>
            </div>
          )}
        </div>
        <div
          className='col-lg-6 col-md-6'
          css={`
            width: 50%;
          `}
        >
          <ImageViewer files={selectedFile} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
