"use client";
import React, { useState } from "react";
import styles from "./Shorts.module.css";

const Shorts: React.FC = () => {
  const [showComments, setShowComments] = useState(false);

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
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.videoPlaceholder}>Video Content Here</div>
        <div className={styles.actionButtons}>
          <button onClick={handleLike} className={styles.actionButton}>
            Like
          </button>
          <button onClick={handleDislike} className={styles.actionButton}>
            Dislike
          </button>
          <button onClick={handleComment} className={styles.actionButton}>
            Comment
          </button>
          <button onClick={handleShare} className={styles.actionButton}>
            Share
          </button>
        </div>
      </div>
      <div className={styles.scrollButtons}>
        <button onClick={handleScrollUp} className={styles.scrollButton}>
          ⬆️
        </button>
        <button onClick={handleScrollDown} className={styles.scrollButton}>
          ⬇️
        </button>
      </div>
      {showComments && (
        <div className={styles.commentsBox}>
          <h2>Comments</h2>
          {/* 여기에 댓글 목록을 추가하세요 */}
        </div>
      )}
    </div>
  );
};

export default Shorts;
