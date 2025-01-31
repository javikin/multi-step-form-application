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
        <div key={option.id} className="flex items-center pt-16">
          <input
            type="radio"
            id={option.id}
            name="single-choice"
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
            className="hidden peer"
          />
          <label
            htmlFor={option.id}
            className={`block  w-full py-12 pl-20 pr-12 border rounded cursor-pointer transition-all bg-white text-gray-dark
              ${value === option.id ? 'border-gray-light' : 'border-gray'}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleChoiceQuestion;
