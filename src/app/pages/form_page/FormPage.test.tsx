import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormContext } from '@/context/FormContext';
import FormPage from './FormPage';

jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Form Page', () => {
  const mockNextStep = jest.fn();
  const mockPrevStep = jest.fn();
  const mockSetAnswer = jest.fn();
  const mockGetAnswer = jest.fn();
  const mockGetQuestion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useFormContext as jest.Mock).mockReturnValue({
      currentStep: 1,
      totalSteps: 3,
      getQuestion: mockGetQuestion,
      getAnswer: mockGetAnswer,
      setAnswer: mockSetAnswer,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
    });
  });

  it('renders a single choice question', () => {
    mockGetQuestion.mockReturnValue({
      id: 1,
      question: 'Pregunta 1',
      type: 'single',
      options: [
        { id: 'yes', label: 'Sí' },
        { id: 'no', label: 'No' },
      ],
    });

    render(<FormPage />);

    expect(screen.getByText('Pregunta 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Sí')).toBeInTheDocument();
    expect(screen.getByLabelText('No')).toBeInTheDocument();
  });

  it('renders a multiple choice question', () => {
    mockGetQuestion.mockReturnValue({
      id: 2,
      question: 'Pregunta 2',
      type: 'multiple',
      options: [
        { id: 'option1', label: 'Opción 1' },
        { id: 'option2', label: 'Opción 2' },
      ],
    });

    render(<FormPage />);

    expect(screen.getByText('Pregunta 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Opción 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Opción 2')).toBeInTheDocument();
  });

  it('calls nextStep when a valid answer is provided', async () => {
    mockGetQuestion.mockReturnValue({
      id: 1,
      question: 'Pregunta 1',
      type: 'single',
      options: [
        { id: 'yes', label: 'Sí' },
        { id: 'no', label: 'No' },
      ],
    });

    mockGetAnswer.mockReturnValue('yes');

    render(<FormPage />);

    const continueButton = screen.getByText('Continuar');
    await userEvent.click(continueButton);

    expect(mockNextStep).toHaveBeenCalled();
  });
});
