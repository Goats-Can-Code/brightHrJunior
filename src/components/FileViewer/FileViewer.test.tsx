import { render, screen } from '@testing-library/react';
import FileViewer from './FileViewer';
import filesData from '../../data/filesData';

describe('FileViewer', () => {
  it('should render a list of files and folders', () => {
    render(<FileViewer />);
    filesData.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });
  });
});
