import { Dispatch, SetStateAction } from "react";

export type SelectModeProps = {
  mode: SelectValue;
  setSelectMode: Dispatch<SetStateAction<SelectValue>>;
};
export type SelectValue = "select" | "square";
