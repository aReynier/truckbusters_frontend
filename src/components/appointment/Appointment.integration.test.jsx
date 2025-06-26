import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Appointment from './Appointment';
import { vi } from 'vitest';

global.fetch = vi.fn();

describe('Appointment Integration Tests', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should complete full user flow: date selection → time slot → form', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({
                appointments: [
                    { moment: '2024-01-15T06:00:00.000Z' },
                    { moment: '2024-01-15T08:00:00.000Z' }
                ]
            })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.getByTestId('calendar')).toBeDefined();
        });

        const dayButton = screen.getByTestId('calendar__date__card__15');
        fireEvent.click(dayButton);

        await waitFor(() => {
            expect(screen.getByTestId('modal')).toBeDefined();
            expect(screen.getByTestId('modal__window__info').textContent).toBe('Choix de votre heure');
        });

        await waitFor(() => {
            expect(screen.getByTestId('modal__window__content__hour__8H00')).toBeDefined();
        });

        const timeSlotButton = screen.getByTestId('modal__window__content__hour__8H00');
        fireEvent.click(timeSlotButton);

        await waitFor(() => {
            expect(screen.getByTestId('form')).toBeDefined();
            expect(screen.getByTestId('form__title').textContent).toBe('Horaire choisie');
        });
    });

    it('should complete form submission flow', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ 
                appointments: [
                    { moment: '2024-01-15T08:00:00.000Z' }
                ] 
            })
        });
    
        render(<Appointment />);
    
        await waitFor(() => {
            expect(screen.getByTestId('calendar')).toBeDefined();
        });
    
        const dayButton = screen.getByTestId('calendar__date__card__15');
        fireEvent.click(dayButton);
    
        await waitFor(() => {
            expect(screen.getByTestId('modal')).toBeDefined();
            expect(screen.getByTestId('modal__window__content__hour__8H00')).toBeDefined();
        });

        const timeButton = screen.getByTestId('modal__window__content__hour__8H00');
        fireEvent.click(timeButton);
    
        await waitFor(() => {
            const companyNameInput = screen.getByLabelText('Nom de l\'entreprise (*)');
            const companyEmailInput = screen.getByLabelText('Email de l\'entreprise (*)');
            const companyPhoneInput = screen.getByLabelText('Téléphone de l\'entreprise (*)');
    
            fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });
            fireEvent.change(companyEmailInput, { target: { value: 'test@company.com' } });
            fireEvent.change(companyPhoneInput, { target: { value: '0123456789' } });
        });

        const submitButton = screen.getByTestId('form__submit');
        fireEvent.click(submitButton);
    
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });
    });

    it('should show modal when clicking on a day', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });
    
        render(<Appointment />);
    
        await waitFor(() => {
            expect(screen.getByTestId('calendar')).toBeDefined();
        });
    
        const dayButton = screen.getByTestId('calendar__date__card__15');
        fireEvent.click(dayButton);
        await waitFor(() => {
            expect(screen.getByText('Choix de votre heure')).toBeDefined();
        });
    });
});