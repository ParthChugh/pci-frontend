import React from "react";
import styles from 'styles/filePreview.module.scss';

const FilePreview = ({ fileData }) => {
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {/* loop over the fileData */}
        {fileData.map((f) => {
          return (
            <ol key={f.lastModified}>
              <li className={styles.fileList}>
                {/* display the filename and type */}
                <div key={f.name} className={styles.fileName}>
                  {f.name}
                </div>
              </li>
            </ol>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;