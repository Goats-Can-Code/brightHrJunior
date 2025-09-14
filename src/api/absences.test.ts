import { fetchAbsences, fetchConflict } from './absences';

describe('api: absences', () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = (global as any).fetch;
  });

  afterEach(() => {
    (global as any).fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('fetchAbsences returns parsed JSON on 200', async () => {
    const mockData = [{ id: 'a1' }, { id: 'a2' }];

    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    await expect(fetchAbsences()).resolves.toEqual(mockData);
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://front-end-kata.brighthr.workers.dev/api/absences',
    );
  });

  it('fetchAbsences throws on non-200', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => ({}),
    });

    await expect(fetchAbsences()).rejects.toThrow(/Request failed: 500/);
  });

  it('fetchConflict requires id', async () => {
    // @ts-expect-error intentional bad input to assert error
    await expect(fetchConflict()).rejects.toThrow(/required/);
  });

  it('fetchConflict returns parsed JSON on 200', async () => {
    const mockData = { hasConflicts: true };

    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    await expect(fetchConflict('abc123')).resolves.toEqual(mockData);
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://front-end-kata.brighthr.workers.dev/api/conflict/abc123',
    );
  });

  it('fetchConflict throws on non-200', async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({}),
    });

    await expect(fetchConflict('missing-id')).rejects.toThrow(/Request failed: 404/);
  });
});
