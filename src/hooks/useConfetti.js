import confetti from "canvas-confetti";

export const useConfetti = () => {
  const fireConfetti = () => {
    confetti({
      particleCount: 150, // 조각 개수
      spread: 70, // 퍼지는 각도
      origin: { y: 0.6 }, // 화면의 60% 높이에서 터짐
      colors: ["#ff0000", "#ffccd5", "#ffb3c1", "#d6336c"], // 발렌타인 핑크 테마
    });
  };

  return { fireConfetti };
};
