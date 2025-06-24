import { render, screen } from '@testing-library/react';
import Form from './Form';
import { vi } from 'vitest';


describe('Form Component', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            getFrontDate: 'Le lundi 15 janvier 2024 à 8H00',
            getBackDate: '2024-01-15T06:00:00.000Z',
            displayForm: true,
            calendarToggleVisibility: vi.fn(),
            formToggleVisibility: vi.fn()
        };
    });

    it('should display the form component', () => {
        render(<Form {...mockProps} />);
        expect(screen.getByText('Vos coordonnées')).toBeDefined();
    });

    
});