import { useRef, useState } from "react";

export const useTimer = (initial: number) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef<NodeJS.Timeout>();

  const start = () => {
    if (interval.current) return;
    setIsRunning(true);

    interval.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(interval.current);
    interval.current = undefined;
  };

  const reset = () => {
    setTime(initial);
    stop();
  };

  return {
    time,
    start,
    stop,
    reset,
    isRunning,
  };
};
