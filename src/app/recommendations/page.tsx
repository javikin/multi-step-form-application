'use client';

import React from 'react';
import Image from 'next/image';
import { AnswerValue, useFormContext } from '@/app/context/FormContext';

const Recommendations = () => {
  const { state } = useFormContext();
  const recommendation = calculateRecommendation(state.answers);

  const recommendationsContent = {
    minoxidil_caps: {
      title: 'DUTAXIDIL® Cápsulas',
      description: 'Dutasterida 0.5 mg + Minoxidil 2.5 mg + Biotina 2.5 mg',
      image: '/images/dutaxidil_caps.png',
    },
    dutaxidil_gel: {
      title: 'DUTAXIDIL® Gel',
      description:
        'Dutasterida 0.1% + Minoxidil 5% + Tretinoína 1% + Hidrocortisona 1%',
      image: '/images/dutaxidil_gel.png',
    },
    dutaxidil_caps: {
      title: 'Minoxidil® Cápsulas',
      description: 'Minoxidil 2.5 mg + Biotina 2.5 mg',
      image: '/images/minoxidil_caps.png',
    },
  };

  const content = recommendationsContent[recommendation];

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">
      <h1 className="text-xl font-bold text-gray-700">
        Tratamiento recomendado en base a tus respuestas
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-bold text-gray-600">{content.title}</h2>
        <p className="text-gray-700">{content.description}</p>
        <Image
          src={content.image}
          alt={content.title}
          width={160}
          height={160}
        />
        <button className="px-4 py-2 bg-black text-white rounded">
          Seleccionar
        </button>
      </div>
    </main>
  );
};

type RecommendationKey = 'minoxidil_caps' | 'dutaxidil_gel' | 'dutaxidil_caps';

const calculateRecommendation = (
  answers: Record<string, AnswerValue>,
): RecommendationKey => {
  const medicalConditions = answers['step-3'] || [];
  if (
    medicalConditions.includes('cancer_mama') ||
    medicalConditions.includes('cancer_prostata')
  ) {
    return 'minoxidil_caps';
  }
  if (medicalConditions.length > 0) {
    return 'dutaxidil_gel';
  }
  return 'dutaxidil_caps';
};

export default Recommendations;
