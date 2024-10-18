import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { SquareProps } from "@/app/types/forms/square";
import { Dispatch, SetStateAction } from "react";
import square_json from "../../../../interface/items/square.json";

export const square = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion
) => {
  const squareItem: SquareProps = {
    id: list.length,
    type: square_json.type,
    width: square_json.width,
    height: square_json.height,
    posX: cursor_position.x - square_json.width / 2,
    posY: cursor_position.y - square_json.height / 2,
    color: square_json.color,
    rotate: square_json.rotate,
  };
  setList((prevItem) => [...prevItem, squareItem]);
};
