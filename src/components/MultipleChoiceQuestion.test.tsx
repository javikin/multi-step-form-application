import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import React, { useState } from 'react';

describe('MultipleChoiceQuestion', () => {
  const mockOnChange = jest.fn();

  const question = '¿Tienes algún problema en el cuero cabelludo?';
  const options = [
    { id: 'pain', label: 'Dolor repentino y/o enrojecimiento' },
    { id: 'dandruff', label: 'Caspa' },
    { id: 'other', label: 'Otro', requiresInput: true },
  ];

  const Wrapper = () => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <MultipleChoiceQuestion
        question={question}
        options={options}
        values={values}
        onChange={(newValues) => setValues(newValues)}
      />
    );
  };

  it('renders the question and options', () => {
    render(
      <MultipleChoiceQuestion
        question={question}
        options={options}
        values={[]}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText(question)).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it('allows selecting multiple options', async () => {
    render(<Wrapper />);

    const painOption = screen.getByTestId('checkbox-pain');
    const dandruffOption = screen.getByTestId('checkbox-dandruff');

    await userEvent.click(painOption);
    expect(painOption).toBeChecked();

    await userEvent.click(dandruffOption);
    expect(dandruffOption).toBeChecked();
  });

  it("handles the 'other' option and input correctly", async () => {
    render(<Wrapper />);

    const otherOption = screen.getByTestId('checkbox-other');
    await userEvent.click(otherOption);
    expect(otherOption).toBeChecked();

    const otherInput = screen.getByTestId('input-other');
    expect(otherInput).toBeInTheDocument();
    await userEvent.type(otherInput, 'Otro valor');
    expect(otherInput).toHaveValue('Otro valor');

    await userEvent.click(otherOption);
    expect(otherOption).not.toBeChecked();
    expect(screen.queryByTestId('input-other')).not.toBeInTheDocument();

    const painOption = screen.getByTestId('checkbox-pain');
    await userEvent.click(painOption);
    expect(painOption).toBeChecked();
    expect(otherOption).not.toBeChecked();
  });
});
