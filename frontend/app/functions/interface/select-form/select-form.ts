import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";

export const selectForm = (
  list: ListFormProps,
  cursorPositon: CursorPostion,
  setSelectedForm: Dispatch<SetStateAction<SelectedFormProps>>
) => {
  const reversedList = [...list].reverse();
  for (let i = 0; i < reversedList.length; i++) {
    if (
      cursorPositon.x <= reversedList[i].posX + reversedList[i].width &&
      cursorPositon.x >= reversedList[i].posX &&
      cursorPositon.y <= reversedList[i].posY + reversedList[i].height &&
      cursorPositon.y >= reversedList[i].posY
    ) {
      console.log(reversedList[i].id);
      setSelectedForm(reversedList[i].id);
      break;
    } else {
      setSelectedForm(null);
    }
  }
};
