import { Dispatch, SetStateAction } from "react";
import { SelectModeProps, SelectValue } from "./type";

export const selectTypeOfMode = (
  mode: SelectValue,
  setSelectMode: Dispatch<SetStateAction<SelectValue>>
) => {
  setSelectMode(mode);
};
