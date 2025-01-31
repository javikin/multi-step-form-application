'use client';

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

// TODO: Replace with hooks services
import questions from '@/mock/questions.json';
import recommendations from '@/mock/recommendations.json';
import { useRouter } from 'next/navigation';

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
}

interface FormContextProps {
  nextStep: () => void;
  prevStep: () => void;
  updateStep: (step: number) => void;
  resetState: () => void;
  getQuestion: (step: number) => Question | undefined;
  setAnswer: (key: string, value: AnswerValue) => void;
  getAnswer: (key: string) => AnswerValue;
  questions: Question[];
  currentStep: number;
  totalSteps: number;
  suggestedProduct: Recommendation | undefined;
  isFormCompleted: boolean;
}

const initialState: FormState = {
  currentStep: 0,
  answers: {},
  suggestedProduct: undefined,
};

type Action =
  | { type: 'SET_ANSWER'; key: string; value: AnswerValue }
  | { type: 'NEXT_STEP' }
  | { type: 'UPDATE_STEP'; step: number }
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
    case 'UPDATE_STEP':
      return { ...state, currentStep: action.step };
    case 'RESET_STATE':
      return { ...initialState };
    default:
      return state;
  }
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { push } = useRouter();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const nextStep = () => {
    // dispatch({ type: 'NEXT_STEP' });
    push(`?step=${state.currentStep + 1}`);
  };
  const prevStep = () => {
    // dispatch({ type: 'PREV_STEP' });
    push(`?step=${state.currentStep - 1}`);
  };
  const updateStep = (step: number) => dispatch({ type: 'UPDATE_STEP', step });
  const resetState = () => dispatch({ type: 'RESET_STATE' });
  const getQuestion = (step: number) => questions.find((q) => q.id === step);
  const setAnswer = (key: string, value: AnswerValue) =>
    dispatch({ type: 'SET_ANSWER', key, value });

  const currentStep = state.currentStep;

  const totalSteps = useMemo(
    () => questions.length + 2, // +1 recommendations and +1 summary
    [],
  );

  const isFormCompleted = useMemo(
    () => questions.every((q) => state.answers[`step-${q.id}`] !== undefined),
    [state.answers],
  );

  const getAnswer = useCallback(
    (key: string): AnswerValue => {
      return state.answers[key] || null;
    },
    [state.answers],
  );

  const getCurrentRecommendation = useCallback((): RecommendationKey => {
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
  }, [getAnswer]);

  const suggestedProduct = useMemo(
    () => recommendations.find((rec) => rec.key === getCurrentRecommendation()),
    [getCurrentRecommendation],
  );

  return (
    <FormContext.Provider
      value={{
        nextStep,
        prevStep,
        updateStep,
        resetState,
        getQuestion,
        setAnswer,
        getAnswer,
        currentStep,
        totalSteps,
        suggestedProduct,
        questions,
        isFormCompleted,
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
