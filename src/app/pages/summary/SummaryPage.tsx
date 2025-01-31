'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import ProgressHeader from '@/components/ProgressHeader';

const SummaryPage = () => {
  const {
    suggestedProduct,
    questions,
    getAnswer,
    prevStep,
    totalSteps,
    currentStep,
  } = useFormContext();

  const handleBack = () => {
    prevStep();
  };

  return (
    <main className="flex flex-col h-screen bg-gray-alt">
      <ProgressHeader
        onBack={handleBack}
        totalSteps={totalSteps}
        currentStep={currentStep}
      />

      <div className="px-16 mt-12 space-y-8">
        {suggestedProduct && (
          <div className="flex flex-col items-center space-y-4 shadow-card rounded-sm p-32 mb-24 bg-white">
            <h2 className="text-20px font-bold text-gray-dark mb-12">
              Producto seleccionado
            </h2>

            <Image
              src={suggestedProduct.image}
              alt={suggestedProduct.title}
              width={145}
              height={185}
              className="py-20"
            />

            <p className="text-16px text-gray-light">
              <strong className="text-gray-dark">
                {suggestedProduct.title}
              </strong>
              : {suggestedProduct.description}
            </p>
          </div>
        )}

        <div className="flex flex-col items-center space-y-4 shadow-card rounded-sm p-32 mb-24 bg-white">
          <h2 className="text-20px font-bold text-gray-dark mb-12">
            Respuestas
          </h2>
          <ul className="space-y-16">
            {questions.map((question, index) => {
              const answerKey = `step-${index + 1}`;
              const otherKey = `step-${index + 1}-other`;
              const answer = getAnswer(answerKey);
              const otherAnswer = getAnswer(otherKey);

              return (
                <li
                  key={answerKey}
                  className="text-14px text-gray-dark leading-6 font-bold"
                >
                  <strong className="font-medium text-gray-dark">
                    {question.question}:
                  </strong>{' '}
                  {Array.isArray(answer)
                    ? answer
                        .map((value) => {
                          const option = question.options.find(
                            (opt) => opt.id === value,
                          );
                          return option ? option.label : value;
                        })
                        .join(', ')
                    : question.options.find((opt) => opt.id === answer)
                        ?.label || 'Sin respuesta'}
                  {/* Render the "other" value if present */}
                  {otherAnswer && (
                    <span className="text-gray-light font-normal">
                      {`, ${otherAnswer}`}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default SummaryPage;
