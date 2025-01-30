'use client';

import { useFAQs } from '@/hooks/useFAQs';

const FAQs = () => {
  const { faqs, loading, error } = useFAQs(
    'https://679938bebe2191d708b25ceb.mockapi.io/api/faqs',
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details key={index} className="border-b border-gray-300">
          <summary className="font-semibold text-gray-800">
            {faq.question}
          </summary>
          <p className="text-gray-600">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQs;
