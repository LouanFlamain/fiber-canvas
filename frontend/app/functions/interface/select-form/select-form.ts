import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";

export const selectForm = (
  list: ListFormProps,
  cursor_position: CursorPostion,
  setSelectedForm: Dispatch<SetStateAction<SelectedFormProps>>
) => {
  const reverse_list = [...list].reverse();

  for (let i = 0; i < reverse_list.length; i++) {
    const element = reverse_list[i];

    // Calcul de l'angle de rotation en radians
    const angle = element.rotate * (Math.PI / 180);

    // Calcul du centre de l'élément (le point autour duquel l'élément est tourné)
    const centerX = element.posX + element.width / 2;
    const centerY = element.posY + element.height / 2;

    // Appliquer la rotation inverse pour obtenir la position du curseur dans le repère non tourné
    const rotatedX =
      centerX +
      (cursor_position.x - centerX) * Math.cos(-angle) -
      (cursor_position.y - centerY) * Math.sin(-angle);
    const rotatedY =
      centerY +
      (cursor_position.x - centerX) * Math.sin(-angle) +
      (cursor_position.y - centerY) * Math.cos(-angle);

    // Vérifier si le curseur est dans les limites de la forme (sans rotation)
    if (
      rotatedX >= element.posX &&
      rotatedX <= element.posX + element.width &&
      rotatedY >= element.posY &&
      rotatedY <= element.posY + element.height
    ) {
      console.log(element.id);
      setSelectedForm(element.id); // Sélectionne la forme si le curseur est à l'intérieur
      break;
    } else {
      setSelectedForm(null); // Désélectionne si aucune forme n'est trouvée
    }
  }
};
