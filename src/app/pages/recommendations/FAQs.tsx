'use client';

import { useFAQs } from '@/hooks/useFAQs';
import Image from 'next/image';

const FAQs = () => {
  const { faqs, loading, error } = useFAQs(
    'https://679938bebe2191d708b25ceb.mockapi.io/api/faqs',
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-12">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="border-b border-gray-lighter pb-12 mb-12"
        >
          <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-dark text-16px">
            {faq.question}
            <Image
              src="/icons/arrow_down.svg"
              alt="Arrow Down"
              width={16}
              height={16}
            />
          </summary>
          <p className="text-gray-light p-12">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQs;
