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
    <div className="mx-20">
      <h2 className="text-20px font-medium text-gray-dark mt-32 mb-24">
        {question}
      </h2>
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex mb-16 py-12 pl-20 border rounded 
            ${value === option.id ? 'border-gray-light' : 'border-gray'}`}
        >
          <input
            type="radio"
            id={option.id}
            name="single-choice"
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            onClick={() => onChange(option.id)}
            className="hidden peer"
            data-testid={`radio-${option.id}`}
          />
          <label
            htmlFor={option.id}
            className={`flex-grow cursor-pointer  text-gray-dark`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;
