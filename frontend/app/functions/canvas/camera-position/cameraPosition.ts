import { Camera } from "@/app/types/canvas/camera";
import { LastMousePosition } from "../initialise/type";

export const cameraPosition = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  lastMousePosition: LastMousePosition,
  camera: Camera,
  setCamera: (cameraUpdater: (prevCamera: Camera) => Camera) => void
) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const delta = {
    dx: mouseX - lastMousePosition.x,
    dy: mouseY - lastMousePosition.y,
  };

  if (camera.zoom < 1) {
    setCamera((prevCamera) => ({
      ...prevCamera,
      x: prevCamera.x - delta.dx,
      y: prevCamera.y - delta.dy,
    }));
  } else {
    setCamera((prevCamera) => ({
      ...prevCamera,
      x: (prevCamera.x - delta.dx) / camera.zoom,
      y: (prevCamera.y - delta.dy) / camera.zoom,
    }));
  }

  lastMousePosition = {
    x: mouseX,
    y: mouseY,
  };
};
