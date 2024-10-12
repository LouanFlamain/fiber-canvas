import { FormProps } from "@/app/types/canvas/listForms";

export const square = (ctx: CanvasRenderingContext2D, element: FormProps) => {
  ctx.save(); // Sauvegarde l'état initial du contexte

  // Appliquer la rotation si nécessaire
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

  // Dessiner le carré avec une bordure bleue
  ctx.strokeStyle = "blue";
  ctx.strokeRect(element.posX, element.posY, element.width, element.height);

  // Dessiner les cercles aux coins du carré
  ctx.fillStyle = "blue";

  // Coin supérieur gauche
  ctx.beginPath();
  ctx.arc(element.posX, element.posY, 6, 0, Math.PI * 2);
  ctx.fill(); // Remplir le cercle

  // Coin supérieur droit
  ctx.beginPath();
  ctx.arc(element.posX + element.width, element.posY, 6, 0, Math.PI * 2);
  ctx.fill(); // Remplir le cercle

  // Coin inférieur gauche
  ctx.beginPath();
  ctx.arc(element.posX, element.posY + element.height, 6, 0, Math.PI * 2);
  ctx.fill(); // Remplir le cercle

  // Coin inférieur droit
  ctx.beginPath();
  ctx.arc(
    element.posX + element.width,
    element.posY + element.height,
    6,
    0,
    Math.PI * 2
  );
  ctx.fill(); // Remplir le cercle

  //arrête supérieur
  ctx.beginPath();
  ctx.arc(element.posX + element.width / 2, element.posY, 6, 0, Math.PI * 2);
  ctx.fill();

  //arrête droite

  ctx.beginPath();
  ctx.arc(
    element.posX + element.width,
    element.posY + element.height / 2,
    6,
    0,
    Math.PI * 2
  );
  ctx.fill();

  //arrête basse
  ctx.beginPath();
  ctx.arc(
    element.posX + element.width / 2,
    element.posY + element.height,
    6,
    0,
    Math.PI * 2
  );
  ctx.fill();
  //arrête supérieur
  ctx.beginPath();
  ctx.arc(element.posX, element.posY + element.height / 2, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore(); // Restaurer l'état initial du contexte pour ne pas affecter d'autres dessins
};
