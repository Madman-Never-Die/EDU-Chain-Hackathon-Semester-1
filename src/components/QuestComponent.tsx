import React, { useState, useEffect } from 'react';

interface Answer {
  id: number;
  content: string;
  correctAnswer: boolean;
}

interface Question {
  id: number;
  question: string;
  correctAnswer: number;
  answers: Answer[];
}

interface Quest {
  id: number;
  title: string;
  content: string;
  type: string;
  liquidityProvider: string;
  provider: string;
  createdAt: string;
  modifiedAt: string;
  questions: Question[];
}

const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
);

const ThumbsDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const MessageSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);

const QuestComponent = ({
                          quest,
                          currentQuestion,
                          selectedAnswers,
                          onDragStart,
                          onDragMove,
                          onDragEnd,
                          onAnswerSelect,
                          onQuestComplete,
                          onNavigateQuestion
                        }: {
  quest: Quest | null;
  currentQuestion: number;
  selectedAnswers: {[questionId: number]: Answer};
  onDragStart: any;
  onDragMove: any;
  onDragEnd: any;
  onAnswerSelect: (answer: Answer, questionIndex: number) => void;
  onQuestComplete: (questId: number) => void;
  onNavigateQuestion: (direction: 'prev' | 'next') => void;
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);

  const allQuestionsAnswered = quest?.questions.every(q => selectedAnswers[q.id] !== undefined) ?? false;

  const handleTouchStart = (e: React.TouchEvent) => {
    onDragStart(e.touches[0]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    onDragMove(e.touches[0]);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    onDragEnd(e);
  };

  const handleAnswerClick = (answer: Answer) => {
    onAnswerSelect(answer, currentQuestion);
  };

  const handleSubmit = () => {
    if (quest) {
      onQuestComplete(quest.id);
    }
  };

  const handleLike = () => setLikes(prev => prev + 1);
  const handleDislike = () => setDislikes(prev => prev + 1);
  const handleShare = () => {
    alert("공유 링크가 클립보드에 복사되었습니다!");
  };

  if (!quest) {
    return <div className="text-center p-4">Loading quest data...</div>;
  }

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === quest.questions.length - 1;

  return (
      <div
          className="bg-white text-black rounded-lg overflow-hidden w-full h-full flex flex-col relative"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{touchAction: 'none'}}
      >
        <div className="bg-gray-200 p-2 text-center">
          <span>{currentQuestion + 1} / {quest.questions.length}</span>
        </div>
        <div className="bg-gray-300 flex-grow flex items-center justify-center flex-col p-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{quest.title}</h2>
          <p className="text-lg sm:text-xl mb-4">{quest.content}</p>
          {quest.questions[currentQuestion] && (
              <p className="text-lg sm:text-xl">{quest.questions[currentQuestion].question}</p>
          )}
        </div>
        <div className="flex justify-between items-center text-sm p-2 bg-gray-100">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1">
              <ThumbsUpIcon />
              <span>{likes}</span>
            </button>
            <button onClick={handleDislike} className="flex items-center space-x-1">
              <ThumbsDownIcon />
              <span>{dislikes}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <EyeIcon />
              <span>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquareIcon />
              <span>{comments}</span>
            </div>
            <button onClick={handleShare}>
              <ShareIcon />
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-900 text-white p-2 sm:p-4 flex flex-col">
          {quest.questions[currentQuestion]?.answers.map((answer) => (
              <button
                  key={answer.id}
                  className={`px-4 py-2 rounded transition-colors duration-200 ease-in-out mb-2
              ${selectedAnswers[quest.questions[currentQuestion].id]?.id === answer.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnswerClick(answer);
                  }}
              >
                {answer.content}
              </button>
          ))}
          {allQuestionsAnswered && isLastQuestion && (
              <button
                  onClick={handleSubmit}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200 ease-in-out"
              >
                Submit
              </button>
          )}
        </div>
        <button
            onClick={() => onNavigateQuestion('prev')}
            className={`absolute top-1/2 transform -translate-y-1/2 ${isFirstQuestion ? 'text-gray-400 cursor-not-allowed' : 'text-black cursor-pointer'}`}
            disabled={isFirstQuestion}
        >
          &lt;
        </button>
        <button
            onClick={() => onNavigateQuestion('next')}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isLastQuestion ? 'text-gray-400 cursor-not-allowed' : 'text-black cursor-pointer'}`}
            disabled={isLastQuestion}
        >
          &gt;
        </button>
      </div>
  );
};

export default QuestComponent;