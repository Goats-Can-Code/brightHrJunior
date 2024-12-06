import { render } from '@testing-library/react';
import FileViewer from './FileViewer';
import filesData from '../../data/filesData';

describe('FileViewer', () => {
    it('should render a list of files and folders', () => {
        const { getByText } = render(<FileViewer />);
        
        // Check if files and folders names are rendered
        filesData.forEach(file => {
            expect(getByText(file.name)).toBeInTheDocument();
        });
    });
});