export interface Absence {
  id: string;
  [k: string]: unknown;
}
export interface Conflict {
  hasConflicts: boolean;
  [k: string]: unknown;
}
export interface ApiError extends Error {
  status?: number;
  url?: string;
}
