import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { SquareProps } from "@/app/types/forms/square";
import { Dispatch, SetStateAction } from "react";

export const square = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion
) => {
  const squareItem: SquareProps = {
    id: list.length,
    type: "square",
    width: 100,
    height: 100,
    posX: cursor_position.x - 50,
    posY: cursor_position.y - 50,
    color: "pink",
    rotate: 0,
  };
  setList((prevItem) => [...prevItem, squareItem]);
};
