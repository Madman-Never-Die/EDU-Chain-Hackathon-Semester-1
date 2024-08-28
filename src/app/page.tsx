"use client";

import React, {useState, useEffect, useRef} from "react";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {useRouter} from "next/navigation";
import useQuestList from "@/hooks/quest/useQuestList";
import {useRecoilState, useRecoilValue} from "recoil";
import {accountState} from "@/recoil/account";
import {roleState} from "@/recoil/role";
import QuestComponent from "@/components/QuestComponent";
import {BrowserProvider, Contract} from 'ethers';
import EduchainQuizAbi from '../EduchainQuiz.json' assert {type: "json"};
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

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
  selectedAnswers: any
}

const EduchainQuizAddress: any = process.env.NEXT_PUBLIC_QUIZ_SUBMIT_ADDRESS

const MainPage = () => {
  const [account, setAccount]: any = useRecoilState(accountState);
  const [role, setRole] = useRecoilState(roleState);

  const router = useRouter();

  const [currentQuest, setCurrentQuest] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({x: 0, y: 0});
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const {questList, setQuestList, isLoading, error, fetchQuestList, updateQuestParticipation}: any = useQuestList();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questId: number]: { [questionId: number]: Answer } }>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragOffset, setDragOffset] = useState({x: 0, y: 0});



  const isFirstQuestion = currentQuestion === 0;
  const [isLastQuestion, setIsLastQuestion] = useState(false)

  const handleQuestComplete = async (questId: number, isLiked: boolean) => {
    try {
      // 컨트랙트 콜
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract: any = new Contract(EduchainQuizAddress, EduchainQuizAbi, signer);

          const address = await signer.getAddress();
          console.log("address : ", address);
          console.log(selectedAnswers)

          let correctAnswers: number = 0
          // 바깥쪽 객체를 순회
          for (const key in selectedAnswers) {
            if (selectedAnswers.hasOwnProperty(key)) {
              const innerObj = selectedAnswers[key];

              // 안쪽 객체를 순회
              for (const innerKey in innerObj) {
                if (innerObj.hasOwnProperty(innerKey)) {
                  const item = innerObj[innerKey];

                  // correctAnswer가 true인지 확인하고 카운트 증가
                  if (item.correctAnswer === true) {
                    correctAnswers++;
                  }
                }
              }
            }
          }


          let hasCompletedQuiz: boolean = true

          const submitResult = await contract.submitQuizResult(questId, correctAnswers, hasCompletedQuiz, isLiked)
          console.log("submitResult : ", submitResult)

          const infoResult = await contract.getUserInfo(address)
          console.log("infoResult : ", infoResult)


        } catch (error) {
          console.error("Failed to retrieve user info:", error);
        }
      } else {
        console.error("Ethereum object not found");
      }
    } catch (error) {
      console.error("Failed to update quest participation:", error);
    }
  };

  const handleScroll = (direction: string) => {
    switch (direction) {
      case "up":
        if (currentQuest > 0) {
          setCurrentQuest((prev) => prev - 1);
          setCurrentQuestion(0);
        }
        break;
      case "down":
        if (currentQuest < questList.length - 1) {
          setCurrentQuest((prev) => prev + 1);
          setCurrentQuestion(0);
        }
        break;
      case "left":
        if (currentQuestion > 0) {
          setCurrentQuestion((prev) => prev - 1);
        }
        break;
      case "right":
        if (currentQuestion < questList[currentQuest].questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        }
        break;
      default:
        break;
    }
    setScrollDirection(null);
  };

  const handleDragStart = (e: MouseEvent | Touch) => {
    setIsDragging(true);
    startPosRef.current = {
      x: e.clientX || e.pageX,
      y: e.clientY || e.pageY,
    };
    setScrollDirection(null);
  };

  const handleDragMove = (e: MouseEvent | Touch) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.pageX;
    const currentY = e.clientY || e.pageY;
    const diffX = startPosRef.current.x - currentX;
    const diffY = startPosRef.current.y - currentY;

    if (scrollDirection === null) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setScrollDirection("horizontal");
      } else {
        setScrollDirection("vertical");
      }
    }

    if (scrollDirection === "horizontal") {
      if (Math.abs(diffX) > 50) {
        handleScroll(diffX > 0 ? "right" : "left");
        setIsDragging(false);
      }
    } else if (scrollDirection === "vertical") {
      if (Math.abs(diffY) > 50) {
        handleScroll(diffY > 0 ? "down" : "up");
        setIsDragging(false);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setScrollDirection(null);
  };
  const handleVerticalDrag = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentQuest > 0) {
      setCurrentQuest(prev => prev - 1);
      setCurrentQuestion(0);
    } else if (direction === 'down' && currentQuest < questList.length - 1) {
      setCurrentQuest(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  const handleNavigation = (url: string) => {
    const protectedRoutes = ["/hacksLiquid", "/community"];
    if (protectedRoutes.includes(url) && !account) {
      alert("Please connect your wallet before accessing this page.");
      return;
    }
    router.push(url);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showComments, setShowComments] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
        prev.includes(category)
            ? prev.filter((c) => c !== category)
            : [...prev, category]
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setPriceRange((prev) => {
      if (name === "min") {
        return [Number(value), prev[1]];
      } else {
        return [prev[0], Number(value)];
      }
    });
  };

  const onAnswerSelect = (questId: number, questionId: number, answer: Answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questId]: {
        ...prev[questId],
        [questionId]: answer
      }
    }));
  };

  const onNavigateQuestion = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (direction === 'next' && currentQuestion < questList[currentQuest].questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  const QuestInfoBox = ({ title, content }: any) => (
      <div className="bg-gray-300 w-full max-w-2xl mx-auto my-4 p-6 rounded-lg shadow-md" style={{width: "448px"}}>
        <h2 className="text-xl font-bold text-left mb-2 text-black">title : {title}</h2>
        <p className="text-left text-black">content : {content}</p>
      </div>
  );

  const navigateQuestion = (direction: 'prev' | 'next') => {
    if (isAnimating) return;

    setIsAnimating(true);
    const targetOffset = direction === 'prev' ? window.innerWidth : -window.innerWidth;
    setDragOffset({x: targetOffset, y: 0});

    setTimeout(() => {
      onNavigateQuestion(direction);
      setDragOffset({x: 0, y: 0});
      setIsAnimating(false);
    }, 300);
  };
  return (
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex justify-center">
          {questList.length > 0 && (
              <div>
                <span style={{color: "white", fontSize: "32px", zIndex: 99999999999}}>{currentQuestion + 1} / {questList[currentQuest].questions.length}</span>
              </div>
          )}
        </div>
        <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-start">
          <QuestInfoBox
              title={questList[currentQuest]?.title}
              content={questList[currentQuest]?.content}
          />

          <div className="flex items-center justify-center w-full">
            <button
                onClick={() => navigateQuestion('prev')}
                className={`${isFirstQuestion ? 'text-black cursor-not-allowed' : 'text-white cursor-pointer'}`}
                disabled={isFirstQuestion || isAnimating}
                style={{fontSize: "64px"}}
            >
              <MdArrowBackIos/>
            </button>

            <div className="quests-container h-full flex items-center justify-center">
              {questList.map((quest: Quest, questIndex: number) => (
                  <div
                      key={quest.id}
                      className="quest-component"
                      style={{
                        transform: `translateY(${(questIndex - currentQuest) * 100}%)`,
                        opacity: questIndex === currentQuest ? 1 : 0,
                        pointerEvents: questIndex === currentQuest ? 'auto' : 'none',
                        borderRadius:"16px"
                      }}
                  >
                    <QuestComponent
                        quest={quest}
                        currentQuestion={currentQuestion}
                        selectedAnswers={selectedAnswers[quest.id] || {}}
                        onAnswerSelect={
                          (answer, questionIndex) => onAnswerSelect(quest.id, quest.questions[questionIndex].id, answer)
                        }
                        onQuestComplete={handleQuestComplete}
                        onNavigateQuestion={onNavigateQuestion}
                        userWalletAddress={account}
                        onVerticalDrag={handleVerticalDrag}
                        currentQuest={currentQuest}
                        questList={questList}
                        setQuestList={setQuestList}
                        navigateQuestion={navigateQuestion}
                        dragOffset={dragOffset}
                        setDragOffset={setDragOffset}
                        isLastQuestion={isLastQuestion}
                        setIsLastQuestion={setIsLastQuestion}
                    />
                  </div>
              ))}
            </div>

            <button
                onClick={() => navigateQuestion('next')}
                className={`${isLastQuestion ? 'text-black cursor-not-allowed' : 'text-white cursor-pointer'}`}
                disabled={isLastQuestion || isAnimating}
                style={{fontSize: "64px"}}
            >
              <MdArrowForwardIos/>
            </button>
          </div>
        </main>
      </div>
  );
};

export default MainPage;
