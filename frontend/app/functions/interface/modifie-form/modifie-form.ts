import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { square } from "./square/square";
import { ItemPositionProps } from "@/app/types/itemPosition";
import { FormProps } from "@/app/types/canvas/listForms";
import { Dispatch, SetStateAction } from "react";

export const modifieForm = () => {
  return {
    square,
  };
};
