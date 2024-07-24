import React from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/SideBar/SideBar";
import Shorts from "../components/Shorts/Shorts";
import styles from "./page.module.css";

const MainPage = () => {
  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <Sidebar />
        <div className={styles.contentArea}>
          <Shorts />
        </div>
      </div>
      <div>hello</div>
    </>
  );
};

export default MainPage;
