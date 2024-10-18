import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";
import { modifieForm } from "../modifie-form/modifie-form";
import mode_json from "../../../interface/mode.json";
import { SquareProps } from "@/app/types/forms/square";

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
        switch (list[i].type) {
          case mode_json.mode.square:
            modifieForm().square(
              list[i] as SquareProps,
              formSelectMode,
              cursor_position,
              lockedCursorPosition,
              lockedItem as SquareProps,
              setList
            );
            break;
          case mode_json.mode.circle:
            break;
          case mode_json.mode.triangle:
            break;
          case mode_json.mode.select:
            break;
        }
        break;
      }
    }
  }
};
