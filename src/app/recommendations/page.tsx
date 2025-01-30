'use client';

import Image from 'next/image';
import { useFormContext } from '@/context/FormContext';
import FAQs from './faqs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import recommendations from '@/mock/recommendations.json';

const Recommendations = () => {
  const { state } = useFormContext();
  const router = useRouter();

  useEffect(() => {
    if (!state.suggestedProduct) {
      router.push('/');
    }
  }, [state.suggestedProduct, router]);

  const suggestedProduct = recommendations.find(
    (rec) => rec.key === state.suggestedProduct,
  );

  if (!suggestedProduct) {
    router.push('/');
    return null;
  }

  const handleSelect = () => {
    router.push('/summary');
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-6 bg-white">
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
