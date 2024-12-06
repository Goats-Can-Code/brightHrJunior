import React from 'react';
import { File } from '../../types/fileTypes'; 
import styles from './FileDisplay.module.scss'; 

const FileDisplay: React.FC<File> = ({ type, name, added, files, onFolderClick }) => {
    // Display the file and whether it is a folder or document
    return (
        <div
            className={`${styles.file_display} ${type === 'folder' ? styles.folder : ''}`}
            onClick={onFolderClick} 
        >
            <span className="material-symbols-outlined">
                {type === 'folder' ? 'folder' : 'description'} 
            </span> 
            <span className={styles.file_name}>{name}</span> 
            {added && (
                <span className={styles.file_date}>Added: {added}</span> 
            )}
            {type === 'folder' && files && files.length > 0 && (
                <span className={styles.file_count}>
                    ({files.length} file{files.length > 1 ? 's' : ''})
                </span>
            )}
        </div>
    );
};

export default FileDisplay;