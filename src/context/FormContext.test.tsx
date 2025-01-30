import { render, screen } from '@testing-library/react';
import { FormProvider, useFormContext } from './FormContext';
import React from 'react';
import { act } from '@testing-library/react';
import questions from '@/mock/questions.json';

const TestComponent = () => {
  const {
    nextStep,
    prevStep,
    resetState,
    setAnswer,
    getAnswer,
    setSuggestedProduct,
    getCurrentRecommendation,
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
      <button onClick={resetState}>Reset State</button>
      <button onClick={() => setAnswer('step-1', 'yes')}>Set Answer</button>
      <button onClick={() => setSuggestedProduct('minoxidil_caps')}>
        Set Product
      </button>
      <button onClick={() => getCurrentRecommendation()}>
        Get Recommendation
      </button>
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
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    act(() => {
      screen.getByText('Next Step').click();
    });

    expect(screen.getByTestId('currentStep').textContent).toBe('1');

    act(() => {
      screen.getByText('Prev Step').click();
    });

    expect(screen.getByTestId('currentStep').textContent).toBe('0');
  });

  test('resetState should reset all state values', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    act(() => {
      screen.getByText('Next Step').click();
      screen.getByText('Set Answer').click();
      screen.getByText('Set Product').click();
      screen.getByText('Reset State').click();
    });

    expect(screen.getByTestId('currentStep').textContent).toBe('0');
    expect(screen.getByTestId('answer').textContent).toBe('none');
    expect(screen.getByTestId('suggestedProduct').textContent).toBe('none');
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

  test('setSuggestedProduct should set the suggested product', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    act(() => {
      screen.getByText('Set Product').click();
    });

    expect(screen.getByTestId('suggestedProduct').textContent).toBe(
      'Minoxidil® Cápsulas',
    );
  });

  test('totalSteps should be calculated correctly', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>,
    );

    expect(screen.getByTestId('totalSteps').textContent).toBe(
      (questions.length + 1).toString(),
    );
  });
});
