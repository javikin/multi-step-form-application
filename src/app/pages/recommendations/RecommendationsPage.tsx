'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import FAQs from './faqs';
import ProgressHeader from '@/components/ProgressHeader';

const RecommendationsPage = () => {
  const { suggestedProduct, totalSteps, currentStep, prevStep, nextStep } =
    useFormContext();

  if (!suggestedProduct) {
    return null;
  }

  const handleSelect = () => {
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

      <h1 className="text-xl font-bold text-gray-700">
        Tratamiento recomendado en base a tus respuestas
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-bold text-gray-600">
          {suggestedProduct.title}
        </h2>
        <p className="text-gray-700">{suggestedProduct.description}</p>
        <Image
          src={suggestedProduct.image}
          alt={suggestedProduct.title}
          width={160}
          height={160}
        />
        <button
          onClick={handleSelect}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Seleccionar
        </button>
      </div>

      <FAQs />
    </main>
  );
};

export default RecommendationsPage;
