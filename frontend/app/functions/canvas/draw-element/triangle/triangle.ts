import { TriangleProps } from "@/app/types/forms/triangle";

export const triangle = (
  ctx: CanvasRenderingContext2D,
  element: TriangleProps
) => {
  // Sauvegarder l'état du contexte
  ctx.save();

  // Calculer le centre du triangle
  const centerX = (element.point1.x + element.point2.x + element.point3.x) / 3;
  const centerY = (element.point1.y + element.point2.y + element.point3.y) / 3;

  // Translation au centre du triangle pour faire pivoter autour de ce point
  ctx.translate(centerX, centerY);

  // Appliquer la rotation (en radians)
  ctx.rotate((element.rotate * Math.PI) / 180);

  // Revenir à l'origine en appliquant une translation négative
  ctx.translate(-centerX, -centerY);

  // Dessiner le triangle après la rotation
  ctx.beginPath();
  ctx.fillStyle = element.color;

  ctx.moveTo(element.point1.x, element.point1.y);
  ctx.lineTo(element.point2.x, element.point2.y);
  ctx.lineTo(element.point3.x, element.point3.y);
  ctx.closePath();
  ctx.fill();

  // Restaurer l'état du contexte initial
  ctx.restore();
};
