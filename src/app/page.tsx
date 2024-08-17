"use client";

import React, {useState, useEffect, useRef} from "react";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {useRouter} from "next/navigation";
import useQuestList from "@/hooks/quest/useQuestList";

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
}

const QuestComponent = ({quest, currentQuestion, onDragStart, onDragMove, onDragEnd, onAnswerSelect}: {
  quest: Quest;
  currentQuestion: number;
  onDragStart: any;
  onDragMove: any;
  onDragEnd: any;
  onAnswerSelect: (answer: Answer) => void;
}) => {
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
    if (answer.correctAnswer) {
      alert("정답!")
    } else {
      alert("틀렸습니다.")
    }
    onAnswerSelect(answer);
  };

  return (
      <div
          className="bg-white text-black rounded-lg overflow-hidden w-full h-full"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{touchAction: 'none'}} // Disable browser handling of all panning and zooming gestures
      >
        <div className="bg-gray-300 w-full h-[80%] flex items-center justify-center flex-col p-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{quest.title}</h2>
          <p className="text-lg sm:text-xl mb-4">{quest.content}</p>
          <p className="text-lg sm:text-xl">{quest.questions[currentQuestion].question}</p>
        </div>
        <div className="w-full h-[20%] flex justify-around bg-gray-900 text-white p-2 sm:p-4">
          {quest.questions[currentQuestion].answers.map((answer) => (
              <button
                  key={answer.id}
                  className="hover:text-gray-400 text-sm sm:text-base"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    handleAnswerClick(answer);
                  }}
              >
                {answer.content}
              </button>
          ))}
        </div>
      </div>
  );
};

const MainPage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter();

  const [currentQuest, setCurrentQuest] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({x: 0, y: 0});
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);

  const questList: any = useQuestList();

  useEffect(() => {
    if (questList.length > 0) {
      console.log(questList);
    }
  }, [questList]);

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
      y: e.clientY || e.pageY
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
        setScrollDirection('horizontal');
      } else {
        setScrollDirection('vertical');
      }
    }

    if (scrollDirection === 'horizontal') {
      if (Math.abs(diffX) > 50) {
        handleScroll(diffX > 0 ? "right" : "left");
        setIsDragging(false);
      }
    } else if (scrollDirection === 'vertical') {
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

  const onAnswerSelect = () => {
    console.log("")
  }

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
        <main className="flex-grow overflow-y-auto p-4">
          <div className="quests-container h-full flex items-center justify-center">
            {questList.map((quest: any, questIndex: any) => (
                <div
                    key={quest.id}
                    className="quest-component"
                    style={{
                      transform: `translateY(${(questIndex - currentQuest) * 100}%)`,
                      opacity: questIndex === currentQuest ? 1 : 0,
                      pointerEvents: questIndex === currentQuest ? 'auto' : 'none',
                    }}
                >
                  {quest.questions.map((question:any, questionIndex:any) => (
                      <div
                          key={question.id}
                          className="question-component"
                          style={{
                            transform: `translateX(${(questionIndex - currentQuestion) * 100}%)`,
                            opacity: questionIndex === currentQuestion ? 1 : 0,
                            pointerEvents: questionIndex === currentQuestion ? 'auto' : 'none',
                          }}
                      >
                        <QuestComponent
                            quest={quest}
                            currentQuestion={questionIndex}
                            onDragStart={handleDragStart}
                            onDragMove={handleDragMove}
                            onDragEnd={handleDragEnd}
                            onAnswerSelect={onAnswerSelect}
                        />
                      </div>
                  ))}
                </div>
            ))}
          </div>
        </main>
      </div>
  );
};

export default MainPage;