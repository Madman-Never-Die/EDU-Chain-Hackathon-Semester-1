import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '../types';

interface QuizContextType {
  questions: Question[];
  addQuestion: (question: Question) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  return (
      <QuizContext.Provider value={{ questions, addQuestion }}>
        {children}
      </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};

