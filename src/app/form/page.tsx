'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnswerValue, useFormContext } from '@/context/FormContext';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressHeader from '@/components/ProgressHeader';

const Form = () => {
  const router = useRouter();
  const {
    currentStep,
    totalSteps,
    getQuestion,
    getAnswer,
    setAnswer,
    getCurrentRecommendation,
    setSuggestedProduct,
    setProcessCompleted,
    nextStep,
    prevStep,
    isFormCompleted,
    isProcessCompleted,
  } = useFormContext();
  const currentQuestion = getQuestion(currentStep);

  useEffect(() => {
    if (!currentQuestion && isProcessCompleted) {
      router.push('/recommendations');
    } else if ((!currentQuestion && !isFormCompleted) || currentStep == 0) {
      router.push('/');
    }
  }, [
    currentQuestion,
    isProcessCompleted,
    isFormCompleted,
    currentStep,
    router,
  ]);

  if (!currentQuestion) {
    return null;
  }

  const handleNext = () => {
    const answer = getAnswer(`step-${currentStep}`);

    if (
      (currentQuestion.type === 'single' && !answer) ||
      (currentQuestion.type === 'multiple' && (!answer || answer.length === 0))
    ) {
      alert('Por favor selecciona al menos una opción antes de continuar.');
      return;
    }

    if (isFormCompleted) {
      const recommendation = getCurrentRecommendation();
      setSuggestedProduct(recommendation);
      setProcessCompleted(true);
      nextStep();
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    prevStep();
    if (currentStep == 0) {
      router.push('/');
    }
  };

  return (
    <main className="flex flex-col h-screen bg-white">
      <ProgressHeader
        onBack={handleBack}
        totalSteps={totalSteps}
        currentStep={currentStep}
      />

      {currentQuestion.type === 'single' && (
        <SingleChoiceQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          value={(getAnswer(`step-${currentStep}`) as string) || ''}
          onChange={(value) =>
            setAnswer(`step-${currentStep}`, value as AnswerValue)
          }
        />
      )}
      {currentQuestion.type === 'multiple' && (
        <MultipleChoiceQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          values={(getAnswer(`step-${currentStep}`) as string[]) || []}
          onChange={(values) =>
            setAnswer(`step-${currentStep}`, values as AnswerValue)
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
