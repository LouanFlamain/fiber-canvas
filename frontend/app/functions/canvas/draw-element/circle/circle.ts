import { CircleProps } from "@/app/types/forms/circle";

export const circle = (ctx: CanvasRenderingContext2D, element: CircleProps) => {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = element.color;
  ctx.arc(
    element.posX,
    element.posY,
    element.radius,
    element.start_angle,
    element.end_angle
  );
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};
