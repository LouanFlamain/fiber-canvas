import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { CircleProps } from "@/app/types/forms/circle";
import { Dispatch, SetStateAction } from "react";
import circle_json from "../../../../interface/items/circle.json";

export const circle = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion
) => {
  const circleItem: CircleProps = {
    id: list.length,
    type: circle_json.type,
    radius: circle_json.radius,
    width: circle_json.radius * 2,
    height: circle_json.radius * 2,
    start_angle: 0,
    end_angle: 2 * Math.PI,
    posX: cursor_position.x,
    posY: cursor_position.y,
    rotate: circle_json.rotate,
    color: circle_json.color,
  };
  setList((prevItem) => [...prevItem, circleItem]);
};
