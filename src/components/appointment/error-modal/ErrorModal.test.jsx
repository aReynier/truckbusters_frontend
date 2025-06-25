import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ErrorModal from './ErrorModal';
import { vi } from 'vitest';
import React from 'react';

describe('ErrorModal', () => {
    it('should display the error modal', () => {
        render(<ErrorModal open={true} onClose={() => {}} />);
        expect(screen.getByText('Erreur de connexion')).toBeDefined();
    });
});