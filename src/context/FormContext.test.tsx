import { render, screen } from '@testing-library/react';
import { FormProvider, useFormContext } from './FormContext';
import React from 'react';
import { act } from '@testing-library/react';

const TestComponent = () => {
  const { state, dispatch } = useFormContext();

  return (
    <div>
      <div data-testid="currentStep">{state.currentStep}</div>
      <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Prev Step</button>
      <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next Step</button>
    </div>
  );
};

test('initial state should have currentStep as 0', () => {
  render(
    <FormProvider>
      <TestComponent />
    </FormProvider>,
  );

  expect(screen.getByTestId('currentStep').textContent).toBe('0');
});

test('dispatch should navigate through steps', () => {
  render(
    <FormProvider>
      <TestComponent />
    </FormProvider>,
  );

  act(() => {
    screen.getByText('Next Step').click();
    screen.getByText('Next Step').click();
    screen.getByText('Prev Step').click();
  });

  expect(screen.getByTestId('currentStep').textContent).toBe('1');
});
