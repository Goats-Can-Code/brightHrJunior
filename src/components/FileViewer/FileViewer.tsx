import React, { useMemo, useState } from 'react';
import FileDisplay from '../FileDisplay/FileDisplay';
import filesData from '../../data/filesData';
import { File } from '../../types/fileTypes';
import styles from './FileViewer.module.scss';

const FileViewer: React.FC = () => {
  const [stack, setStack] = useState<File[][]>([filesData as File[]]);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'name' | 'added' | 'type'>('name');

  const currentFiles = React.useMemo(() => stack[stack.length - 1] ?? [], [stack]);

  const handleFolderClick = (folderFiles: File[] = [], folderName: string) => {
    setStack((prev) => [...prev, folderFiles]);
    setBreadcrumbs((prev) => [...prev, folderName]);
  };

  const handleBreadcrumbHome = () => {
    setStack([filesData as File[]]);
    setBreadcrumbs([]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newDepth = index + 1; // stack[0] is root
    setStack((prev) => prev.slice(0, newDepth + 1));
    setBreadcrumbs((prev) => prev.slice(0, newDepth));
  };

  const byName = (a: File, b: File) =>
    (a.name || '').toString().localeCompare((b.name || '').toString(), undefined, {
      sensitivity: 'base',
    });

  const byAdded = (a: File, b: File) => {
    const da = a.added ? Date.parse(a.added) : 0;
    const db = b.added ? Date.parse(b.added) : 0;
    return da - db;
  };

  const byType = (a: File, b: File) =>
    (a.type || '').toString().localeCompare((b.type || '').toString());

  const comparator = useMemo(() => {
    switch (sortOption) {
      case 'added':
        return byAdded;
      case 'type':
        return byType;
      case 'name':
      default:
        return byName;
    }
  }, [sortOption]);

  const visibleFiles = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = term
      ? currentFiles.filter((f) => f.name?.toLowerCase().includes(term))
      : currentFiles.slice();
    return filtered.sort(comparator);
  }, [currentFiles, searchTerm, comparator]);

  const listRegionId = 'fileviewer-files-region';
  const searchInputId = 'fileviewer-search';
  const sortSelectId = 'fileviewer-sort';

  return (
    <section className={styles.file_viewer}>
      <header>
        <button className={styles.back_button} type="button" onClick={handleBreadcrumbHome}>
          Home
        </button>

        <div className={styles.search_and_sort}>
          <div>
            <label htmlFor={searchInputId}>Search</label>
            <input
              id={searchInputId}
              aria-label="Search files"
              aria-controls={listRegionId}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search files…"
            />
          </div>

          <div>
            <label htmlFor={sortSelectId}>Sort</label>
            <select
              id={sortSelectId}
              aria-label="Sort"
              aria-controls={listRegionId}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'name' | 'added' | 'type')}
            >
              <option value="name">Name</option>
              <option value="added">Added</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>
      </header>

      <nav aria-label="Breadcrumb" style={{ margin: '1rem 0' }}>
        <ol style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '0.5rem' }}>
          <li>
            <button type="button" onClick={handleBreadcrumbHome}>
              Home
            </button>
          </li>
          {breadcrumbs.map((crumb, i) => (
            <li key={`${crumb}-${i}`}>
              <span aria-hidden="true">/</span>{' '}
              <button type="button" onClick={() => handleBreadcrumbClick(i)}>
                {crumb}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <section id={listRegionId} aria-label="Files" data-testid="file-list">
        {visibleFiles.map((file, index) => (
          <FileDisplay
            key={`${file.name}-${index}`}
            type={file.type}
            name={file.name}
            added={file.added}
            files={file.type === 'folder' ? file.files : undefined}
            onFolderClick={() =>
              file.type === 'folder' && handleFolderClick(file.files ?? [], file.name)
            }
          />
        ))}
        {visibleFiles.length === 0 && (
          <p role="status" aria-live="polite">
            No files match your search.
          </p>
        )}
      </section>
    </section>
  );
};

export default FileViewer;
