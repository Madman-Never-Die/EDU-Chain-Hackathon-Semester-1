"use client";
import React, { useState, useEffect } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

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
      const accountArray = accounts as string[]; // 타입 단언

      if (accountArray.length === 0) {
        // MetaMask에서 계정이 제거되면 로그아웃 처리
        setAccount(null);
        localStorage.removeItem("account");
      } else {
        // MetaMask에서 계정이 변경되면 상태 업데이트
        setAccount(accountArray[0]);
        localStorage.setItem("account", accountArray[0]);
      }
    };

    // 초기 로드 시 localStorage에서 계정 정보 가져오기
    const savedAccount = localStorage.getItem("account");
    if (savedAccount) {
      setAccount(savedAccount);
    }

    // MetaMask 이벤트 리스너 설정
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: unknown[]) => {
        handleAccountsChanged(accounts);
      });
    }

    // 클린업: 컴포넌트 언마운트 시 이벤트 리스너 제거
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
          localStorage.setItem("account", accounts[0]); // 계정을 localStorage에 저장
          console.log("연결된 계정:", accounts[0]);
        } else {
          console.error("계정을 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("지갑 연결 실패:", error);
      }
    } else {
      console.error("MetaMask가 설치되어 있지 않습니다.");
    }
  };

  const handleNavigation = (url: string) => {
    const protectedRoutes = ["/hacksLiquid", "/community"]; // 보호할 경로 목록
    if (protectedRoutes.includes(url) && !account) {
      alert("지갑에 연결되어 있지 않습니다. 지갑을 연결한 후에 이동해 주세요.");
      return; // 연결되지 않은 경우 이동을 막습니다.
    }
    router.push(url); // 계정이 연결된 경우만 페이지 이동
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <nav className={styles.nav}>
          <a onClick={() => handleNavigation("/hacksLiquid")} href="#">
            HacksLiquid
          </a>
          <a onClick={() => handleNavigation("/community")} href="#">
            Community
          </a>
          <a onClick={() => handleNavigation("/contact")} href="#">
            Contact
          </a>
        </nav>
      </div>
      <div className={styles.right}>
        {account ? (
          <span className={styles.accountInfo}>Connected: {account}</span>
        ) : (
          <button className={styles.walletButton} onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
