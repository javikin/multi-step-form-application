'use client';

import { AnswerValue, useFormContext } from '@/context/FormContext';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressHeader from '@/components/ProgressHeader';

const FormPage = () => {
  const {
    currentStep,
    totalSteps,
    getQuestion,
    getAnswer,
    setAnswer,
    prevStep,
    nextStep,
  } = useFormContext();
  const currentQuestion = getQuestion(currentStep);

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

    nextStep();
  };

  const handleBack = () => {
    prevStep();
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
          onChange={(value) => {
            setAnswer(`step-${currentStep}`, value as AnswerValue);
            nextStep();
          }}
        />
      )}
      {currentQuestion.type === 'multiple' && (
        <>
          <div className="flex-1 overflow-y-auto px-4">
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              values={(getAnswer(`step-${currentStep}`) as string[]) || []}
              onChange={(values) =>
                setAnswer(`step-${currentStep}`, values as AnswerValue)
              }
            />
          </div>
          <div className="sticky bottom-0 bg-white px-16 py-40">
            <button
              onClick={handleNext}
              className="w-full px-12 py-18 bg-dark text-white rounded-lg"
            >
              Continuar
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default FormPage;
