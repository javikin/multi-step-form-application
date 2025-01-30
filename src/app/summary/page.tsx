'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import { useEffect } from 'react';
import questions from '@/mock/questions.json';
import recommendations from '@/mock/recommendations.json';

const Summary = () => {
  const { state } = useFormContext();
  const router = useRouter();

  useEffect(() => {
    if (!state.suggestedProduct) {
      router.push('/');
    }
  }, [state.suggestedProduct, router]);

  const selectedRecommendation = recommendations.find(
    (rec) => rec.key === state.suggestedProduct,
  );

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">
      <h1 className="text-xl font-bold text-gray-700">
        Resumen de tus respuestas
      </h1>
      {selectedRecommendation && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Producto seleccionado:
          </h2>
          <p className="text-gray-700">
            <strong>{selectedRecommendation.title}</strong>:{' '}
            {selectedRecommendation.description}
          </p>
        </div>
      )}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4 mt-4">
        <ul className="space-y-4">
          {questions.map((question, index) => {
            const answerKey = `step-${index + 1}`;
            const answer = state.answers[answerKey];

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
