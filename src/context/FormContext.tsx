'use client';

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

// TODO: Replace with hooks services
import questions from '@/mock/questions.json';
import recommendations from '@/mock/recommendations.json';

export type AnswerValue = string | string[] | null;

export type Question = {
  id: number;
  question: string;
  type: string;
  options: {
    id: string;
    label: string;
    requiresInput?: boolean | undefined;
  }[];
};

export type Recommendation = {
  key: string;
  title: string;
  description: string;
  image: string;
};

type RecommendationKey = 'minoxidil_caps' | 'dutaxidil_gel' | 'dutaxidil_caps';

interface FormState {
  currentStep: number;
  answers: Record<string, AnswerValue>;
  suggestedProduct: string | undefined;
  isProcessCompleted: boolean;
}

interface FormContextProps {
  nextStep: () => void;
  prevStep: () => void;
  resetState: () => void;
  setSuggestedProduct: (productKey?: string) => void;
  getQuestion: (step: number) => Question | undefined;
  setAnswer: (key: string, value: AnswerValue) => void;
  getAnswer: (key: string) => AnswerValue;
  getCurrentRecommendation: () => RecommendationKey;
  setProcessCompleted: (value: boolean) => void;
  questions: Question[];
  currentStep: number;
  totalSteps: number;
  suggestedProduct: Recommendation | undefined;
  isFormCompleted: boolean;
  isProcessCompleted: boolean;
}

const initialState: FormState = {
  currentStep: 0,
  answers: {},
  suggestedProduct: undefined,
  isProcessCompleted: false,
};

type Action =
  | { type: 'SET_ANSWER'; key: string; value: AnswerValue }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET_STATE' }
  | { type: 'SET_SUGGESTED_PRODUCT'; product?: string }
  | { type: 'SET_PROCESS_COMPLETED'; value: boolean };

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    case 'RESET_STATE':
      return { ...initialState };
    case 'SET_SUGGESTED_PRODUCT':
      return { ...state, suggestedProduct: action.product };
    case 'SET_PROCESS_COMPLETED':
      return { ...state, isProcessCompleted: action.value };
    default:
      return state;
  }
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const nextStep = () => dispatch({ type: 'NEXT_STEP' });
  const prevStep = () => dispatch({ type: 'PREV_STEP' });
  const resetState = () => dispatch({ type: 'RESET_STATE' });
  const setSuggestedProduct = (product?: string) =>
    dispatch({ type: 'SET_SUGGESTED_PRODUCT', product });
  const getQuestion = (step: number) => questions.find((q) => q.id === step);

  const setAnswer = (key: string, value: AnswerValue) =>
    dispatch({ type: 'SET_ANSWER', key, value });
  const getAnswer = (key: string) => state.answers[key];

  const setProcessCompleted = (value: boolean) =>
    dispatch({ type: 'SET_PROCESS_COMPLETED', value });

  const currentStep = state.currentStep;

  const totalSteps = useMemo(
    () => questions.length + 1, // Extra step for recommendations page
    [],
  );

  const isFormCompleted = useMemo(
    () => questions.every((q) => state.answers[`step-${q.id}`] !== undefined),
    [state.answers],
  );

  const suggestedProduct = useMemo(
    () => recommendations.find((rec) => rec.key === state.suggestedProduct),
    [state.suggestedProduct],
  );

  const isProcessCompleted = state.isProcessCompleted;

  const getCurrentRecommendation = (): RecommendationKey => {
    const medicalConditions = getAnswer('step-3') || [];
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

  return (
    <FormContext.Provider
      value={{
        nextStep,
        prevStep,
        resetState,
        setSuggestedProduct,
        getQuestion,
        setAnswer,
        getAnswer,
        getCurrentRecommendation,
        setProcessCompleted,
        currentStep,
        totalSteps,
        suggestedProduct,
        questions,
        isFormCompleted,
        isProcessCompleted,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
