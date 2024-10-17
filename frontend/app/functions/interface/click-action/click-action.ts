import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { createForm } from "../../canvas/create/create";
import { SelectValue } from "../select-mode/type";
import { Dispatch, SetStateAction } from "react";
import { ItemPositionProps } from "@/app/types/itemPosition";
import { selectForm } from "../select-form/select-form";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { SelectedFormProps } from "@/app/types/selectedForm";

export const clickAction = (
  mode: SelectValue,
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion,
  setSelectedForm: Dispatch<SetStateAction<SelectedFormProps>>
) => {
  switch (mode) {
    case "select":
      selectForm(list, cursor_position, setSelectedForm);
      break;
    case "square":
      createForm().square(list, setList, cursor_position);
      break;
    case "circle":
      createForm().circle(list, setList, cursor_position);
      break;
    case "triangle":
      createForm().triangle(list, setList, cursor_position);
  }
};
