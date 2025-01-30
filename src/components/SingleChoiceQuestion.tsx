import React from 'react';

interface Option {
  id: string;
  label: string;
}

interface SingleChoiceQuestionProps {
  question: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const SingleChoiceQuestion: React.FC<SingleChoiceQuestionProps> = ({
  question,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">{question}</h2>
      {options.map((option) => (
        <div key={option.id} className="flex items-center">
          <input
            type="radio"
            id={option.id}
            name="single-choice"
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            className="mr-2"
            data-testid={`checkbox-${option.id}`}
          />
          <label htmlFor={option.id} className="text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;
