import { useState } from 'react';
import FileDisplay from '../FileDisplay/FileDisplay';
import filesData from '../../data/filesData';
import { File } from '../../types/fileTypes';
import styles from './FileViewer.module.scss';

const FileViewer = () => {
    const [files, setFiles] = useState<File[]>(filesData);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<'name' | 'added' | 'type'>('name');

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

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFiles = filteredFiles.sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        }
        if (sortOption === 'added') {
            const dateA = a.added ? new Date(a.added).getTime() : 0;
            const dateB = b.added ? new Date(b.added).getTime() : 0;
            return dateA - dateB;
        }
        if (sortOption === 'type') {
            return a.type.localeCompare(b.type);
        }
        return 0;
    });

    return (
        <section className={styles.file_viewer}>
            <header className={styles.controls}>
                {breadcrumbs.length > 0 && (
                    <button onClick={handleBreadcrumbClick} className={styles.back_button}>
                        Back
                    </button>
                )}
                <div className={styles.search_and_sort}>
                    <input
                        type="text"
                        placeholder="Search by filename"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as 'name' | 'added' | 'type')}
                        className={styles.sortSelect}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="added">Sort by Date Added</option>
                        <option value="type">Sort by Type</option>
                    </select>
                </div>
            </header>
            <section className={styles.filesList}>
                {sortedFiles.map((file, index) => (
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
