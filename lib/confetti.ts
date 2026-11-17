import confetti from "canvas-confetti";

export const triggerFireworks = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: NodeJS.Timeout = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Rose, gold, cyan, pink colors
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ["#f43f5e", "#fb7185", "#f59e0b", "#14b8a6", "#ec4899", "#ffd700"],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ["#f43f5e", "#fb7185", "#f59e0b", "#14b8a6", "#ec4899", "#ffd700"],
    });
  }, 250);
};

export const triggerHeartBurst = () => {
  const count = 35;
  confetti({
    particleCount: count,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af"],
    shapes: ["circle"],
    scalar: 1.2,
  });
};

