import React from "react";
//Importing our component-folder that contains the three files
import DwvComponent from "./DwvComponent";

function ImageViewer({ files }) {
  return (
    <div style={{ height: "600px" }}>
      <h4>Image View</h4>

      <DwvComponent files={files} />
    </div>
  );
}

export default ImageViewer;
