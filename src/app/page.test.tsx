import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Welcome from './page';
import { FormProvider } from '../context/FormContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Welcome Page', () => {
  it('navigates to /form when the button is clicked', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <FormProvider>
        <Welcome />
      </FormProvider>,
    );

    const button = screen.getByRole('button', { name: 'Continuar' });
    await userEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/form');
  });
});
