"use client";
import { useDouble } from "./hooks/useDouble";
import { Double } from "./components/Double";
import { Controls } from "./components/Controls";

const Home = () => {
  const {
    areaRef,
    translateX,
    history,
    setIsBeting,
    setBet,
    bet,
    isBeting,
    selectedColor,
    setSelectedColor,
    time,
    isRunning,
  } = useDouble();

  return (
    <div className="flex flex-col md:flex-row container w-full gap-3  items-center justify-center h-full mx-auto">
      <Controls
        bet={bet}
        setBet={setBet}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        handleBetting={() => setIsBeting(true)}
        isRunning={isRunning}
        time={time}
        isBeting={isBeting}
      />
      <Double
        ref={areaRef}
        history={history}
        translateX={translateX}
        time={time}
        isRunning={isRunning}
      />
    </div>
  );
};

export default Home;
