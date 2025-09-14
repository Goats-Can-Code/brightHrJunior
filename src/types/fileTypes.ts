// src/types/fileTypes.ts

export type FileType = 'pdf' | 'doc' | 'mov' | 'folder';

export type BaseItem = {
  name: string;
  added?: string; // ISO date string
};

export type FolderItem = BaseItem & {
  type: 'folder';
  files?: Item[];
  onFolderClick?: () => void; // UI-only
};

export type FileItem = BaseItem & {
  type: Exclude<FileType, 'folder'>;
};

export type Item = FolderItem | FileItem;

/**
 * Back-compat alias:
 * Components/tests import { File } — keep that working by aliasing to Item.
 */
export type File = Item;
