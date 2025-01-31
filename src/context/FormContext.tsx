'use client';

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useState,
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
  getQuestion: (step: number) => Question | undefined;
  setAnswer: (key: string, value: AnswerValue) => void;
  getAnswer: (key: string) => AnswerValue;
  questions: Question[];
  currentStep: number;
  totalSteps: number;
  suggestedProduct: Recommendation | undefined;
  isFormCompleted: boolean;
  canContinue: boolean;
  otherFieldErrors: Record<string, boolean>;
}

const initialState: FormState = {
  currentStep: 0,
  answers: {},
  suggestedProduct: undefined,
};

type Action =
  | { type: 'SET_ANSWER'; key: string; value: AnswerValue }
  | { type: 'UPDATE_STEP'; step: number };

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    case 'UPDATE_STEP':
      return { ...state, currentStep: action.step };
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
    push(`?step=${state.currentStep + 1}`);
  };
  const prevStep = () => {
    push(`?step=${state.currentStep - 1}`);
  };
  const updateStep = (step: number) => dispatch({ type: 'UPDATE_STEP', step });
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

  const [otherFieldErrors, setOtherFieldErrors] = useState<
    Record<string, boolean>
  >({});

  const canContinue = useMemo(() => {
    const questionsToCheck = questions.filter((q) => q.id <= currentStep);

    return questionsToCheck.every((q) => {
      const answer = state.answers[`step-${q.id}`];

      // Check if other field is filled
      if (q.type === 'multiple' && Array.isArray(answer)) {
        const isOtherSelected = answer.includes('other');
        const otherValue = state.answers[`step-${q.id}-other`];

        if (
          isOtherSelected &&
          (typeof otherValue !== 'string' || otherValue.trim() === '')
        ) {
          setOtherFieldErrors((prevErrors) => ({
            ...prevErrors,
            [`step-${q.id}`]: true,
          }));
          return false;
        } else {
          setOtherFieldErrors((prevErrors) => ({
            ...prevErrors,
            [`step-${q.id}`]: false,
          }));
        }
      }

      // Check if the answer is not empty
      return Array.isArray(answer) ? answer.length > 0 : !!answer;
    });
  }, [currentStep, state.answers]);

  return (
    <FormContext.Provider
      value={{
        nextStep,
        prevStep,
        updateStep,
        getQuestion,
        setAnswer,
        getAnswer,
        currentStep,
        totalSteps,
        suggestedProduct,
        questions,
        isFormCompleted,
        canContinue,
        otherFieldErrors,
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
