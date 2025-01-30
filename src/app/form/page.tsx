'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/app/context/FormContext';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import questions from '@/mock/questions.json';

const Form = () => {
  const router = useRouter();
  const { state, dispatch } = useFormContext();

  const currentQuestion = questions[state.currentStep - 1];

  useEffect(() => {
    if (!currentQuestion) {
      router.push('/');
    }
  }, [currentQuestion, router]);

  if (!currentQuestion) {
    return null;
  }

  const handleNext = () => {
    const answer = state.answers[`step-${state.currentStep}`];

    if (
      (currentQuestion.type === 'single' && !answer) ||
      (currentQuestion.type === 'multiple' && (!answer || answer.length === 0))
    ) {
      alert('Por favor selecciona al menos una opción antes de continuar.');
      return;
    }

    dispatch({ type: 'NEXT_STEP' });

    if (state.currentStep >= questions.length) {
      alert('Formulario completado.');
      router.push('/');
    }
  };

  const handleBack = () => {
    dispatch({ type: 'PREV_STEP' });
    if (state.currentStep == 0) {
      router.push('/');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">
      {currentQuestion.type === 'single' && (
        <SingleChoiceQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          value={(state.answers[`step-${state.currentStep}`] as string) || ''}
          onChange={(value) =>
            dispatch({
              type: 'SET_ANSWER',
              key: `step-${state.currentStep}`,
              value,
            })
          }
        />
      )}
      {currentQuestion.type === 'multiple' && (
        <MultipleChoiceQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          values={(state.answers[`step-${state.currentStep}`] as []) || []}
          onChange={(values) =>
            dispatch({
              type: 'SET_ANSWER',
              key: `step-${state.currentStep}`,
              value: values,
            })
          }
        />
      )}
      <div className="flex space-x-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold"
        >
          Atrás
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white font-semibold"
        >
          Continuar
        </button>
      </div>
    </main>
  );
};

export default Form;
