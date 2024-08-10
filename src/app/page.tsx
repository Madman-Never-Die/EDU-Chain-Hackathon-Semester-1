"use client";

import React, { useState, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const MainPage = () => {
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter();

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
      window.ethereum.on("accountsChanged", (accounts: unknown[]) => {
        handleAccountsChanged(accounts);
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
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
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

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 p-6 bg-gray-800 border-r border-gray-700">
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
        <main className="flex-grow flex justify-center items-center">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-center items-center bg-white text-black rounded-lg overflow-hidden w-[28rem] h-[48rem]">
              <div className="bg-gray-300 w-full h-[38rem] flex items-center justify-center">
                Video Content Here
              </div>
              <div className="w-full flex justify-around bg-gray-900 text-white p-4">
                <button onClick={handleLike} className="hover:text-gray-400">
                  Like
                </button>
                <button onClick={handleDislike} className="hover:text-gray-400">
                  Dislike
                </button>
                <button onClick={handleComment} className="hover:text-gray-400">
                  Comment
                </button>
                <button onClick={handleShare} className="hover:text-gray-400">
                  Share
                </button>
              </div>
            </div>

            {showComments && (
              <div className="bg-gray-700 text-white mt-4 md:mt-0 md:ml-4 p-4 rounded-lg w-[22rem] h-[48rem]">
                <h2 className="text-xl mb-4">Comments</h2>
                {/* Add comment list here */}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
