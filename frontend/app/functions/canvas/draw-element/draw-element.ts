import { FormProps } from "@/app/types/canvas/listForms";
import { SquareProps } from "@/app/types/forms/square";
import { CircleProps } from "@/app/types/forms/circle";
import { TriangleProps } from "@/app/types/forms/triangle";
import { square } from "../elements/square/square-draw";
import { circle } from "../elements/circle/circle-draw";
import { triangle } from "../elements/triangle/triangle-draw";

export const drawElement = (
  ctx: CanvasRenderingContext2D,
  element: FormProps
) => {
  switch (element.type) {
    case "square":
      square(ctx, element as SquareProps);
      break;
    case "circle":
      circle(ctx, element as CircleProps);
      break;
    case "triangle":
      triangle(ctx, element as TriangleProps);
      break;
  }
};
