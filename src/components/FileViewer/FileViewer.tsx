import { useState } from 'react';
import FileDisplay from '../FileDisplay/FileDisplay';
import filesData from '../../data/filesData';
import { File } from '../../types/fileTypes';
import styles from './FireViewer.module.scss';

const FileViewer = () => {
    const [files, setFiles] = useState<File[]>(filesData);

    const handleFolderClick = (folderFiles: File[]) => {
        setFiles(folderFiles);
    };

    const renderFiles = (filesToRender: File[]) => {
        return filesToRender.map((file, index) => (
            <FileDisplay key={index} {...file} />
        ));
    };

    return (
        <section className={styles.FileViewer}>
            <section className={styles.filesList}>
                {files.map((file, index) => (
                    <FileDisplay
                        key={`${file.name}-${index}`}
                        type={file.type}
                        name={file.name}
                        added={file.added}
                        files={file.files}
                        onFolderClick={() => file.type === 'folder' && handleFolderClick(file.files ?? [])}
                    />
                ))}
            </section>
        </section>
    );
};

export default FileViewer;
