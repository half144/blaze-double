import { useCallback, useEffect, useRef, useState } from "react";
import { useArea } from "./useArea";
import { items } from "@/constants";
import { useLocalUserStore } from "@/store/localUserStore";
import { useTimer } from "@/hooks/useTimer";

export const useDouble = () => {
  const [bet, setBet] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("red");
  const [current, setCurrent] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [isBeting, setIsBeting] = useState<boolean>(false);
  const { areaRef, handleMove, translateX } = useArea(current);
  const increaseToBalance = useLocalUserStore(
    (state) => state.increaseToBalance
  );
  const balance = useLocalUserStore((state) => state.balance);
  const { start, isRunning, reset, time } = useTimer(10);

  const handleBet = useCallback(() => {
    if (bet > balance) setBet(balance);
    if (isBeting) increaseToBalance(-bet);
    const randomNumber = Math.floor(Math.random() * 30);
    const randomRow = Math.floor(Math.random() * 4);
    const result = randomNumber + 31 * randomRow;
    const color = items[result + 1].color;

    setCurrent(result);
    handleMove(result, true);

    setTimeout(() => {
      handleMove(result);
    }, 4700);

    setTimeout(() => {
      handleMove("0");
      if (color.includes(selectedColor) && isBeting) {
        const is14x = color.includes("white");
        increaseToBalance(bet * (is14x ? 14 : 2));
      }
      setIsBeting(false);
      setHistory((prev) => [...prev.slice(-10), randomNumber]);
      reset();
      start();
    }, 8000);
  }, [isBeting, bet, selectedColor]);

  useEffect(() => {
    if (time === 0) {
      reset();
      handleBet();
    }
  }, [time]);

  return {
    areaRef,
    bet,
    setBet,
    history,
    translateX,
    setIsBeting,
    isBeting,
    selectedColor,
    setSelectedColor,
    time,
    isRunning,
  };
};
