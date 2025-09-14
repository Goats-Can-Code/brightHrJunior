import { getJson } from './http';
import type { Absence, Conflict } from './types';

const BASE = 'https://front-end-kata.brighthr.workers.dev/api';

export async function fetchAbsences(): Promise<Absence[]> {
  return getJson<Absence[]>(`${BASE}/absences`);
}

export async function fetchConflict(id: string): Promise<Conflict> {
  if (!id) throw new Error('fetchConflict: "id" is required');
  return getJson<Conflict>(`${BASE}/conflict/${encodeURIComponent(id)}`);
}
