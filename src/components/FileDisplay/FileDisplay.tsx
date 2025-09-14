import React from 'react';
import { Item, FolderItem } from '../../types/fileTypes';
import styles from './FileDisplay.module.scss';

type FileDisplayProps = Item & {
  onFolderClick?: () => void;
};

const FileDisplay: React.FC<FileDisplayProps> = (props) => {
  const { type, name, added, onFolderClick } = props;
  const files = type === 'folder' ? (props as FolderItem).files : undefined;

  return (
    <div
      className={`${styles.file_display} ${type === 'folder' ? styles.folder : ''}`}
      onClick={onFolderClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onFolderClick?.();
        }
      }}
    >
      <span className="material-symbols-outlined">
        {type === 'folder' ? 'folder' : 'description'}
      </span>
      <span className={styles.file_name}>{name}</span>
      {added && <span className={styles.file_date}>Added: {added}</span>}
      {type === 'folder' && files && files.length > 0 && (
        <span className={styles.file_count}>
          ({files.length} file{files.length > 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};

export default FileDisplay;
