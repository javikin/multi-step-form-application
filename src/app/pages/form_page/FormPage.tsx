'use client';

import { AnswerValue, useFormContext } from '@/context/FormContext';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ProgressHeader from '@/components/ProgressHeader';

const FormPage = () => {
  const {
    currentStep,
    totalSteps,
    canContinue,
    otherFieldErrors,
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

    if (currentQuestion.type === 'multiple' && Array.isArray(answer)) {
      const isOtherSelected = answer.includes('other');
      const otherValue = getAnswer(`step-${currentStep}-other`);
      if (isOtherSelected && (!otherValue || otherValue === '')) {
        alert('Por favor completa el campo "Otro" antes de continuar.');
        return;
      }
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
          <div className="flex-1 overflow-y-auto px-4 pb-24">
            <MultipleChoiceQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              otherFieldErrors={
                otherFieldErrors && otherFieldErrors[`step-${currentStep}`]
              }
              values={(getAnswer(`step-${currentStep}`) as string[]) || []}
              otherValue={
                (getAnswer(`step-${currentStep}-other`) as string) || ''
              }
              onChange={(values, otherValue) => {
                setAnswer(`step-${currentStep}`, values as AnswerValue);
                if (values.includes('other')) {
                  setAnswer(`step-${currentStep}-other`, otherValue || '');
                } else {
                  setAnswer(`step-${currentStep}-other`, null);
                }
              }}
            />
          </div>
          <div className="sticky bottom-0 bg-white px-16 py-24">
            <button
              onClick={handleNext}
              className={`w-full px-12 py-18 text-white rounded-lg ${canContinue ? 'bg-dark' : 'bg-gray'}`}
              disabled={!canContinue}
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
