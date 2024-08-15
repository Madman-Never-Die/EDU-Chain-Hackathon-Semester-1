"use client";

import React, { useState, useEffect, useRef } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const QuestComponent = ({ quest, currentQuestion, onDragStart, onDragMove, onDragEnd }: any) => {
  return (
      <div
          className="bg-white text-black rounded-lg overflow-hidden w-full h-full"
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
      >
        <div className="bg-gray-300 w-full h-[80%] flex items-center justify-center flex-col p-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{quest.title}</h2>
          <p className="text-lg sm:text-xl">{quest.questions[currentQuestion]}</p>
        </div>
        <div className="w-full h-[20%] flex justify-around bg-gray-900 text-white p-2 sm:p-4">
          <button className="hover:text-gray-400 text-sm sm:text-base">Like</button>
          <button className="hover:text-gray-400 text-sm sm:text-base">Dislike</button>
          <button className="hover:text-gray-400 text-sm sm:text-base">Comment</button>
          <button className="hover:text-gray-400 text-sm sm:text-base">Share</button>
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
  const startPosRef = useRef({ x: 0, y: 0 });
  const [lastScrollDirection, setLastScrollDirection] = useState(null);
  const [scrollDirection, setScrollDirection]:any = useState(null);


  const quests = [
    { title: "Quest 1", questions: ["Q1.1", "Q1.2", "Q1.3"] },
    { title: "Quest 2", questions: ["Q2.1", "Q2.2", "Q2.3"] },
    { title: "Quest 3", questions: ["Q3.1", "Q3.2", "Q3.3"] },
    { title: "Quest 4", questions: ["Q4.1", "Q4.2", "Q4.3"] },
    { title: "Quest 5", questions: ["Q5.1", "Q5.2", "Q5.3"] },
  ];

  const handleScroll = (direction:any) => {
    switch (direction) {
      case "up":
        if (currentQuest > 0) {
          setCurrentQuest((prev) => prev - 1);
        }
        break;
      case "down":
        if (currentQuest < quests.length - 1) {
          setCurrentQuest((prev) => prev + 1);
        }
        break;
      case "left":
        if (currentQuestion > 0) {
          setCurrentQuestion((prev) => prev - 1);
        }
        break;
      case "right":
        if (currentQuestion < quests[currentQuest].questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        }
        break;
      default:
        break;
    }
    setScrollDirection(null);
  };

  const handleDragStart = (e:any) => {
    setIsDragging(true);
    startPosRef.current = {
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY
    };
    setScrollDirection(null);
  };

  const handleDragMove = (e:any) => {
    if (!isDragging) return;

    const currentX = e.clientX || e.touches[0].clientX;
    const currentY = e.clientY || e.touches[0].clientY;
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

  useEffect(() => {
    const handleAccountsChanged = (accounts: unknown[]) => {
      const accountArray = accounts as string[];

      if (accountArray.length === 0) {
        setAccount(null);
        localStorage.removeItem("account");
      } else {
        setAccount(accountArray[0]);
        localStorage.setItem("account", accountArray[0]);
      }
    };

    const savedAccount = localStorage.getItem("account");
    if (savedAccount) {
      setAccount(savedAccount);
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccountsChanged(accounts as string[]);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
            "accountsChanged",
            (accounts: unknown[]) => {
              handleAccountsChanged(accounts);
            }
        );
      }
    };
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          console.log("Connected account:", accounts[0]);
        } else {
          console.error("Failed to retrieve accounts.");
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.error("MetaMask is not installed.");
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
    const { name, value } = event.target;
    setPriceRange((prev) => {
      if (name === "min") {
        return [Number(value), prev[1]];
      } else {
        return [prev[0], Number(value)];
      }
    });
  };

  const handleLike = () => {
    console.log("Liked");
  };

  const handleDislike = () => {
    console.log("Disliked");
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    console.log("Share");
  };

  const handleScrollUp = () => {
    console.log("Scroll Up");
  };

  const handleScrollDown = () => {
    console.log("Scroll Down");
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
        <header className="p-4 sm:p-6 border-b border-gray-700 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 mr-6" />
            <nav className="space-x-4">
              <a
                  onClick={() => handleNavigation("/hacksLiquid")}
                  href="#"
                  className="hover:text-gray-300"
              >
                HacksLiquid
              </a>
              <a
                  onClick={() => handleNavigation("/community")}
                  href="#"
                  className="hover:text-gray-300"
              >
                Community
              </a>
              <a
                  onClick={() => handleNavigation("/contact")}
                  href="#"
                  className="hover:text-gray-300"
              >
                Contact
              </a>
            </nav>
          </div>
          <div>
            {account ? (
                <span>Connected: {account}</span>
            ) : (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
            )}
          </div>
        </header>

        <div className="flex flex-col sm:flex-row flex-grow">
          {/* Sidebar */}
          <aside className="w-full sm:w-64 p-4 sm:p-6 bg-gray-800 border-b sm:border-b-0 sm:border-r border-gray-700">
          <div className="mb-4">
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
          <main className="flex-grow flex justify-center items-center overflow-hidden p-4">
            <div className="quests-container">
              {quests.map((quest, questIndex) => (
                  <div
                      key={questIndex}
                      className="quest-component"
                      style={{
                        transform: `translateY(${(questIndex - currentQuest) * 100}%)`,
                        opacity: questIndex === currentQuest ? 1 : 0,
                        pointerEvents: questIndex === currentQuest ? 'auto' : 'none',
                      }}
                  >
                    {quest.questions.map((question, questionIndex) => (
                        <div
                            key={questionIndex}
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
                          />
                        </div>
                    ))}
                  </div>
              ))}
            </div>
          </main>
        </div>
      </div>
  );
};

export default MainPage;
