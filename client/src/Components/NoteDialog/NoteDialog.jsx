import { DialogTitle, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import { getFile, updateFile } from "../../actions/upload";
import jspdf from "jspdf";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const tabletName = [
  "Paracetamol",
  "Amoxycillin",
  "Omaze",
  "Sinarest",
  "Hydroxychloroquine",
  "Azithromycin",
];
const injectionName = ["Remdesivir", "Insulin"];
const syrupName = ["Febrexplus", "TusQ-D"];
const testOptions = ["CBC test", "Urine test"];
const NoteDialog = ({ type, open, onClose, notes, id }) => {
  const [tablets, setTablets] = useState([]);
  const [injections, setInjections] = useState([]);
  const [syrups, setSyrups] = useState([]);
  const [test, setTest] = useState([]);

  const [description, setDescription] = useState();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (notes) {
      setTablets(notes.tablets || []);
      setDescription(notes.description);
      setInjections(notes.injections || []);
      setSyrups(notes.syrups || []);
      setTest(notes.test || []);
    }
  }, [notes]);
  const dispatch = useDispatch();
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
        <DialogTitle>Add Note</DialogTitle>
        <button
          onClick={onClose}
          css={`
            position: absolute;
            right: 20px;
            top: 20px;
            background: none;
            border: none;
            cursor: pointer;
          `}
        >
          {" "}
          <Close />{" "}
        </button>
        <Divider />
        <div className='form form-wrapper' id='download'>
          {" "}
          <>
            <div className='form-group'>
              <Autocomplete
                multiple
                options={tabletName}
                onChange={(e, value) => setTablets(value)}
                value={tablets}
                size={"medium"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Tablets '
                    placeholder='Add More?'
                    sx={{
                      ".MuiAutocomplete-input": {
                        border: "none",
                      },
                    }}
                  />
                )}
              />
            </div>
            <div className='form-group'>
              <Autocomplete
                multiple
                options={injectionName}
                onChange={(e, value) => setInjections(value)}
                value={injections}
                size={"medium"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Injections '
                    placeholder='Add More?'
                  />
                )}
              />
            </div>
            <div className='form-group'>
              <Autocomplete
                multiple
                options={syrupName}
                onChange={(e, value) => setSyrups(value)}
                value={syrups}
                size={"medium"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Syrups '
                    placeholder='Add More?'
                  />
                )}
              />
            </div>
            <div className='form-group'>
              <Autocomplete
                multiple
                options={testOptions}
                onChange={(e, value) => setTest(value)}
                value={test}
                size={"medium"}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Lab Tests '
                    placeholder='Add More?'
                  />
                )}
              />
            </div>
          </>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
        </div>
        <div
          css={`
            margin: 0 auto;
          `}
        >
          <button
            className='btn btn-primary my-1'
            css={`
              width: 160px;
            `}
            onClick={() => {
              dispatch(
                updateFile(id, {
                  tablets,
                  syrups,
                  injections,
                  test,
                  description,
                })
              ).then(() => {
                dispatch(getFile({ filter: type, page: 0 }));
              });
            }}
          >
            Update Note
          </button>
          <button
            className='btn btn-success my-1'
            css={`
              width: 160px;
            `}
            onClick={() => {
              const doc = new jspdf();
              doc.setTextColor("#17a2b8");
              doc.setFontSize("24");
              doc.text("Doctors note", 15, 15);
              doc.setFontSize("16");
              doc.setTextColor("#28a745");
              doc.text(
                "*This file was generated for " +
                  user.name +
                  " for his/her " +
                  type,
                15,
                25
              );
              let xdoc = 15,
                ydoc = 35;
              if (tablets.length) {
                doc.setTextColor("#17a2b8");
                doc.text("Tablets", xdoc, ydoc);
                doc.setTextColor("#343a40");
                doc.text(tablets, xdoc, ydoc + 10);
                ydoc += tablets.length * 10;
                ydoc += 10;
              }
              if (injections.length) {
                doc.setTextColor("#17a2b8");
                doc.text("Injections", xdoc, ydoc);
                doc.setTextColor("#343a40");
                doc.text(injections, xdoc, ydoc + 6);
                ydoc += injections.length * 10;
                ydoc += 10;
              }
              if (syrups.length) {
                doc.setTextColor("#17a2b8");
                doc.text("Syrups", xdoc, ydoc);
                doc.setTextColor("#343a40");
                doc.text(syrups, xdoc, ydoc + 6);
                ydoc += syrups.length * 10;
                ydoc += 10;
              }
              if (test.length) {
                doc.setTextColor("#17a2b8");
                doc.text("Lab Test", xdoc, ydoc);
                doc.setTextColor("#343a40");
                doc.text(test, xdoc, ydoc + 6);
                ydoc += test.length * 10;
                ydoc += 10;
              }
              doc.setTextColor("#17a2b8");
              doc.text("Description", xdoc, ydoc);
              doc.setTextColor("#343a40");
              doc.text(description, xdoc, ydoc + 6, { maxWidth: 160 });
              doc.save(id + ".pdf");
            }}
          >
            Download Pdf
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default NoteDialog;
