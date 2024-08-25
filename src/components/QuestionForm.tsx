import React, { useState } from 'react';
import { Question } from '../types';
import { useQuizContext } from '../contexts/QuizContext';

const QuestionForm: React.FC = () => {
  const { addQuestion } = useQuizContext();
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: '',
    answers: [{ content: '' }, { content: '' }],
    correctAnswer: 0
  });

  const handleAddAnswer = () => {
    if (currentQuestion.answers.length < 4) {
      setCurrentQuestion({
        ...currentQuestion,
        answers: [...currentQuestion.answers, { content: '' }],
      });
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...currentQuestion.answers];
    newAnswers[index].content = value;
    setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question && currentQuestion.answers.length >= 2) {
      addQuestion(currentQuestion);
      setCurrentQuestion({
        question: '',
        answers: [{ content: '' }, { content: '' }],
        correctAnswer: 0,
      });
    }
  };

  return (
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Quiz Creation</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Question</label>
            <input
                type="text"
                value={currentQuestion.question}
                onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
                placeholder="Enter your question"
                className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
            />
          </div>

          {currentQuestion.answers.map((answer, index) => (
              <div key={index}>
                <label className="block text-lg font-semibold mb-2">Answer {index + 1}</label>
                <input
                    type="text"
                    value={answer.content}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Enter answer ${index + 1}`}
                    className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                />
              </div>
          ))}

          {currentQuestion.answers.length < 4 && (
              <button onClick={handleAddAnswer} className="text-blue-500">+ Add Another Answer</button>
          )}

          <div className="space-y-2">
            <label className="block text-lg font-semibold mb-2">Correct Answer</label>
            <div className="flex flex-wrap items-center space-x-4">
              {currentQuestion.answers.map((_, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => setCurrentQuestion({...currentQuestion, correctAnswer: index})}
                        className="form-radio text-blue-500"
                    />
                    <span className="ml-2">{index + 1}</span>
                  </label>
              ))}
            </div>
          </div>

          <button
              onClick={handleAddQuestion}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
          >
            Add Question
          </button>
        </div>
      </div>
  );
};

export default QuestionForm;
