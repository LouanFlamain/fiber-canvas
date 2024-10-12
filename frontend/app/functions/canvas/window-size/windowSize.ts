import { windowDimensionProps } from "@/app/types/canvas/windowDimension";
import { Dispatch, SetStateAction } from "react";

export const setWindowSize = (
  setWindowDimension: Dispatch<SetStateAction<windowDimensionProps>>
) => {
  setWindowDimension({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};
