import '@testing-library/jest-dom';
import { FormCard } from '../../src/components/formCard';
import React from 'react';
import { render, screen } from '@testing-library/react';

const mockProps = {
    title: 'Test Title',
    children: <div>Test Children</div>
};

const renderFormCard = () => {
    return render(<FormCard props={mockProps} />);
};

describe('FormCard', () => {
    beforeAll(() => {
        renderFormCard();
    });
    it('should render a form', () => {
        render(<FormCard />);
        expect(screen.getByRole('form')).toBeInTheDocument();
    });
});
