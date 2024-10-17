import { circle } from "./circle/circle";
import { square } from "./square/square";
import { triangle } from "./triangle/triangle";

export const createForm = () => {
  return {
    square,
    circle,
    triangle,
  };
};
