// File: types.ts
export interface Answer {
  content: string;
}

export interface Question {
  question: string;
  answers: Answer[];
  correctAnswer: number;
}