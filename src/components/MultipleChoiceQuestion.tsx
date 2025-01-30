import React, { useState } from 'react';

interface Option {
  id: string;
  label: string;
  requiresInput?: boolean;
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  values,
  onChange,
}) => {
  const [otherInput, setOtherInput] = useState('');

  const handleOptionChange = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter((value) => value !== id));
    } else {
      if (id === 'none') {
        onChange(['none']);
      } else {
        onChange(values.filter((value) => value !== 'none').concat(id));
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">{question}</h2>
      <h3 className="text-lg font-medium text-gray-700">
        Selecciona todas las opciones que apliquen.
      </h3>
      {options.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={option.id}
            checked={values.includes(option.id)}
            onChange={() => handleOptionChange(option.id)}
            className="mr-2"
            data-testid={`checkbox-${option.id}`}
          />
          <label htmlFor={option.id} className="text-gray-700">
            {option.label}
          </label>
          {option.requiresInput && values.includes(option.id) && (
            <div>
              <label htmlFor={option.id} className="text-gray-700">
                {option.label}
              </label>
              <input
                type="text"
                placeholder="Inserta tu respuesta aquí"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
                className="ml-2 border border-gray-300 rounded px-2 py-1"
                data-testid={`input-other`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion;
