'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import WelcomePage from './pages/welcome/WelcomePage';
import FormPage from './pages/form_page/FormPage';
import RecommendationsPage from './pages/recommendations/RecommendationsPage';
import SummaryPage from './pages/summary/SummaryPage';

const App = () => {
  const searchParams = useSearchParams();
  const { currentStep, totalSteps, updateStep } = useFormContext();

  useEffect(() => {
    const stepFromQuery = parseInt(searchParams.get('step') || '0', 10);
    if (stepFromQuery !== currentStep) {
      updateStep(stepFromQuery);
    }
  }, [searchParams, currentStep, updateStep]);

  switch (currentStep) {
    case 0:
      return <WelcomePage />;
    default:
      if (currentStep >= 1 && currentStep <= totalSteps - 2) {
        return <FormPage />;
      } else if (currentStep === totalSteps - 1) {
        return <RecommendationsPage />;
      } else if (currentStep === totalSteps) {
        return <SummaryPage />;
      } else {
        return <WelcomePage />;
      }
  }
};

export default App;
