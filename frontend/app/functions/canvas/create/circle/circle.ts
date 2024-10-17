import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { CircleProps } from "@/app/types/forms/circle";
import { SquareProps } from "@/app/types/forms/square";
import { Dispatch, SetStateAction } from "react";

export const circle = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion
) => {
  const circleItem: CircleProps = {
    id: list.length,
    type: "circle",
    radius: 50,
    start_angle: 0,
    end_angle: 2 * Math.PI,
    posX: cursor_position.x,
    posY: cursor_position.y,
    color: "pink",
  };
  setList((prevItem) => [...prevItem, circleItem]);
};
