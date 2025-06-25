import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
        it('should display the address and phone number', () => {
            render(<Header />);
            expect(screen.getByText('FDNY Ladder 8, New-York')).toBeDefined();
            expect(screen.getByText('03 33 33 33 33')).toBeDefined();
        });

        it('should display the logo', () => {
            render(<Header />);
            expect(screen.getByAltText('tuckbuster logo')).toBeDefined();
        });
    });