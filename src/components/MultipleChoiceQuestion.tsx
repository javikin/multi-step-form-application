import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Option {
  id: string;
  label: string;
  requiresInput?: boolean;
}

interface MultipleChoiceQuestionProps {
  question: string;
  options: Option[];
  values: string[];
  otherValue: string;
  otherFieldErrors: boolean;
  onChange: (values: string[], otherValue?: string) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  values,
  otherValue,
  otherFieldErrors,
  onChange,
}) => {
  const [otherInput, setOtherInput] = useState('');

  useEffect(() => {
    setOtherInput(otherValue);
  }, [otherValue]);

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

  const handleOtherInputChange = (value: string) => {
    setOtherInput(value);
    if (!values.includes('other')) {
      onChange([...values, 'other'], value);
    } else {
      onChange([...values], value);
    }
  };

  return (
    <div className="space-y-6 px-16">
      <h2 className="text-20px font-medium text-gray-dark mt-32 mb-8">
        {question}
      </h2>
      <p className="text-14px text-gray-light mt-8 mb-24">
        Selecciona todas las opciones que apliquen.
      </p>
      <div className="flex flex-col space-y-16 pt-24">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex py-12 pl-20 rounded border ${
              values.includes(option.id) ? 'border-gray-light' : 'border-gray'
            }`}
          >
            <input
              type="checkbox"
              id={option.id}
              checked={values.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
              className="hidden peer"
              data-testid={`checkbox-${option.id}`}
            />
            <Image
              src={
                values.includes(option.id)
                  ? '/icons/circle_filled.svg'
                  : '/icons/circle.svg'
              }
              alt={values.includes(option.id) ? 'Selected' : 'Unselected'}
              width={18}
              height={18}
              className="mr-12"
            />
            <label
              htmlFor={option.id}
              data-testid={`label-${option.id}`}
              className={`flex-grow cursor-pointer text-gray-dark`}
            >
              {option.label}
            </label>
          </div>
        ))}

        {values.includes('other') && (
          <div className="flex flex-col space-y-2 mt-4">
            <label htmlFor="other" className="text-12px text-gray-light mb-12">
              Cuéntanos cuál es el problema
            </label>
            <textarea
              id="other"
              placeholder="Inserta tu respuesta aquí"
              value={otherInput}
              rows={4}
              onChange={(e) => handleOtherInputChange(e.target.value)}
              className={`border border-gray rounded px-20 py-16 text-gray-light `}
              data-testid="input-other"
            />
            {otherFieldErrors && (
              <p className="text-red-500 text-12px">
                Por favor completa este campo.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
