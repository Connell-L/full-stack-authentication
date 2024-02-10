import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Welcome } from '../../src/layout/Welcome';

const renderWelcome = () => render(<Welcome />);

describe('Hello World', () => {
    it('renders the welcome message', () => {
        renderWelcome();
        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
});
