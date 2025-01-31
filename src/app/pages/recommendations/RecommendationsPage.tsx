'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import ProgressHeader from '@/components/ProgressHeader';
import FAQs from './FAQs';

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

      <div className="mx-16 mt-32 ">
        <h1 className="text-20px font-medium text-gray-dark mb-32">
          Tratamiento recomendado en base a tus respuestas
        </h1>

        <div className="flex flex-col items-center space-y-4 shadow-card rounded-sm p-32 mb-24 bg-white">
          <h2 className="text-20px font-bold text-gray-dark text-left w-full mb-4">
            {suggestedProduct.title}
          </h2>

          <p className="text-gray-light text-left w-full text-16px">
            {suggestedProduct.description}
          </p>

          <Image
            src={suggestedProduct.image}
            alt={suggestedProduct.title}
            width={145}
            height={185}
            className="py-20"
          />

          <button
            onClick={handleSelect}
            className="w-full px-12 py-18 bg-dark text-white rounded-lg"
          >
            Seleccionar
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4 shadow-card rounded-sm p-32 mb-24 bg-white">
          <FAQs />
        </div>
      </div>
    </main>
  );
};

export default RecommendationsPage;
