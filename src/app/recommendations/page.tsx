'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import FAQs from './faqs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProgressHeader from '@/components/ProgressHeader';

const Recommendations = () => {
  const {
    suggestedProduct,
    isFormCompleted,
    isProcessCompleted,
    totalSteps,
    currentStep,
    prevStep,
    setProcessCompleted,
  } = useFormContext();
  const router = useRouter();

  useEffect(() => {
    if (!isFormCompleted && !isProcessCompleted) {
      router.push('/');
    }
  }, [isFormCompleted, isProcessCompleted, router]);

  const handleSelect = () => {
    router.push('/summary');
  };

  const handleBack = () => {
    setProcessCompleted(false);
    prevStep();
    router.push('/form');
  };

  if (!suggestedProduct) {
    return null;
  }

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

export default Recommendations;
