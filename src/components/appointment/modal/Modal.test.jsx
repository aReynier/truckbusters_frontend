import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { vi } from 'vitest';
import React from 'react';

describe('Modal', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            open: true,
            onClose: vi.fn(),
            weekDay: 'lundi',
            monthNumber: '15',
            month: 'janvier',
            year: '2024',
            backDate: '2024-01-15',
            duplicateMoments: [],
            calendarVisibility: vi.fn(),
            formVisibility: vi.fn(),
            doConfigureFrontDate: vi.fn(),
            doConfigureBackDate: vi.fn()
        };
    });

    it('should display the modal when open is true', () => {
        render(<Modal {...mockProps} />);
        expect(screen.getByText('Choix de votre heure')).toBeDefined();
    });

    it('should call onClose when close button is clicked', () => {
        render(<Modal {...mockProps} open={true} />);
        
        const closeButton = screen.getByTestId('modal__window--close');
        fireEvent.click(closeButton);
        
        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('should display time slots when provided', () => {
        const timeSlots = ['8H00', '10H00', '14H00'];
        render(<Modal {...mockProps} open={true} timeSlots={timeSlots} />);
        
        timeSlots.forEach(time => {
            expect(screen.getByText(time)).toBeDefined();
        });
    });
}); 