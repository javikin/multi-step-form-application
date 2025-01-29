"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";


interface FormState {
  currentStep: number; 
  answers: Record<string, any>;
}

interface FormContextProps {
  state: FormState;
  dispatch: React.Dispatch<any>;
}

const initialState: FormState = {
  currentStep: 0,
  answers: {},
};

const formReducer = (state: FormState, action: any): FormState => {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.key]: action.value },
      };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };
    default:
      return state;
  }
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};


export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
