import React, {useState, useEffect, useRef} from 'react';
import {BrowserProvider, Contract} from 'ethers';
import EduchainQuizAbi from '../EduchainQuiz.json' assert {type: "json"};
import QuestProviderAbi from '../QuestProvider.json' assert {type: "json"};
import {any} from "prop-types";


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
  userWalletAddress?: string;
}

const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path
          d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
    </svg>
);

const ThumbsDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path
          d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const MessageSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
);
const EduchainQuizAddress: any = process.env.NEXT_PUBLIC_QUIZ_SUBMIT_ADDRESS
const QuestProviderAddress: any = process.env.NEXT_PUBLIC_QUEST_PROVIDER_ADDRESS

const QuestComponent = ({
                          quest,
                          currentQuestion,
                          selectedAnswers,
                          onAnswerSelect,
                          onQuestComplete,
                          onNavigateQuestion,
                          onVerticalDrag,
                          userWalletAddress,
                          currentQuest,
                          questList,
                          setQuestList,
                          navigateQuestion,
                          dragOffset,
                          setDragOffset,
                          isLastQuestion,
                          setIsLastQuestion
                        }: {
  quest: any;
  currentQuestion: number;
  selectedAnswers: { [questionId: number]: Answer };
  onAnswerSelect: (answer: Answer, questionIndex: number) => void;
  onQuestComplete: (questId: number, isLiked: boolean) => void;
  onNavigateQuestion: (direction: 'prev' | 'next') => void;
  onVerticalDrag: (direction: 'up' | 'down') => void;
  userWalletAddress: string;
  currentQuest: any;
  questList: any;
  setQuestList: any;
  navigateQuestion: any;
  dragOffset: any;
  setDragOffset: any;
  isLastQuestion: any;
  setIsLastQuestion: any;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({x: 0, y: 0});

  useEffect(() => {
    if (quest) {
      console.log(quest)

      // fetchLikeDislikeStatus();
      // incrementViewCount();
    }
  }, [quest?.id]);

  async function deleteQuest(questId: number) {
    try {
      const response = await fetch(`/api/quests/${questId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
          // 필요한 경우 인증 헤더 추가
          // 'Authorization': `Bearer ${your_token_here}`
        },
      });

      if (response.ok) {
        // 삭제 성공
        console.log('Quest deleted successfully');
        // 여기에 성공 후 수행할 작업 추가 (예: 상태 업데이트, 사용자에게 알림 등)
        return true;
      } else {
        // 서버에서 오류 응답을 받은 경우
        const errorData = await response.json();
        console.error('Failed to delete quest:', errorData);
        // 오류 처리 로직 추가
        return false;
      }
    } catch (error) {
      // 네트워크 오류 등의 예외 처리
      console.error('Error deleting quest:', error);
      // 오류 처리 로직 추가
      return false;
    }
  }

  const getStatsContact = async () => {
    try {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();

          const contract: any = new Contract(EduchainQuizAddress, EduchainQuizAbi, signer);
          // console.log("contract : ", contract)
          const questProviderContract: any = new Contract(QuestProviderAddress, QuestProviderAbi, signer);
          // console.log("questProviderContract : ", questProviderContract)

          const result = await questProviderContract.getQuestSubmissionInfo(quest.id, quest.provider)
          // console.log("result : ", result)

          const isVerification = result[2]

          if (!isVerification) {
            const deleteResult: any = await deleteQuest(quest.id);
            if (deleteResult) {
              const newQuestList = questList.filter((q: any) => q.id !== quest.id);
              setQuestList([...newQuestList])
            } else {
              // 삭제 실패 시 수행할 작업
              // 예: 사용자에게 오류 메시지 표시
            }
          }

          const infoResult = await contract.getQuestStats(quest.id)
          // console.log("infoResult : ", infoResult)

          const userResult = await contract.getUserInfo(userWalletAddress)
          // console.log("userResult : ", userResult)

          const totalViews = Number(quest.participation)
          const totalLikes = Number(quest.likes)
          setViews(totalViews)
          setLikes(totalLikes)
        } catch (e: any) {
          console.error(e)
          console.error(e.message)
        }
      }
    } catch (e: any) {
      console.error(e)
      console.error(e.message)
    }
  }


  useEffect(() => {
    getStatsContact()
  }, [currentQuest]);

  useEffect(() => {
    if (quest && quest.questions) {
      const isLast = currentQuestion === quest.questions.length - 1;
      console.log("Is last question:", isLast);
      console.log("Current question index:", currentQuestion);
      console.log("Total questions:", quest.questions.length);
      setIsLastQuestion(isLast);
    }
  }, [currentQuestion, quest]);

  const fetchLikeDislikeStatus = async () => {
    if (!quest) return;
    try {
      const response = await fetch(`/api/quests/${quest.id}/like-status?userWalletAddress=${userWalletAddress}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setIsLiked(data.isLiked);
        setIsDisliked(data.isDisliked);
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    } catch (error) {
      console.error('Failed to fetch like/dislike status:', error);
    }
  };

  const incrementViewCount = async () => {
    if (!quest) return;
    try {
      const response = await fetch(`/api/quests/${quest.id}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userWalletAddress}),
      });
      if (response.ok) {
        const data = await response.json();
        setViews(data.views);
      }
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  };

  const handleLike = async () => {
    if (!quest) return;
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes(prev => newLikedState ? prev + 1 : Math.max(prev - 1, 0));
  };

  const handleDislike = async () => {
    if (!quest) return;
    const newDislikedState = !isDisliked;
    setIsDisliked(newDislikedState);
    setDislikes(prev => newDislikedState ? prev + 1 : Math.max(prev - 1, 0));

    try {
      await fetch(`/api/quests/${quest.id}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userWalletAddress, isDisliked: newDislikedState}),
      });
    } catch (error) {
      console.error('Failed to update dislike status:', error);
    }
  };


  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = {x: clientX, y: clientY};
  };

  const handleDrag = (clientX: number, clientY: number) => {
    if (isDragging) {
      const offsetX = clientX - dragStartRef.current.x;
      const offsetY = clientY - dragStartRef.current.y;

      if (Math.abs(offsetY) > Math.abs(offsetX)) {
        // 상하 드래그
        if (Math.abs(offsetY) > window.innerHeight * 0.1) {
          onVerticalDrag(offsetY > 0 ? 'up' : 'down');
          setIsDragging(false);
        }
      } else {
        // 좌우 드래그 (기존 로직)
        setDragOffset({x: offsetX, y: 0});
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = window.innerWidth * 0.1;
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        navigateQuestion('prev');
      } else {
        navigateQuestion('next');
      }
    } else {
      setDragOffset({x: 0, y: 0});
    }
  };


  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDrag(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const handleAnswerClick = (answer: Answer) => {
    onAnswerSelect(answer, currentQuestion);
  };

  const handleSubmit = async () => {
    if (quest) {
      try {
        quest.userWalletAddress = userWalletAddress;
        quest.selectedAnswers = selectedAnswers;
        quest.isLiked = isLiked

        const response = await fetch('/api/quests/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quest),
        });

        if (!response.ok) {
          throw new Error('Failed to submit quest');
        }

        const data = await response.json();
        console.log('Quest submission response:', data);

        onQuestComplete(quest.id, isLiked);
        alert('Quest completed successfully!');
      } catch (error) {
        console.error('Failed to submit quest:', error);
        alert('Failed to submit quest. Please try again.');
      }
    }
  };

  const handleShare = () => {
    alert("공유 링크가 클립보드에 복사되었습니다!");
  };

  if (!quest) {
    return <div className="text-center p-4">Loading quest data...</div>;
  }

  const allQuestionsAnswered = quest.questions.every((q: any) => selectedAnswers[q.id] !== undefined);


  return (
      <div
          ref={containerRef}
          className="bg-white text-black rounded-lg overflow-hidden w-full h-full flex flex-col relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: 'none',
            transform: `translateX(${dragOffset.x}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
      >
        <div className="bg-gray-300 flex-grow flex items-center justify-center flex-col p-4">
          {/*<h2 className="text-xl sm:text-2xl font-bold mb-4">{quest.title}</h2>*/}
          {/*<p className="text-lg sm:text-xl mb-4">{quest.content}</p>*/}
          {quest.questions[currentQuestion] && (
              <p className="text-lg sm:text-xl">{quest.questions[currentQuestion].question}</p>
          )}
        </div>
        <div className="flex justify-between items-center text-sm p-2 bg-gray-100">
          <div className="flex space-x-4">
            <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <ThumbsUpIcon/>
              <span style={{fontSize: "18px"}}>{likes}</span>
            </button>
            <button
                onClick={handleDislike}
                className={`flex items-center space-x-1 ${isDisliked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <ThumbsDownIcon/>
              <span style={{fontSize: "18px"}}>{dislikes}</span>
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <EyeIcon/>
              <span style={{fontSize: "18px"}}>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquareIcon/>
              <span style={{fontSize: "18px"}}>{comments}</span>
            </div>
            <button onClick={handleShare}>
              <ShareIcon/>
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-900 text-white p-2 sm:p-4 flex flex-col">
          {quest.questions[currentQuestion]?.answers.map((answer: any) => (
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

      </div>
  );
};

export default QuestComponent;