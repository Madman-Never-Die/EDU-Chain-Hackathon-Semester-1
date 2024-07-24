"use client";
import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const handleConnectWallet = () => {
    // 메타마스크 지갑 연결 로직을 여기에 작성합니다
    console.log("메타마스크 지갑 연결");
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <nav className={styles.nav}>
          s<a href="hacksLiquid">HacksLiquid</a>
          <a href="community">Community</a>
          <a href="contact">Contact</a>
        </nav>
      </div>
      <div className={styles.right}>
        <button className={styles.walletButton} onClick={handleConnectWallet}>
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
