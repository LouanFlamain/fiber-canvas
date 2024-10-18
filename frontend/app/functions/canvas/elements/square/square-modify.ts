import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { SquareProps } from "@/app/types/forms/square";
import { Dispatch, SetStateAction } from "react";

export const square = (
  element: SquareProps,
  action_point: string | null,
  cursor_position: CursorPostion,
  lockedCursorPosition: CursorPostion,
  lockedItem: SquareProps,
  setList: Dispatch<SetStateAction<ListFormProps>>
) => {
  //console.log(cursor_position);
  const delta_position: CursorPostion = {
    x: lockedCursorPosition.x - cursor_position.x,
    y: lockedCursorPosition.y - cursor_position.y,
  };
  switch (action_point) {
    case "top-left":
      if (
        lockedItem.width + delta_position.x > 0 &&
        lockedItem.height + delta_position.y > 0
      ) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  posX: lockedItem.posX - delta_position.x,
                  posY: lockedItem.posY - delta_position.y,
                  width: lockedItem.width + delta_position.x,
                  height: lockedItem.height + delta_position.y,
                }
              : item
          )
        );
      }
      break;
    case "top-right":
      if (
        lockedItem.width - delta_position.x > 0 &&
        lockedItem.height + delta_position.y > 0
      ) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  posY: lockedItem.posY - delta_position.y,
                  width: lockedItem.width - delta_position.x,
                  height: lockedItem.height + delta_position.y,
                }
              : item
          )
        );
      }
      break;
    case "bottom-right":
      if (
        lockedItem.width - delta_position.x > 0 &&
        lockedItem.height - delta_position.y > 0
      ) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  width: lockedItem.width - delta_position.x,
                  height: lockedItem.height - delta_position.y,
                }
              : item
          )
        );
      }
      break;
    case "bottom-left":
      if (
        lockedItem.height - delta_position.y > 0 &&
        lockedItem.width + delta_position.x > 0
      ) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  posX: lockedItem.posX - delta_position.x,
                  width: lockedItem.width + delta_position.x,
                  height: lockedItem.height - delta_position.y,
                }
              : item
          )
        );
      }
      break;
    case "top":
      if (lockedItem.height + delta_position.y > 0) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  posY: lockedItem.posY - delta_position.y,
                  height: lockedItem.height + delta_position.y,
                }
              : item
          )
        );
      }
      break;
    case "right":
      if (lockedItem.width - delta_position.x > 0) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? { ...item, width: lockedItem.width - delta_position.x }
              : item
          )
        );
      }
      break;
    case "bottom":
      if (lockedItem.height - delta_position.y > 0) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? { ...item, height: lockedItem.height - delta_position.y }
              : item
          )
        );
      }
      break;
    case "left":
      if (lockedItem.width + delta_position.x > 0) {
        setList((prevlist: ListFormProps) =>
          prevlist.map((item: FormProps) =>
            item.id === element.id
              ? {
                  ...item,
                  posX: lockedItem.posX - delta_position.x,
                  width: lockedItem.width + delta_position.x,
                }
              : item
          )
        );
      }
      break;
    case "move":
      console.log(delta_position);
      setList((prevlist: ListFormProps) =>
        prevlist.map((item: FormProps) =>
          item.id === element.id
            ? {
                ...item,
                posX: lockedItem.posX - delta_position.x,
                posY: lockedItem.posY - delta_position.y,
              }
            : item
        )
      );
      break;
  }
};
