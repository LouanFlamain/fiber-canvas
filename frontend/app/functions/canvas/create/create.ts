import { circle } from "../elements/circle/circle-create";
import { square } from "../elements/square/square-create";
import { triangle } from "../elements/triangle/triangle-create";

export const createForm = () => {
  return {
    square,
    circle,
    triangle,
  };
};
