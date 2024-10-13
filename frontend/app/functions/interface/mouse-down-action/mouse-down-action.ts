import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { ItemPositionProps } from "@/app/types/itemPosition";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";
import { modifieForm } from "../modifie-form/modifie-form";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";

export const mouseDownAction = (
  selectedForm: SelectedFormProps,
  cursor_position: ItemPositionProps,
  list: ListFormProps,
  setFormSelectMode: Dispatch<SetStateAction<string | null>>,
  setLockedCursorPosition: Dispatch<SetStateAction<CursorPostion>>,
  setLockedForm: Dispatch<SetStateAction<FormProps>>
) => {
  const init_function = (action_point: string, element: FormProps) => {
    setFormSelectMode(action_point);
    setLockedCursorPosition(cursor_position);
    setLockedForm((prevLockedForm) => ({
      ...prevLockedForm,
      posX: element.posX,
      posY: element.posY,
      width: element.width,
      height: element.height,
    }));
  };
  if (selectedForm !== null) {
    const reverse_list = [...list].reverse();

    for (let i = 0; i < reverse_list.length; i++) {
      const element = reverse_list[i];

      // Calcul de l'angle de rotation en radians
      const angle = element.rotate * (Math.PI / 180);

      // Calcul du centre de l'élément
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

      const cornerRadius = 6; // Rayon de la zone de détection

      // Vérifier si le clic est dans le coin supérieur gauche
      if (
        rotatedX <= element.posX + cornerRadius &&
        rotatedX >= element.posX - cornerRadius &&
        rotatedY <= element.posY + cornerRadius &&
        rotatedY >= element.posY - cornerRadius
      ) {
        console.log("corner top left");
        const action_point = "top-left";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est dans le coin supérieur droit
      if (
        rotatedX <= element.posX + element.width + cornerRadius &&
        rotatedX >= element.posX + element.width - cornerRadius &&
        rotatedY <= element.posY + cornerRadius &&
        rotatedY >= element.posY - cornerRadius
      ) {
        console.log("corner top right");
        const action_point = "top-right";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est dans le coin inférieur droit
      if (
        rotatedX <= element.posX + element.width + cornerRadius &&
        rotatedX >= element.posX + element.width - cornerRadius &&
        rotatedY <= element.posY + element.height + cornerRadius &&
        rotatedY >= element.posY + element.height - cornerRadius
      ) {
        console.log("corner bottom right");
        const action_point = "bottom-right";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est dans le coin inférieur gauche
      if (
        rotatedX <= element.posX + cornerRadius &&
        rotatedX >= element.posX - cornerRadius &&
        rotatedY <= element.posY + element.height + cornerRadius &&
        rotatedY >= element.posY + element.height - cornerRadius
      ) {
        console.log("corner bottom left");
        const action_point = "bottom-left";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est sur l'arrête du haut
      if (
        rotatedX <= element.posX + element.width / 2 + cornerRadius &&
        rotatedX >= element.posX + element.width / 2 - cornerRadius &&
        rotatedY <= element.posY + cornerRadius &&
        rotatedY >= element.posY - cornerRadius
      ) {
        console.log("arrete top");
        const action_point = "top";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est sur l'arrête de droite
      if (
        rotatedX <= element.posX + element.width + cornerRadius &&
        rotatedX >= element.posX + element.width - cornerRadius &&
        rotatedY <= element.posY + element.height / 2 + cornerRadius &&
        rotatedY >= element.posY + element.height / 2 - cornerRadius
      ) {
        console.log("arrete right");
        const action_point = "right";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est sur l'arrête du bas
      if (
        rotatedX <= element.posX + element.width / 2 + cornerRadius &&
        rotatedX >= element.posX + element.width / 2 - cornerRadius &&
        rotatedY <= element.posY + element.height + cornerRadius &&
        rotatedY >= element.posY + element.height - cornerRadius
      ) {
        console.log("arrete bottom");
        const action_point = "bottom";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }

      // Vérifier si le clic est sur l'arrête de gauche
      if (
        rotatedX <= element.posX + cornerRadius &&
        rotatedX >= element.posX - cornerRadius &&
        rotatedY <= element.posY + element.height / 2 + cornerRadius &&
        rotatedY >= element.posY + element.height / 2 - cornerRadius
      ) {
        console.log("arrete left");
        const action_point = "left";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }
      // Si on ne touche pas les coins mais qu'on est à l'intérieur de la forme
      if (
        rotatedX >= element.posX &&
        rotatedX <= element.posX + element.width &&
        rotatedY >= element.posY &&
        rotatedY <= element.posY + element.height
      ) {
        console.log("Inside the shape but not in the corners");
        const action_point = "move";
        init_function(action_point, element);
        //modifieForm().square(element, action_point, cursor_position, setList);
        break;
      }
    }
  }
};
