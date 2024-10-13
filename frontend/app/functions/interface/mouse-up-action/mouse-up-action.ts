import { Dispatch, SetStateAction } from "react";

export const mouseUpAction = (
  setFormSelectMode: Dispatch<SetStateAction<string | null>>
) => {
  setFormSelectMode(null);
};
