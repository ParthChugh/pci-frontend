import React from "react";
import FilePreview from "components/common/filePreview";
import styles from "styles/dropzone.module.scss";
import { Box } from "@mui/material";

const DropZone = (props) => {
  const { onChange, value = [], error } = props
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {

      onChange(files)
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];
    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files

      // const formData = new FormData();
      // files.forEach((file) => formData.append("files", file));
      onChange(files)
      // dispatch action to add selected file or files to fileList
    }
  };
  console.log('props12321', props)
  return (
    <>
      <div
        className={styles.dropzone}
        style={{ borderColor: Object.values(error || {}).length > 0 ? "#EA5151" : "#ccc" }}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        {/* <Image src="/icons/password-unhide.svg" alt="upload" height={50} width={50} /> */}

        <input
          id="fileSelect"
          type="file"
          multiple
          data-max-size="2048"
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <Box className="d-flex" style={{border: "1px rgba(1, 2, 6, 0.4) solid", borderRadius: '8px'}}>
          {
            (value || []).length > 0 ?
              <FilePreview fileData={value || []} />
              :
              <label className={`d-flex align-items-center ${styles.uploadFile} ml-2`} style={{ flex: 1 }}>{props.label}</label>
          }
          <label
            htmlFor="fileSelect"
            className={styles['button-dropzone']}
          >
            {`Upload`}
          </label>
        </Box>

        {/* <FilePreview fileData={value || []} /> */}
      </div>

    </>
  );
};

export default DropZone;