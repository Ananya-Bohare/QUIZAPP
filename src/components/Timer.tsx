import React, { useEffect, useState } from "react";
import ErrorBoundary from './ErrorBoundary';


interface TimerProps {
  timeLeft: number;
  isQuizCompleted: boolean; 
}

const Timer: React.FC<TimerProps> = ({ timeLeft , isQuizCompleted}) => {
  const [seconds, setSeconds] = useState(timeLeft);

  useEffect(() => {
    if (isQuizCompleted) {
      setSeconds(0); // Stop the timer if the quiz is completed
      return; // Exit early
    }
    setSeconds(timeLeft); // Reset the timer when `timeLeft` changes
  }, [timeLeft, isQuizCompleted]);

  useEffect(() => {
    if (seconds <= 0) return; // Stop the timer when it reaches 0

    const timerInterval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds]);

  return (
    <ErrorBoundary>
    <div className="text-red-600 text-xl">
      {seconds} seconds
    </div>
    </ErrorBoundary>
  );
};

export default Timer;
