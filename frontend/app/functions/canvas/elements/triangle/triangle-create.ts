import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { TriangleProps } from "@/app/types/forms/triangle";
import { Dispatch, SetStateAction } from "react";
import triangle_json from "../../../../interface/items/triangle.json";

export const triangle = (
  list: ListFormProps,
  setList: Dispatch<SetStateAction<ListFormProps>>,
  cursor_position: CursorPostion
) => {
  const side_lenght = 100;

  const getEquilateralTrianglePoints = (
    xc: number,
    yc: number,
    sideLength: number
  ) => {
    const radius = sideLength / Math.sqrt(3);
    const angles = [0, 120, 240].map((angle) => (angle * Math.PI) / 180);
    return angles.map((angle) => {
      const x = xc + radius * Math.cos(angle);
      const y = yc + radius * Math.sin(angle);
      return { x, y };
    });
  };

  const array_point = getEquilateralTrianglePoints(
    cursor_position.x,
    cursor_position.y,
    triangle_json.side_length
  );

  const triangle_item: TriangleProps = {
    id: list.length,
    type: triangle_json.type,
    posX: cursor_position.x,
    posY: cursor_position.y,
    point1: array_point[0],
    point2: array_point[1],
    point3: array_point[2],
    width: triangle_json.side_length,
    height: (triangle_json.side_length * Math.sqrt(3)) / 2,
    rotate: triangle_json.rotate,
    color: triangle_json.color,
  };
  setList((prevList) => [...prevList, triangle_item]);
};
