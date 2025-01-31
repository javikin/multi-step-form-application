import { render, screen } from '@testing-library/react';
import { FormProvider, useFormContext } from './FormContext';
import React from 'react';
import { act } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const TestComponent = () => {
  const {
    nextStep,
    prevStep,
    setAnswer,
    getAnswer,
    currentStep,
    totalSteps,
    isFormCompleted,
    suggestedProduct,
  } = useFormContext();

  return (
    <div>
      <div data-testid="currentStep">{currentStep}</div>
      <div data-testid="totalSteps">{totalSteps}</div>
      <div data-testid="isFormCompleted">
        {isFormCompleted ? 'true' : 'false'}
      </div>
      <div data-testid="suggestedProduct">
        {suggestedProduct?.title || 'none'}
      </div>
      <button onClick={nextStep}>Next Step</button>
      <button onClick={prevStep}>Prev Step</button>
      <button onClick={() => setAnswer('step-1', 'yes')}>Set Answer</button>
      <div data-testid="answer">{getAnswer('step-1') || 'none'}</div>
    </div>
  );
};

describe('FormContext', () => {
  test('initial state should have currentStep as 0 and isFormCompleted as false', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    expect(screen.getByTestId('currentStep').textContent).toBe('0');
    expect(screen.getByTestId('isFormCompleted').textContent).toBe('false');
  });

  test('nextStep and prevStep should navigate through steps', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    act(() => {
      screen.getByText('Next Step').click();
    });

    expect(pushMock).toHaveBeenCalledWith('?step=1');

    act(() => {
      screen.getByText('Prev Step').click();
    });

    expect(pushMock).toHaveBeenCalledWith('?step=-1');
  });

  test('setAnswer and getAnswer should update and retrieve answers', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    act(() => {
      screen.getByText('Set Answer').click();
    });

    expect(screen.getByTestId('answer').textContent).toBe('yes');
  });

  test('totalSteps should be calculated correctly', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    expect(screen.getByTestId('totalSteps').textContent).toBe('6'); // 4 questions from @questions json + 2 steps from recommendations and summary
  });
});
