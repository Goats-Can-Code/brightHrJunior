export interface File {
    type: string;
    name: string;
    added?: string;
    files?: File[];
    onFolderClick?: () => void;
}