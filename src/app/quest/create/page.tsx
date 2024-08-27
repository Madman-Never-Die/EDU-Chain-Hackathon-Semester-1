"use client";

import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {accountState} from "@/recoil/account";
import QuestProviderAbi from '../../../QuestProvider.json' assert {type: "json"};
import {BrowserProvider, Contract} from "ethers";
const QuestProviderAddress: any = process.env.NEXT_PUBLIC_QUEST_PROVIDER_ADDRESS

const CreateQuest = () => {
  const [account, setAccount] = useRecoilState(accountState);

  const [questTitle, setQuestTitle] = useState("");
  const [researchPaperUrl, setResearchPaperUrl] = useState("");
  const [protocolContent, setProtocolContent] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answers: [{content: ""}, {content: ""}],
    correctAnswer: 0
  });
  const [questions, setQuestions]: any = useState([]);

  const handleAddAnswer = () => {
    if (currentQuestion.answers.length < 4) {
      setCurrentQuestion({
        ...currentQuestion,
        answers: [...currentQuestion.answers, {content: ""}],
      });
    }
  };

  const handleAnswerChange = (index: any, value: any) => {
    const newAnswers = [...currentQuestion.answers];
    newAnswers[index].content = value;
    setCurrentQuestion({...currentQuestion, answers: newAnswers});
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question && currentQuestion.answers.length >= 2) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: "",
        answers: [{content: ""}, {content: ""}],
        correctAnswer: 0,
      });
    }
  };


  const handleSubmit = async () => {
    const questData = {
      title: questTitle,
      paper_url: researchPaperUrl,
      content: protocolContent,
      liquidity_provider: "arbitrum",
      provider: account,
      type: "network",
      questions
    };
    try {
      const response = await fetch('/api/createQuest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questData),
      });

      if (response.ok) {
        alert('Quest created successfully!');
        try {
          // 컨트랙트 콜
          if (window.ethereum) {
            try {
              const provider = new BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const contract: any = new Contract(QuestProviderAddress, QuestProviderAbi, signer);
              const address = await signer.getAddress();
              const questInsertInfo = await response.json()
              const result = await contract.updateQuestStatus(address, questInsertInfo.id, false);
              console.log(result)
            } catch (e) {
              console.error(e)
            }
          }
        } catch (e) {
          console.error(e)
        }


      } else {
        alert('Failed to create quest');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the quest');
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
        <main className="flex-grow p-4 sm:p-8 lg:w-2/3 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Create a Quest</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2">Quest Title</label>
              <input
                  type="text"
                  value={questTitle}
                  onChange={(e) => setQuestTitle(e.target.value)}
                  placeholder="Enter your quest title here"
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Research Paper Url</label>
              <input
                  type="text"
                  value={researchPaperUrl}
                  onChange={(e) => setResearchPaperUrl(e.target.value)}
                  placeholder="Enter your research paper URL here"
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2">Protocol Content</label>
              <p className="text-gray-400 mb-2">
                The following is a rich text editor. You can use it to format the content of your protocol. For example,
                you can add headers, lists, and images. You can also add links to external sources.
              </p>
              <textarea
                  value={protocolContent}
                  onChange={(e) => setProtocolContent(e.target.value)}
                  placeholder="Content"
                  rows={6}
                  className="w-full p-3 bg-gray-800 text-gray-300 rounded-lg"
              ></textarea>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Quiz Creation</h2>
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
                          value={answer.content} // 여기서 answer.content를 사용
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
                  <div className="flex items-center space-x-4">
                    {currentQuestion.answers.map((_, index) => (
                        <label key={index} className="flex items-center">
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
          </div>
        </main>

        <aside
            className="w-full lg:w-1/3 p-4 sm:p-8 bg-gray-800 border-t lg:border-l lg:border-t-0 border-gray-700 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6">Quiz Preview</h2>
          <p className="text-gray-400 mb-6">
            This is how your quiz will look to students. You can add as many questions as you`&apos;`,d like.
          </p>
          <div className="space-y-6">
            {questions.map((question: any, index: any) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">{question.question}</h3> {/* 여기서 question.question을 렌더링 */}
                  <ul className="mt-2 space-y-2">
                    {question.answers.map((answer: any, answerIndex: any) => (
                        <li key={answerIndex} className="flex items-center">
                          <span className="text-gray-400 mr-2">{answerIndex + 1}</span>
                          <span
                              className={`flex-grow ${
                                  answerIndex === question.correctAnswer ? "text-white" : "text-gray-400"
                              }`}
                          >
              {answer.content} {/* 여기서 answer.content를 렌더링 */}
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
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
          >
            Submit Quest
          </button>
        </aside>
      </div>
  );
};

export default CreateQuest;
