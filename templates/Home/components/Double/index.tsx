import { Item, items } from "@/constants";
import { Ball } from "../Ball";
import { forwardRef } from "react";

type DoubleProps = {
  translateX: number;
  history: number[];
  time: number;
  isRunning: boolean;
};

export const Double = forwardRef((props: DoubleProps, ref: any) => {
  return (
    <div className="flex items-center flex-col gap-2 w-full md:w-1/2 md:h-full justify-center">
      <div className="flex gap-2">
        {props.history?.map((item) => (
          <Ball
            size={30}
            color={
              item == 0
                ? "bg-white"
                : item % 2 === 0
                ? "bg-black"
                : "bg-red-700"
            }
            textColor={item == 0 ? "text-black" : "text-white"}
            number={item}
          />
        ))}
      </div>
      <div
        ref={ref}
        className="border relative border-gray-700 rounded-md w-full overflow-hidden h-3/4 flex items-center"
      >
        <div
          className={`transition-all border border-gray-700 pl-4 duration-[4000ms] ease-in-out`}
          style={{
            transform: `translateX(${props.translateX}px)`,
          }}
        >
          <div className="gap-3 py-5 flex ">
            {items?.map((item) => (
              <Ball
                size={70}
                number={item.number}
                color={item.color}
                textColor={item.textColor}
              />
            ))}
          </div>
        </div>

        <div
          className={`w-full h-full top-0 flex items-center justify-center absolute ${
            props.isRunning && "bg-black bg-opacity-60"
          }`}
        >
          {props.isRunning ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-white font-bold text-2xl">{props.time}</p>
            </div>
          ) : (
            <div className="h-full w-1 bg-opacity-40 rounded-md bg-white absolute top-0"></div>
          )}
        </div>
      </div>
    </div>
  );
});
