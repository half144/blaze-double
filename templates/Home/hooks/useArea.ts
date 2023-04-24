import { items } from "@/constants";
import { RefObject, useEffect, useRef, useState } from "react";

const getTranslateByAreaAndValue = (
  areaRef: RefObject<HTMLDivElement>,
  current: number | string,
  randomMiddle = false
) => {
  const clientWidth = areaRef.current?.clientWidth;
  const childWidth = areaRef.current?.children[0].clientWidth;
  const distanceBetweenBalls = childWidth! / items.length;
  const distanceToCenter = clientWidth! / 2 - childWidth! / 2;
  const start = 62 * distanceBetweenBalls;
  const translateX = distanceToCenter - distanceBetweenBalls * Number(current);
  const result = translateX + distanceBetweenBalls / 2 - -start - 8;
  if (!randomMiddle) return result;

  const randomPositionInTheMiddle = Math.floor(Math.random() * 30);
  const randomPositiveOrNegative = Math.random() < 0.5 ? -1 : 1;
  const randomTranslateX = randomPositionInTheMiddle * randomPositiveOrNegative;
  return result + randomTranslateX;
};

export const useArea = (current: number) => {
  const [translateX, setTranslateX] = useState<number>(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleMove = (
    randomNumber?: number | string,
    randomMiddle?: boolean
  ) => {
    const translate = getTranslateByAreaAndValue(
      areaRef,
      randomNumber || 0,
      randomMiddle
    );
    setTranslateX(translate);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleMove(current));
    return () =>
      window.removeEventListener("resize", () => handleMove(current));
  }, [current]);

  return {
    areaRef,
    translateX,
    handleMove,
  };
};
