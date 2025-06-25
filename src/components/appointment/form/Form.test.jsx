import { render, screen } from '@testing-library/react';
import Form from './Form';
import { expect, vi } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/react';

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

    describe('Field length validation', () => {
        it('should reject company name longer than 100 characters', async () => {
            render(<Form {...mockProps} />);
            
            const companyNameInput = screen.getByLabelText('Nom de l\'entreprise (*)');
            const longName = 'A'.repeat(101);
            
            fireEvent.change(companyNameInput, { target: { value: longName } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 100 caractères')).toBeDefined();
            });
        });

        it('should reject company email longer than 255 characters', async () => {
            render(<Form {...mockProps} />);
            
            const emailInput = screen.getByLabelText('Email de l\'entreprise (*)');
            const longEmail = 'a'.repeat(250) + '@test.com';
            
            fireEvent.change(emailInput, { target: { value: longEmail } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 255 caractères')).toBeDefined();
            });
        });

        it('should reject company phone shorter than 10 characters', async () => {
            render(<Form {...mockProps} />);
            
            const phoneInput = screen.getByLabelText('Téléphone de l\'entreprise (*)');
            const longPhone = '0'.repeat(9);
            
            fireEvent.change(phoneInput, { target: { value: longPhone } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Format de téléphone de l\'entreprise invalide')).toBeDefined();
            });
        });

        it('should reject company phone longer than 20 characters', async () => {
            render(<Form {...mockProps} />);
            
            const phoneInput = screen.getByLabelText('Téléphone de l\'entreprise (*)');
            const longPhone = '0'.repeat(21);
            
            fireEvent.change(phoneInput, { target: { value: longPhone } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 20 caractères')).toBeDefined();
            });
        });

        it('should reject driver lastname longer than 50 characters', async () => {
            render(<Form {...mockProps} />);
            
            const lastnameInput = screen.getByLabelText('Nom du conducteur (*)');
            const longLastname = 'A'.repeat(51);
            
            fireEvent.change(lastnameInput, { target: { value: longLastname } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 50 caractères')).toBeDefined();
            });
        });

        it('should reject driver firstname longer than 50 characters', async () => {
            render(<Form {...mockProps} />);
            
            const firstnameInput = screen.getByLabelText('Prénom du conducteur (*)');
            const longFirstname = 'A'.repeat(51);
            
            fireEvent.change(firstnameInput, { target: { value: longFirstname } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 50 caractères')).toBeDefined();
            });
        });

        it('should reject truck brand longer than 50 characters', async () => {
            render(<Form {...mockProps} />);
            
            const brandInput = screen.getByLabelText('Marque du camion (*)');
            const longBrand = 'A'.repeat(51);
            
            fireEvent.change(brandInput, { target: { value: longBrand } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 50 caractères')).toBeDefined();
            });
        });

        it('should reject truck model longer than 50 characters', async () => {
            render(<Form {...mockProps} />);
            
            const modelInput = screen.getByLabelText('Modèle du camion (*)');
            const longModel = 'A'.repeat(51);
            
            fireEvent.change(modelInput, { target: { value: longModel } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 50 caractères')).toBeDefined();
            });
        });

        it('should reject license plate longer than 15 characters', async () => {
            render(<Form {...mockProps} />);
            
            const licenseInput = screen.getByLabelText('Plaque d\'immatriculation du camion (*)');
            const longLicense = 'AB123CD456EF7891';
            
            fireEvent.change(licenseInput, { target: { value: longLicense } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Ce champ ne peut pas dépasser 15 caractères')).toBeDefined();
            });
        });
    });

    describe('Regex validation', () => {
        it('should reject invalid email format', async () => {
            render(<Form {...mockProps} />);
            
            const emailInput = screen.getByLabelText('Email de l\'entreprise (*)');
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
            fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
            await waitFor(() => {
                expect(screen.getByText('Veuillez entrer une adresse email valide')).toBeDefined();
            });
        });

        // it('should reject invalid phone format', async () => {
        //     render(<Form {...mockProps} />);
            
        //     const phoneInput = screen.getByLabelText('Téléphone de l\'entreprise (*)');
        //     fireEvent.change(phoneInput, { target: { value: 'abc123' } });
        //     fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
        //     await waitFor(() => {
        //        expect(screen.getByText('Format de téléphone de l\'entreprise invalide')).toBeDefined();
        //     });
        // });

        // it('should reject invalid license plate format', async () => {
        //     render(<Form {...mockProps} />);
            
        //     const licenseInput = screen.getByLabelText('Plaque d\'immatriculation du camion (*)');
        //     fireEvent.change(licenseInput, { target: { value: 'ab@123#cd' } }); 
        //     fireEvent.submit(screen.getByRole('button', { name: 'Confirmer' }));
            
        //     await waitFor(() => {
        //         expect(screen.getByText('Format de la plaque d\'immatriculation du camion invalide')).toBeDefined();
        //     });
        // });
    });
});