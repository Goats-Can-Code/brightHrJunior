import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileDisplay from './FileDisplay';
import type { File } from '../../types/fileTypes';

describe('FileDisplay', () => {
  it('should display the correct file details', () => {
    const fileData: File = {
      type: 'pdf',
      name: 'Employee Handbook',
      added: '2017-01-06',
    };
    render(<FileDisplay {...fileData} />);
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument();
    expect(screen.getByText('Added: 2017-01-06')).toBeInTheDocument();
  });

  it('should render folder details correctly', () => {
    const folderData: File = {
      type: 'folder',
      name: 'Expenses',
      added: '2017-05-02',
      files: [],
    };
    render(<FileDisplay {...folderData} />);
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('Added: 2017-05-02')).toBeInTheDocument();
  });

  it('invokes onFolderClick when folder is clicked', async () => {
    const folderData: File = { type: 'folder', name: 'Expenses', files: [] };
    const onClick = jest.fn();
    render(<FileDisplay {...folderData} onFolderClick={onClick} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /expenses/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
