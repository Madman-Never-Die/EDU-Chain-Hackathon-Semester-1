"use client";

import React, { useState } from "react";

const CreateQuest = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What is a blockchain?",
      answers: [
        { text: "An immutable ledger of transactions", correct: true },
        { text: "A type of food", correct: false },
      ],
    },
    {
      question: "Where are blockchains used?",
      answers: [
        { text: "Supply chain management", correct: true },
        { text: "Musical instrument", correct: false },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Main Content */}
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">Create a Quest</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Quest Title
            </label>
            <input
              type="text"
              placeholder="Enter your quest title here"
              className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Protocol Content
            </label>
            <p className="text-gray-400 mb-2">
              The following is a rich text editor. You can use it to format the
              content of your protocol. For example, you can add headers, lists,
              and images. You can also add links to external sources.
            </p>
            <textarea
              placeholder="Content"
              rows={6}
              className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
            ></textarea>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Creation</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter your question"
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Answer 1
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first answer"
                    className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Answer 2
                  </label>
                  <input
                    type="text"
                    placeholder="Enter second answer"
                    className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Answer 3
                  </label>
                  <input
                    type="text"
                    placeholder="Enter third answer"
                    className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Answer 4
                  </label>
                  <input
                    type="text"
                    placeholder="Enter fourth answer"
                    className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-semibold mb-2">
                  Correct Answer
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">1</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">2</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">3</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="correctAnswer"
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">4</span>
                  </label>
                </div>
              </div>

              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
                Add Question
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-80 p-8 bg-gray-800 border-l border-gray-700">
        <h2 className="text-xl font-bold mb-6">Quiz Preview</h2>
        <p className="text-gray-400 mb-6">
          This is how your quiz will look to students. You can add as many
          questions as you'd like.
        </p>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              <ul className="mt-2 space-y-2">
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex} className="flex items-center">
                    <span className="text-gray-400 mr-2">
                      {answerIndex + 1}
                    </span>
                    <span
                      className={`flex-grow ${
                        answer.correct ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {answer.text}
                    </span>
                    {answer.correct && (
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
                    )}
                    {!answer.correct && (
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
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          Submit Quest
        </button>
      </aside>
    </div>
  );
};

export default CreateQuest;
