import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import Form from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Form Page', () => {
  const mockPush = jest.fn();
  const mockNextStep = jest.fn();
  const mockPrevStep = jest.fn();
  const mockSetSuggestedProduct = jest.fn();
  const mockSetProcessCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useFormContext as jest.Mock).mockReturnValue({
      currentStep: 1,
      totalSteps: 3,
      getQuestion: jest.fn().mockReturnValue({
        id: 1,
        question: 'Pregunta 1',
        type: 'single',
        options: [
          { id: 'yes', label: 'Sí' },
          { id: 'no', label: 'No' },
        ],
      }),
      getAnswer: jest.fn().mockReturnValue(null),
      setAnswer: jest.fn(),
      getCurrentRecommendation: jest.fn().mockReturnValue('minoxidil_caps'),
      setSuggestedProduct: mockSetSuggestedProduct,
      setProcessCompleted: mockSetProcessCompleted,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      isFormCompleted: false,
      isProcessCompleted: false,
    });
  });

  it('redirects to /recommendations if the process is completed', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      currentStep: 4,
      totalSteps: 3,
      getQuestion: jest.fn().mockReturnValue(undefined),
      isProcessCompleted: true,
      isFormCompleted: true,
    });

    render(<Form />);
    expect(mockPush).toHaveBeenCalledWith('/recommendations');
  });

  it('redirects to / if the form is incomplete', () => {
    (useFormContext as jest.Mock).mockReturnValue({
      currentStep: 0,
      totalSteps: 3,
      getQuestion: jest.fn().mockReturnValue(undefined),
      isProcessCompleted: false,
      isFormCompleted: false,
    });

    render(<Form />);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('handles the next button correctly when a valid answer is selected', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      ...useFormContext(),
      getAnswer: jest.fn().mockReturnValue('yes'),
      isFormCompleted: false,
    });

    render(<Form />);
    const continueButton = screen.getByText('Continuar');
    await userEvent.click(continueButton);
    expect(mockNextStep).toHaveBeenCalled();
  });

  it('handles the back button correctly', async () => {
    render(<Form />);

    const backButton = screen.getByText('Atrás');
    await userEvent.click(backButton);

    expect(mockPrevStep).toHaveBeenCalled();
  });

  it('redirects to / if back is clicked on the first step', async () => {
    (useFormContext as jest.Mock).mockReturnValue({
      ...useFormContext(),
      currentStep: 0,
    });

    render(<Form />);
    const backButton = screen.getByText('Atrás');
    await userEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
