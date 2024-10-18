import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { Dispatch, SetStateAction } from "react";

export const square = (
  list: ListFormProps,
  cursor_position: CursorPostion,
  setSelectedForm: Dispatch<SetStateAction<SelectedFormProps>>
) => {
  const reverse_list = [...list].reverse();

  for (let i = 0; i < reverse_list.length; i++) {}
};
