import { Dispatch, SetStateAction } from "react";
import { circle } from "../elements/circle/circle-create";
import { square } from "../elements/square/square-create";
import { triangle } from "../elements/triangle/triangle-create";
import { SelectedFormProps } from "@/app/types/selectedForm";
import mode_json from "../../../interface/mode.json";
import { SelectValue } from "../../interface/select-mode/type";

export const createForm = (
  setSelectMode: Dispatch<SetStateAction<SelectValue>>
) => {
  setSelectMode(mode_json.mode.select as SelectValue);
  return {
    square,
    circle,
    triangle,
  };
};
