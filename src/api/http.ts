import type { ApiError } from './types';

export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const err: ApiError = new Error(`Request failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.url = url;
    throw err;
  }
  return res.json() as Promise<T>;
}
