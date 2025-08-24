import React, { useState, useEffect } from "react";

const QuizTimer = ({ start, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (start) {
      setTimeLeft(15);
      setRunning(true);

      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [start, onTimeUp]);

  return (
    <div className="bg-gray-100 text-gray-800 font-bold text-lg px-4 py-2 rounded-lg shadow-md w-max">
      
      <span className={timeLeft <= 5 ? "text-red-600" : "text-green-600"}>
        {timeLeft}s
      </span>
    </div>
  );
};

export default QuizTimer;
