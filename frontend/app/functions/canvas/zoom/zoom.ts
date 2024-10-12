import { Camera } from "@/app/types/canvas/camera";
import { Dispatch, SetStateAction } from "react";

export const zoom = (
  event: WheelEvent,
  setCamera: (cameraUpdater: (prevCamera: Camera) => Camera) => void,
  camera: Camera
) => {
  const factor = 0.01;
  if (event.deltaY < 0) {
    console.log(camera.zoom + factor);
    if (camera.zoom + factor < 5) {
      setCamera((prevCamera) => ({
        ...prevCamera,
        zoom: prevCamera.zoom + factor,
      }));
    }
  } else {
    if (camera.zoom - factor > 0.1) {
      setCamera((prevCamera) => ({
        ...prevCamera,
        zoom: prevCamera.zoom - factor,
      }));
    }
  }
};
