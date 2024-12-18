import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export const InterviewTimer = () => {
  const [time, setTime] = useState(600); // 10分 = 600秒
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-center space-x-2 text-lg font-semibold">
      <Timer className="w-6 h-6 text-blue-600" />
      <span className={`${time <= 60 ? 'text-red-500' : 'text-gray-700'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isRunning ? '一時停止' : '開始'}
      </button>
    </div>
  );
};