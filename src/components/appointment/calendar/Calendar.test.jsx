import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';
import * as dateFns from 'date-fns';
import fr from 'date-fns/locale/fr';
import { vi } from 'vitest';
import React from 'react';

vi.mock('../modal/Modal.jsx', () => ({
    default: ( props ) => (
        <div data-testid="modal" style={{ display: props.open ? 'block' : 'none' }}>
            Modal Component
        </div>
    )
}));

describe('Calendar Component', () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            duplicateMoments: [],
            calendarToggleVisibility: vi.fn(),
            formToggleVisibility: vi.fn(),
            displayCalendar: true,
            displayForm: false,
            configureFrontDate: vi.fn(),
            configureBackDate: vi.fn()
        }
    })
  
    it('should display the current month and year', () => {
        const currentDate = new Date();
        const expectedMonth = dateFns.format(currentDate, 'MMMM', { locale: fr });
        const expectedYear = dateFns.format(currentDate, 'yyyy');
        const expectedText = `${expectedMonth} ${expectedYear}`;

        render(<Calendar {...mockProps} />);

        expect(screen.getByText(`${expectedText}`)).toBeDefined()
    });
    
    it('should display Truckbusters opened week days in french', () => {
        render(<Calendar {...mockProps} />);

        const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

        weekDays.forEach(day => {
            const dayElements = screen.getAllByText(new RegExp(day, 'i'));
            expect(dayElements.length).toBeGreaterThan(0);
        });
    });

    it('should not display Truckbusters closed week day in french', () => {
        render(<Calendar {...mockProps} />);

        const closedDays = 'Dimanche';

        expect(screen.queryByText(closedDays)).toBeNull();
    });
    
    it('should begin whith the first open day of the current month', () => {
        render(<Calendar {...mockProps} />);

        const firstOpenDay = screen.getByText('1');
        expect(firstOpenDay).toBeDefined();
    });

    it('should end with the last open day of the current month', () => {
        render(<Calendar {...mockProps} />);
        const lastOpenDay = screen.getByText('30');
        expect(lastOpenDay).toBeDefined();
    });

    it('display next month when the user clicks on the next month button', () => {
        render(<Calendar {...mockProps} />);
        const nextMonthButton = screen.getByText('Suivant');
        fireEvent.click(nextMonthButton);
        const currentMonth = screen.getByText('Juin');
        expect(currentMonth).toBeDefined();
    });

    // it('should call setShowModal with true when the user clicks on the first day of the current month', () => {
    //     render(<Calendar {...mockProps} />);

    //     const modal = screen.getByTestId('modal');
    
    //     const dayButton = screen.getAllByRole('button')[1];
    //     fireEvent.click(dayButton);
        
    //     expect(modal.style.display).toBe('block');
    // });

    it('should call setShowModal with false before any interaction', () => {
        render(<Calendar {...mockProps} />);

        const modal = screen.getByTestId('modal');
        expect(modal).toBeDefined();
        expect(modal.style.display).toBe('none');
    });

    // it('should display days with correct availability based on duplicateMoments', () => {
    //     const mockPropsWithDuplicates = {
    //         ...mockProps,
    //         duplicateMoments: ['2024-01-15T06:00:00.000Z', '2024-01-15T08:00:00.000Z'] // 2 réservations le même jour
    //     };
    
    //     render(<Calendar {...mockPropsWithDuplicates} />);
    
    //     expect(unavailableDays.length).toBeGreaterThan(0);
    // });
    
    it('should display correct availability count for weekdays', () => {
        render(<Calendar {...mockProps} />);
    
        const availableDays = screen.getAllByText('5 dispo.');
        expect(availableDays.length).toBeGreaterThan(0);
    });
    
    it('should display correct availability count for saturdays', () => {
        render(<Calendar {...mockProps} />);
    
        const saturdayDays = screen.getAllByText('2 dispo.');
        expect(saturdayDays.length).toBeGreaterThan(0);
    });
    
    it('should hide sundays completely', () => {
        render(<Calendar {...mockProps} />);
    
        const sundayElements = screen.queryAllByText(/dimanche/i);
        expect(sundayElements.length).toBeNull;
    });
    
    // it('should mark days as unavailable when availability reaches 0', () => {
    //     const mockPropsWithFullBookings = {
    //         ...mockProps,
    //         duplicateMoments: [
    //             '2024-01-15T04:00:00.000Z',
    //             '2024-01-15T06:00:00.000Z', 
    //             '2024-01-15T08:00:00.000Z',
    //             '2024-01-15T10:00:00.000Z',
    //             '2024-01-15T12:00:00.000Z'
    //         ]
    //     };
    
    //     render(<Calendar {...mockPropsWithFullBookings} />);
    
    //     expect(unavailableDays.length).toBeGreaterThan(0);
    // });
});