import { FormProps } from "@/app/types/canvas/listForms";
import { square } from "./square/square";
import { SquareProps } from "@/app/types/forms/square";

export const drawSelector = (
  ctx: CanvasRenderingContext2D,
  element: FormProps
) => {
  switch (element.type) {
    case "square":
      square(ctx, element as SquareProps);
  }
};
