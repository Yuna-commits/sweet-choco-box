import "./App.css";
import { messages } from "./data/messages";
import { useState } from "react";
import { useConfetti } from "./hooks/useConfetti";

function App() {
  // enum [closing: 닫히는 중 -> closed: 봉투 닫힘 -> opening: 열리는 중 -> opened: 봉투 열림]
  const [envelopState, setEnvelopState] = useState("closed");
  const [currentMessage, setCurrentMessage] = useState("");

  const { fireConfetti } = useConfetti();

  // 봉투 열기
  const handleOpenEnvelope = () => {
    // 봉투가 닫혀있을 때만 작동
    if (envelopState !== "closed") return;

    // 1. 열리는 중 상태로 변경
    setEnvelopState("opening");

    // 랜덤 메시지 준비
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);

    // 2. 0.6초 뒤, 덮개가 완전히 열린 후 카드 표시
    setTimeout(() => {
      setEnvelopState("opened");
      /* 텍스트가 나타나는 타이밍에 맞춰 폭죽 효과 */
      setTimeout(() => {
        fireConfetti();
      }, 600);
    }, 600);
  };

  // 봉투 닫기 (초기화)
  const handleReset = () => {
    // 메시지 카드 터치 시 카드를 먼저 넣음
    if (envelopState === "opened") {
      setEnvelopState("closing");

      // 카드가 완전히 들어간 후 덮개 닫기
      setTimeout(() => {
        setEnvelopState("closed");
        setCurrentMessage("");
      }, 800);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Happy Valentine's Day 💝</h1>
      <p className="subtitle">편지 봉투를 터치해 열어보세요!</p>

      {/* 카드 렌더링 영역 */}
      <div className="card-area">
        {/* 봉투 상태에 따라 클래스명이 동적으로 바뀜 */}
        <div
          className={`envelope-wrapper ${envelopState}`}
          onClick={envelopState === "closed" ? handleOpenEnvelope : handleReset}
        >
          {/* 1. 봉투 뒷면 */}
          <div className="envelope-back"></div>

          {/* 2. 편지 카드 */}
          <div className="letter-card">
            <p className="message-text">{currentMessage}</p>
            <p className="helper-text">(터치하면 다시 닫혀요)</p>
          </div>

          {/* 3. 봉투 앞면 */}
          <div className="envelope-front"></div>

          {/* 봉투 덮개 */}
          <div className="envelope-flap"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
