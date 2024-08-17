"use client";
import React, {useState, useEffect} from "react";
import {MetaMaskInpageProvider} from "@metamask/providers";
import styles from "./Header.module.css";
import {useRouter} from "next/navigation";
import Image from "next/image";

// window.ethereum을 MetaMaskInpageProvider 타입으로 정의
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const Header: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter(); // useRouter 훅을 클라이언트 사이드에서 직접 사용

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

  return (
      <header className="p-4 sm:p-6 border-b border-gray-700 flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="h-10 mr-6 cursor-pointer" onClick={() => handleNavigation("/")}/>
          <nav className="space-x-4">
            <a
                onClick={() => handleNavigation("/quest/provider")}
                href="#"
                className="hover:text-gray-300"
            >
              QuestProvider
            </a>
            <a
                onClick={() => handleNavigation("/protocol/provider")}
                href="#"
                className="hover:text-gray-300"
            >
              ProtocolProvider
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

  );
};

export default Header;

