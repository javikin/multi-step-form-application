'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import { useEffect } from 'react';
import ProgressHeader from '@/components/ProgressHeader';

const Summary = () => {
  const {
    suggestedProduct,
    questions,
    getAnswer,
    prevStep,
    totalSteps,
    currentStep,
  } = useFormContext();
  const router = useRouter();

  const handleBack = () => {
    prevStep();
    router.push('/recommendations');
  };

  useEffect(() => {
    if (!suggestedProduct) {
      router.push('/');
    }
  }, [suggestedProduct, router]);

  return (
    <main className="flex flex-col h-screen bg-white">
      <ProgressHeader
        onBack={handleBack}
        totalSteps={totalSteps}
        currentStep={currentStep}
      />

      <h1 className="text-xl font-bold text-gray-700">
        Resumen de tus respuestas
      </h1>
      {suggestedProduct && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Producto seleccionado:
          </h2>
          <p className="text-gray-700">
            <strong>{suggestedProduct.title}</strong>:{' '}
            {suggestedProduct.description}
          </p>
        </div>
      )}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4 mt-4">
        <ul className="space-y-4">
          {questions.map((question, index) => {
            const answerKey = `step-${index + 1}`;
            const answer = getAnswer(answerKey);

            return (
              <li key={answerKey} className="text-gray-700">
                <strong>{question.question}:</strong>{' '}
                {Array.isArray(answer)
                  ? answer
                      .map((value) => {
                        const option = question.options.find(
                          (opt) => opt.id === value,
                        );
                        return option ? option.label : value;
                      })
                      .join(', ')
                  : question.options.find((opt) => opt.id === answer)?.label ||
                    'Sin respuesta'}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Summary;
