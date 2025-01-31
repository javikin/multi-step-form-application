import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';

describe('SingleChoiceQuestion', () => {
  const question = '¿Hay antecedentes de caída del cabello en tu familia?';
  const options = [
    { id: 'no', label: 'No' },
    { id: 'yes', label: 'Sí' },
    { id: 'unsure', label: 'No estoy seguro' },
  ];

  const Wrapper = () => {
    const [value, setValue] = useState<string>('');

    return (
      <SingleChoiceQuestion
        question={question}
        options={options}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    );
  };

  it('renders the question and options', () => {
    render(
      <SingleChoiceQuestion
        question={question}
        options={options}
        value=""
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText(question)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('allows selecting a single option', async () => {
    render(<Wrapper />);

    const noOption = screen.getByTestId('radio-no');
    const yesOption = screen.getByTestId('radio-yes');

    await userEvent.click(noOption);
    expect(noOption).toBeChecked();
    expect(yesOption).not.toBeChecked();

    await userEvent.click(yesOption);
    expect(noOption).not.toBeChecked();
    expect(yesOption).toBeChecked();
  });
});
