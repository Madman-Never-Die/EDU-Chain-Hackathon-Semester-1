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
import EduchainQuizTrackerAbi from '../EduchainQuizTracker.json' assert {type: "json"};
import {info} from "autoprefixer";


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

const EduchainQuizAddress:any = process.env.NEXT_PUBLIC_QUIZ_SUBMIT_ADDRESS
const EduchainQuizTrackerAddress: any = process.env.NEXT_PUBLIC_QUIZ_TRACKER


const MainPage = () => {
  const [account, setAccount]: any = useRecoilState(accountState);
  const [role, setRole] = useRecoilState(roleState);

  const router = useRouter();

  const [currentQuest, setCurrentQuest] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({x: 0, y: 0});
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const {questList, isLoading, error, fetchQuestList, updateQuestParticipation}: any = useQuestList();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questId: number]: { [questionId: number]: Answer } }>({});


  useEffect(() => {
    const contractTest = async () => {

      try{
        if (window.ethereum) {
          try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract: any = new Contract(EduchainQuizTrackerAddress, EduchainQuizTrackerAbi, signer);

            const infoResult = await contract.getStats()
            console.log("#", infoResult)
          }catch(e){
          }
        }
      }catch(e){
        console.error(e)
      }


    }

    contractTest()
  }, []);


  const handleQuestComplete = async (questId: number, isLiked: boolean) => {
    try {
      // 컨트랙트 콜
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract: any = new Contract(EduchainQuizAddress, EduchainQuizAbi, signer);

          const address = await signer.getAddress();
          console.log(address);
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


          console.log(correctAnswers)
          let hasCompletedQuiz: boolean = true

          const submitResult = await contract.submitQuizResult(correctAnswers, hasCompletedQuiz, isLiked)
          console.log(submitResult)

          const infoResult = await contract.getUserInfo(address)
          console.log(infoResult)

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

  return (
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <div className="p-4">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 bg-gray-900 text-gray-200 rounded-md"
            />
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Categories</h3>
            <label className="block mb-2">
              <input
                  type="checkbox"
                  value="Category1"
                  checked={selectedCategories.includes("Category1")}
                  onChange={() => handleCategoryChange("Category1")}
              />
              <span className="ml-2">Category1</span>
            </label>
            <label className="block mb-2">
              <input
                  type="checkbox"
                  value="Category2"
                  checked={selectedCategories.includes("Category2")}
                  onChange={() => handleCategoryChange("Category2")}
              />
              <span className="ml-2">Category2</span>
            </label>
            <label className="block mb-2">
              <input
                  type="checkbox"
                  value="Category3"
                  checked={selectedCategories.includes("Category3")}
                  onChange={() => handleCategoryChange("Category3")}
              />
              <span className="ml-2">Category3</span>
            </label>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <label className="block mb-2">
              Min:
              <input
                  type="number"
                  name="min"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-full p-2 bg-gray-900 text-gray-200 rounded-md"
              />
            </label>
            <label className="block mb-2">
              Max:
              <input
                  type="number"
                  name="max"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full p-2 bg-gray-900 text-gray-200 rounded-md"
              />
            </label>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow overflow-y-auto p-4 flex items-center justify-center">
          <div className="quests-container h-full flex items-center justify-center">
            {questList.map((quest: Quest, questIndex: number) => (
                <div
                    key={quest.id}
                    className="quest-component"
                    style={{
                      transform: `translateY(${(questIndex - currentQuest) * 100}%)`,
                      opacity: questIndex === currentQuest ? 1 : 0,
                      pointerEvents: questIndex === currentQuest ? 'auto' : 'none',
                    }}
                >
                  <QuestComponent
                      quest={quest}
                      currentQuestion={currentQuestion}
                      selectedAnswers={selectedAnswers[quest.id] || {}}
                      // onDragStart={handleDragStart}
                      // onDragMove={handleDragMove}
                      // onDragEnd={handleDragEnd}
                      onAnswerSelect={
                        (answer, questionIndex) => onAnswerSelect(quest.id, quest.questions[questionIndex].id, answer)
                      }
                      onQuestComplete={handleQuestComplete}
                      onNavigateQuestion={onNavigateQuestion}
                      userWalletAddress={account} // 여기에 사용자의 지갑 주소를 전달
                      onVerticalDrag={handleVerticalDrag}

                  />
                </div>
            ))}
          </div>
        </main>
      </div>
  );
};

export default MainPage;
