import { useState } from 'react';
import FileDisplay from '../FileDisplay/FileDisplay';
import filesData from '../../data/filesData';
import { File } from '../../types/fileTypes';
import styles from './FileViewer.module.scss';

const FileViewer = () => {
    const [files, setFiles] = useState<File[]>(filesData);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

    const handleFolderClick = (folderFiles: File[], folderName: string) => {
        setFiles(folderFiles);
        setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, folderName]);
    };

    const handleBreadcrumbClick = () => {
        if (breadcrumbs.length > 0) {
            const newBreadcrumbs = breadcrumbs.slice(0, -1); // Remove the last folder
            setBreadcrumbs(newBreadcrumbs);

            // Go back to the parent folder's files
            let parentFiles = filesData;
            for (const folderName of newBreadcrumbs) {
                const folder = parentFiles.find((file) => file.type === 'folder' && file.name === folderName);
                if (folder && folder.files) {
                    parentFiles = folder.files;
                }
            }
            setFiles(parentFiles);
        }
    }

    const renderFiles = (filesToRender: File[]) => {
        return filesToRender.map((file, index) => (
            <FileDisplay key={index} {...file} />
        ));
    };

    return (
        <section className={styles.FileViewer}>
            <header className={styles.controls}>
                {breadcrumbs.length > 0 && (
                    <button onClick={handleBreadcrumbClick} className={styles.backButton}>
                        Back
                    </button>
                )}
            </header>
            <section className={styles.filesList}>
                {files.map((file, index) => (
                    <FileDisplay
                        key={`${file.name}-${index}`}
                        type={file.type}
                        name={file.name}
                        added={file.added}
                        files={file.files}
                        onFolderClick={() => file.type === 'folder' && handleFolderClick(file.files ?? [], file.name)}
                    />
                ))}
            </section>
        </section>
    );
};

export default FileViewer;
