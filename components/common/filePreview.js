import React from "react";
import styles from 'styles/filePreview.module.scss';

const FilePreview = ({ fileData }) => {
  return (
    <div className={`${styles.fileList} ml-2 mt-2`}>
      <div className={styles.fileContainer}>
        {/* loop over the fileData */}
        {fileData.map((f) => {
          return (
            <div key={f.lastModified}>
              <div className={styles.fileList}>
                {/* display the filename and type */}
                <div key={f.name} className={styles.fileName}>
                  {f.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;