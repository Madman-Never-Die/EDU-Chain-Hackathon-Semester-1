import React from 'react';
import { useQuizContext } from '../contexts/QuizContext';

const QuizPreview: React.FC = () => {
  const { questions } = useQuizContext();

  return (
      <div>
        <h2 className="text-xl font-bold mb-6">Quiz Preview</h2>
        <p className="text-sm sm:text-base text-gray-400 mb-6">
          This is how your quiz will look to students. You can add as many questions as youd like.
        </p>
        <div className="space-y-6">
          {questions.map((question, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{question.question}</h3>
                <ul className="mt-2 space-y-2">
                  {question.answers.map((answer, answerIndex) => (
                      <li key={answerIndex} className="flex items-center">
                        <span className="text-gray-400 mr-2">{answerIndex + 1}</span>
                        <span
                            className={`flex-grow ${
                                answerIndex === question.correctAnswer ? "text-white" : "text-gray-400"
                            }`}
                        >
                    {answer.content}
                  </span>
                        {answerIndex === question.correctAnswer ? (
                            <svg
                                className="w-5 h-5 text-green-500 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5 text-red-500 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                        )}
                      </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>

        <button
            onClick={() => {/* Submit logic */}}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
        >
          Submit Quest
        </button>
      </div>
  );
};

export default QuizPreview;