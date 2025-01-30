import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/app/context/FormContext';
import Form from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

jest.mock('@/mock/questions.json', () => [
  {
    id: 1,
    question: 'Pregunta 1',
    type: 'single',
    options: [
      { id: 'yes', label: 'Sí' },
      { id: 'no', label: 'No' },
    ],
  },
  {
    id: 2,
    question: 'Pregunta 2',
    type: 'multiple',
    options: [
      { id: 'option1', label: 'Opción 1' },
      { id: 'option2', label: 'Opción 2' },
    ],
  },
]);

describe('Form Page', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useFormContext as jest.Mock).mockReturnValue({
      state: {
        currentStep: 1,
        answers: {},
      },
      dispatch: mockDispatch,
    });
  });

  it('redirects to / if no current question is found', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      state: {
        currentStep: 4,
        answers: {},
      },
      dispatch: mockDispatch,
    });

    render(<Form />);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders a single choice question', () => {
    render(<Form />);
    expect(screen.getByText('Pregunta 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Sí')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
  });

  it('renders a multiple choice question', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      state: {
        currentStep: 2,
        answers: {},
      },
      dispatch: mockDispatch,
    });

    render(<Form />);
    expect(screen.getByText('Pregunta 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Opción 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Opción 2')).toBeInTheDocument();
  });

  it('calls NEXT_STEP when "Continuar" is clicked with a valid answer', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      state: {
        currentStep: 1,
        answers: { 'step-1': 'yes' },
      },
      dispatch: mockDispatch,
    });

    render(<Form />);
    const continueButton = screen.getByText('Continuar');
    await userEvent.click(continueButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'NEXT_STEP' });
  });

  it('calls PREV_STEP when "Atrás" is clicked and is not the first step', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      state: {
        currentStep: 2,
        answers: {},
      },
      dispatch: mockDispatch,
    });

    render(<Form />);
    const backButton = screen.getByText('Atrás');
    await userEvent.click(backButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'PREV_STEP' });
  });

  it('redirects to / when "Atrás" is clicked on the first step', async () => {
    render(<Form />);
    const backButton = screen.getByText('Atrás');
    await userEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
