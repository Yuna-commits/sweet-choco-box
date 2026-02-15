import { messages } from "./data/messages";
import "./App.css";
import { useState } from "react";
import { useConfetti } from "./hooks/useConfetti";

function App() {
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isShake, setIsShake] = useState(false);

  const { fireConfetti } = useConfetti();

  // 초콜릿 클릭 시 실행될 이벤트 핸들러
  const handleOpenChocolate = () => {
    // 1. 이미 메시지가 열려있으면 초기화 (토글)
    if (currentMessage) {
      setCurrentMessage(null);
      return;
    }

    // 2. 초콜릿 흔들기 애니메이션 ON
    setIsShake(true);

    // 0.5초 뒤에 흔들기 상태를 다시 OFF로 변경
    setTimeout(() => setIsShake(false), 500);

    // 3. 메시지 배열에서 랜덤 인덱스 추출
    const randomIndex = Math.floor(Math.random() * messages.length);

    // 4. 애니메이션이 끝날 즈음에 메시지 상태 업데이트
    setTimeout(() => {
      setCurrentMessage(messages[randomIndex]);
      fireConfetti();
    }, 500);
  };

  return (
    <div className="container">
      <h1 className="title">Happy Valentine's Day 💝</h1>
      <p className="subtitle">초콜릿을 눌러봐!</p>

      {/* 카드 렌더링 영역 */}
      <div className="card-area">
        {/* 조건부 렌더링: 메시지가 없으면 버튼, 있으면 카드를 보여줌 */}
        {!currentMessage ? (
          <button
            className={`chocolate-btn ${isShake ? "shake" : ""}`}
            onClick={handleOpenChocolate}
          >
            🍫
          </button>
        ) : (
          <div
            className="message-card fade-in"
            onClick={() => setCurrentMessage(null)}
          >
            <p className="message-text">{currentMessage}</p>
            <p className="helper-text">(한 번 더 누르면 닫혀요)</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
