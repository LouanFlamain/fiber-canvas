import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";
import { modifieForm } from "../modifie-form/modifie-form";

export const mouseMoveAction = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  selectedForm: SelectedFormProps,
  cursor_position: CursorPostion,
  lockedCursorPosition: CursorPostion,
  lockedItem: FormProps,
  formSelectMode: string | null
) => {
  if (selectedForm !== null && formSelectMode !== null) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === selectedForm) {
        modifieForm().square(
          list[i],
          formSelectMode,
          cursor_position,
          lockedCursorPosition,
          lockedItem,
          setList
        );
        break;
      }
    }
  }
};
