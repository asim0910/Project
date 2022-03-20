import { DialogTitle, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import { getFile, updateFile } from "../../actions/upload";
import jspdf from "jspdf";
const prescriptionOptions = ["Tablet", "Injection", "Syrup"];
const prescriptionName = (option) => {
  if (option === "Tablet") return ["Paracetamol", "Amoxycillin"];
  if (option === "Injection") return ["Remdesivir", "Insulin"];
  if (option === "Syrup") return ["Febrexplus", "TusQ-D"];
  return [];
};
const testOptions = ["CBC test", "Urine test"];
const NoteDialog = ({ type, open, onClose, notes, id }) => {
  const [data, setData] = useState();
  const [subData, setSubData] = useState();
  const [description, setDescription] = useState();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (notes) {
      setData(notes.data);
      setDescription(notes.description);
      setSubData(notes.subData);
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
          {type === "Prescription" && (
            <>
              <div className='form-group'>
                <label>Prescription Type</label>
                <select onChange={(e) => setData(e.target.value)} value={data}>
                  <option>--Select--</option>
                  {prescriptionOptions.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label>{data || "Prescription"} name</label>
                <select
                  onChange={(e) => setSubData(e.target.value)}
                  value={subData}
                >
                  <option>--Select--</option>
                  {prescriptionName(data).map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          {type === "Lab Record" && (
            <>
              <div className='form-group'>
                <label>Test Name</label>
                <select onChange={(e) => setData(e.target.value)} value={data}>
                  <option>--Select--</option>
                  {testOptions.map((item) => (
                    <option>{item}</option>
                  ))}
                </select>
              </div>
            </>
          )}
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
              dispatch(updateFile(id, { data, subData, description })).then(
                () => {
                  dispatch(getFile({ filter: type, page: 1 }));
                }
              );
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
              if (data) {
                doc.setTextColor("#17a2b8");
                doc.text("Category :", 15, 35);
                doc.setTextColor("#343a40");
                doc.text(data || "", 60, 35);
              }
              if (subData) {
                doc.setTextColor("#17a2b8");
                doc.text("Sub Category:", 15, 45);
                doc.setTextColor("#343a40");
                doc.text(subData || "", 60, 45);
              }
              doc.setTextColor("#17a2b8");
              doc.text("Description:", 15, 55);

              doc.setTextColor("#343a40");
              doc.text(description || "", 60, 55);
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
