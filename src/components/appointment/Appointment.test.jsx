import { render, screen } from '@testing-library/react';
import Appointment from './Appointment';

describe('Appointment Component', () => {
    it('should display the appointment component', () => {
        render(<Appointment />);
        expect(screen.getByText('Prendre rendez-vous')).toBeDefined();
    });

    it('should display the calendar component', () => {
        render(<Appointment />);
        expect(screen.getByText('Choix de votre heure')).toBeDefined();
    });

    it('should display the form component', () => {
        render(<Appointment />);
        expect(screen.getByText('Vos coordonnées')).toBeDefined();
    });

    it('should display the modal component', () => {
        render(<Appointment />);
        expect(screen.getByText('Choix de votre heure')).toBeDefined();
    }); 
});