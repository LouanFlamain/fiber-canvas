import { FormProps } from "@/app/types/canvas/listForms";
import { square } from "./square/square";
import { SquareProps } from "@/app/types/forms/square";
import { circle } from "./circle/circle";
import { CircleProps } from "@/app/types/forms/circle";
import { triangle } from "./triangle/triangle";
import { TriangleProps } from "@/app/types/forms/triangle";

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
