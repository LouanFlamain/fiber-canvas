import { Camera } from "@/app/types/canvas/camera";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { Dispatch, SetStateAction } from "react";

export const currentCursorPosition = (
  event: MouseEvent,
  setCursorPosition: Dispatch<SetStateAction<CursorPostion>>,
  camera: Camera
) => {
  setCursorPosition({
    x: camera.x + event.clientX,
    y: camera.y + event.clientY,
  });
};
