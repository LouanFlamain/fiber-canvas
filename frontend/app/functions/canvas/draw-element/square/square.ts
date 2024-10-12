import { SquareProps } from "@/app/types/forms/square";

export const square = (ctx: CanvasRenderingContext2D, element: SquareProps) => {
  ctx.fillStyle = element.color;

  if (element.rotate > 0) {
    ctx.translate(
      element.posX + element.width / 2,
      element.posY + element.height / 2
    );
    ctx.rotate((element.rotate * Math.PI) / 180);
    ctx.translate(
      -(element.posX + element.width / 2),
      -(element.posY + element.height / 2)
    );
  }

  ctx.fillRect(element.posX, element.posY, element.width, element.height);
};
