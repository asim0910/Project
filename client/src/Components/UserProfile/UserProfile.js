import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFile, getFile } from "../../actions/upload";
import ImageViewer from "../DicomViewer/ImageViewer";
import "styled-components/macro";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import NoteDialog from "../NoteDialog/NoteDialog";
const UserProfile = () => {
  const dispatch = useDispatch();

  const { files, loading, total_pages } = useSelector((state) => state.upload);
  const [selectedFile, setSelectedFile] = useState();
  const [filter, setFilter] = useState("X-Ray");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState();
  const [id, setId] = useState(null);
  useEffect(() => {
    dispatch(getFile({ filter, page }));
  }, [dispatch, filter, page]);
  const formatDate = (date) => {
    if (!date) return null;
    const [dt, time] = date.split("T");
    return `${dt}  ${time}`;
  };
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
          <div
            className='form-group'
            css={`
              margin-bottom: 20px;
            `}
          >
            <label>Filter type:</label>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option>X-Ray</option>
              <option>Prescription</option>
              <option>CT Scan</option>
              <option>Lab Record</option>
            </select>
          </div>
          {loading ? (
            <div
              css={`
                text-align: center;
              `}
            >
              We are fetching files
            </div>
          ) : (
            <div></div>
          )}

          {loading ? (
            <Spinner />
          ) : files.length ? (
            files.map((item, index) => (
              <>
                <ul
                  css={`
                    margin-bottom: 24px;
                  `}
                >
                  <li
                    css={`
                      display: flex;
                      justify-content: space-between;
                      margin-bottom: 12px;
                    `}
                  >
                    {" "}
                    <div>
                      {" "}
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
                      <div>{formatDate(item.date)}</div>
                    </div>
                    <div
                      css={`
                        width: 50%;
                      `}
                    >
                      <button
                        className='btn btn-primary'
                        onClick={() => {
                          setSelectedFile(
                            new File([item.blob], item.name, {
                              type: item.type,
                            })
                          );
                        }}
                      >
                        View
                      </button>
                      <button
                        className='btn btn-secondary'
                        onClick={() => {
                          setOpen(true);
                          setId(item.id);
                          setNotes(item.notes);
                        }}
                      >
                        <i class='fa fa-edit'></i>
                      </button>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          dispatch(deleteFile(item.id)).then(() => {
                            dispatch(getFile({ filter, page }));
                          });
                        }}
                      >
                        <i class='fa fa-trash'></i>
                      </button>
                    </div>
                  </li>
                </ul>
              </>
            ))
          ) : (
            <div>
              No files Uploaded <Link to='/upload'>click here</Link>
            </div>
          )}
          {!loading && (
            <>
              {" "}
              <div
                css={`
                  display: inline-flex;
                  justify-content: space-between;
                  width: 100%;
                  align-items: center;
                `}
              >
                <button
                  css={`
                    width: 30%;
                    height: 40px;

                    background: ${page > 0 ? "#17a2b8" : "rgba(0, 0, 0, 0.12)"};
                    color: ${page > 0 ? "#fff" : "rgba(0, 0, 0, 0.26)"};
                  `}
                  disabled={page === 0}
                  className='btn'
                  onClick={() => setPage(page - 1)}
                >
                  <i class='fas fa-arrow-left'></i> Prev
                </button>
                <div>
                  Page {page + 1} of {total_pages}
                </div>
                <button
                  css={`
                    width: 30%;
                    height: 40px;
                    background: ${page < total_pages - 1
                      ? "#17a2b8"
                      : "rgba(0, 0, 0, 0.12)"};
                    color: ${page < total_pages - 1
                      ? "#fff"
                      : "rgba(0, 0, 0, 0.26)"};
                  `}
                  disabled={page === total_pages - 1}
                  className='btn'
                  onClick={() => setPage(page + 1)}
                >
                  Next <i class='fas fa-arrow-right'></i>
                </button>
              </div>
            </>
          )}
          <NoteDialog
            open={open}
            onClose={() => setOpen(false)}
            id={id}
            notes={notes}
            type={filter}
          />
        </div>

        <div
          className='col-lg-6 col-md-6'
          css={`
            width: 50%;
          `}
        >
          <ImageViewer files={selectedFile} />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
