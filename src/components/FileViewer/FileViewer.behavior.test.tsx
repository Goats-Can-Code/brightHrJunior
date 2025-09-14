import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileViewer from './FileViewer';

// Mock the data module so we have deterministic fixtures for behavior tests
jest.mock('../../data/filesData', () => ([
  { type: 'pdf', name: 'Employee Handbook', added: '2017-01-06' },
  { type: 'pdf', name: 'Public Holiday policy', added: '2016-12-06' },
  {
    type: 'folder',
    name: 'Expenses',
    files: [
      { type: 'pdf', name: 'Expense Policy', added: '2017-02-01' },
      { type: 'doc', name: 'Taxi receipts', added: '2017-02-03' },
    ],
  },
]));

describe('FileViewer behavior', () => {
  it('renders initial items from data', () => {
    render(<FileViewer />);
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
    expect(screen.getByText('Public Holiday policy')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });

  it('filters items by search input', async () => {
    render(<FileViewer />);
    const user = userEvent.setup();
    const textboxes = screen.getAllByRole('textbox');
    const searchInput = textboxes[0]; // assume first textbox is search

    await user.clear(searchInput);
    await user.type(searchInput, 'Employee');
    // Should see Employee Handbook but not Public Holiday policy
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
    expect(screen.queryByText('Public Holiday policy')).not.toBeInTheDocument();
  });

  it('navigates into a folder and shows breadcrumbs', async () => {
    render(<FileViewer />);
    const user = userEvent.setup();

    // Click the folder by its visible name
    await user.click(screen.getByText('Expenses'));

    // Should now see folder children
    expect(screen.getByText('Expense Policy')).toBeInTheDocument();
    expect(screen.getByText('Taxi receipts')).toBeInTheDocument();
    // A breadcrumb containing the folder name should be visible
    // This matches a typical "Expenses" crumb; if implementation differs, adjust test selector.
    expect(screen.getByText(/Expenses/)).toBeInTheDocument();
  });

  it('changes sorting via dropdown (name -> added)', async () => {
    render(<FileViewer />);
    const user = userEvent.setup();

    // Find a combobox (the sort select). Assume there is a single select in the toolbar.
    const combo = screen.getByRole('combobox');
    await user.selectOptions(combo, 'added');

    // After sorting by added date ascending, expect the first item to be Public Holiday policy (2016-12-06)
    const listRegion = screen.getByRole('region', { name: /files/i }) || screen.getByTestId('file-list') || document.body;
    const items = within(listRegion).getAllByText(/Employee Handbook|Public Holiday policy|Expenses/).map(el => el.textContent);
    // Ensure 'Public Holiday policy' appears before 'Employee Handbook'
    const firstIdx = items.indexOf('Public Holiday policy');
    const secondIdx = items.indexOf('Employee Handbook');
    expect(firstIdx).not.toBe(-1);
    expect(secondIdx).not.toBe(-1);
    expect(firstIdx).toBeLessThan(secondIdx);
  });
});