import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Appointment from './Appointment';
import { vi } from 'vitest';
import React from 'react';

global.fetch = vi.fn();

describe('Appointment Component', () => {
    beforeEach(() => {
        global.fetch.mockClear();
    });

    it('should display the loading component', () => {
        render(<Appointment />);
        expect(screen.getByText('Chargement en cours...')).toBeDefined();
    });

    it('should display the appointment component after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.getByText('Prendre rendez-vous')).toBeDefined();
    });

    it('should display error modal when API call fails', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));
    
        render(<Appointment />);
    
        expect(screen.getByText('Chargement en cours...')).toBeDefined();
    
        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
            expect(screen.getByText('Erreur de connexion')).toBeDefined();
        });
    });

    it('should close error modal when close button is clicked', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));
    
        render(<Appointment />);
    
        await waitFor(() => {
            expect(screen.getByTestId('error_modal__close__button')).toBeDefined();
        });
    
        fireEvent.click(screen.getByTestId('error_modal__close__button'));
    
        await waitFor(() => {
            expect(screen.queryByText('Erreur de connexion')).toBeNull();
        });
    });

    it('should handle API error', async () => {
        global.fetch.mockImplementation(() => 
            Promise.reject(new Error('Error fetching data'))
        );
    
        render(<Appointment />);

        expect(screen.getByText('Chargement en cours...')).toBeDefined();
    
        await waitFor(() => {
            expect(screen.getByText('Erreur de connexion')).toBeDefined();
        });
    });

    it('should display the calendar component after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.getByText('Choix de votre heure')).toBeDefined();
    });

    it('should display the form component after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.getByText('Vos coordonnées')).toBeDefined();
    });

    it('should display the modal component after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.getByText('Choix de votre heure')).toBeDefined();
    });

    it('should show calendar after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.getByText('Plusieurs disponibilités ce mois-ci')).toBeDefined();
    });

    it('should not show front date after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.queryByText('Date de départ')).toBeNull()
    });

    it('should not show back date after loading', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ appointments: [] })
        });

        render(<Appointment />);

        await waitFor(() => {
            expect(screen.queryByText('Chargement en cours...')).toBeNull();
        });
        expect(screen.queryByText('Date de retour')).toBeNull();
    });

    it('should handle multiple duplicate moments', () => {
        const mockData = {
            appointments: [
                { moment: '2024-01-15T06:00:00.000Z' },
                { moment: '2024-01-15T06:00:00.000Z' },
                { moment: '2024-01-15T08:00:00.000Z' },
                { moment: '2024-01-15T08:00:00.000Z' },
                { moment: '2024-01-16T10:00:00.000Z' }
            ]
        };

        const momentsArray = mockData.appointments.map(appointment => appointment.moment);
        const momentOccurrences = {};
        
        momentsArray.forEach(moment => {
            if (momentOccurrences[moment]) {
                momentOccurrences[moment]++;
            } else {
                momentOccurrences[moment] = 1;
            }
        });

        const duplicateMoments = Object.keys(momentOccurrences).filter(moment => momentOccurrences[moment] > 1);

        expect(duplicateMoments).toContain('2024-01-15T06:00:00.000Z');
        expect(duplicateMoments).toContain('2024-01-15T08:00:00.000Z');
        expect(duplicateMoments).toHaveLength(2);
    });

    it('should return empty array when no duplicates', () => {
        const mockData = {
            appointments: [
                { moment: '2024-01-15T06:00:00.000Z' },
                { moment: '2024-01-15T08:00:00.000Z' },
                { moment: '2024-01-16T10:00:00.000Z' }
            ]
        };

        const momentsArray = mockData.appointments.map(appointment => appointment.moment);
        const momentOccurrences = {};
        
        momentsArray.forEach(moment => {
            if (momentOccurrences[moment]) {
                momentOccurrences[moment]++;
            } else {
                momentOccurrences[moment] = 1;
            }
        });

        const duplicateMoments = Object.keys(momentOccurrences).filter(moment => momentOccurrences[moment] > 1);

        expect(duplicateMoments).toEqual([]);
    });
});
