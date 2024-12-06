import { render } from '@testing-library/react';
import FileDisplay from './FileDisplay'; 
import { File } from '../../types/fileTypes';

describe('FileDisplay', () => {
    
    it('should display the correct file details', () => {
        const testFile: File = {
            type: 'pdf',
            name: 'Employee Handbook',
            added: '2017-01-06',
        };
        const { getByText } = render(<FileDisplay {...testFile} />);
        expect(getByText('Employee Handbook')).toBeInTheDocument();
        expect(getByText('Added: 2017-01-06')).toBeInTheDocument();
    });

    it('should render folder details correctly', () => {
        const folderData: File = {
            type: 'folder',
            name: 'Expenses',
            added: '2017-05-02',
            files: []
        };
        const { getByText } = render(<FileDisplay {...folderData} />);
        expect(getByText('Expenses')).toBeInTheDocument();
        expect(getByText('Added: 2017-05-02')).toBeInTheDocument();
    });
});
