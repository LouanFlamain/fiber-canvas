import { Camera } from "@/app/types/canvas/camera";
import { windowDimensionProps } from "@/app/types/canvas/windowDimension";
import { drawInfiniteCanvas } from "../draw/draw";
import React, { Dispatch, SetStateAction } from "react";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { currentCursorPosition } from "../cursor-position/cursorPosition";
import { zoom } from "../zoom/zoom";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { LastMousePosition } from "@/app/types/lastMousePosition";

export const initialiseInfiniteCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  setCamera: (cameraUpdater: (prevCamera: Camera) => Camera) => void,
  dimension: windowDimensionProps,
  setCursorPosition: Dispatch<SetStateAction<CursorPostion>>,
  selectedFormRef: React.MutableRefObject<SelectedFormProps>
) => {
  drawInfiniteCanvas(ctx, camera, dimension);
  let lastMousePosition: LastMousePosition = { x: 0, y: 0 };
  let mapIsMoving = false;

  const onMouseDown = (event: MouseEvent) => {
    mapIsMoving = true;
    lastMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onMouseUp = () => {
    mapIsMoving = false;
  };

  const onMouseMove = (event: MouseEvent) => {
    currentCursorPosition(event, setCursorPosition, camera);
    if (selectedFormRef.current === null) {
      if (mapIsMoving) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const delta = {
          dx: mouseX - lastMousePosition.x,
          dy: mouseY - lastMousePosition.y,
        };

        setCamera((prevCamera) => ({
          ...prevCamera,
          x: prevCamera.x - delta.dx,
          y: prevCamera.y - delta.dy,
        }));

        lastMousePosition = {
          x: mouseX,
          y: mouseY,
        };
      }
    }
  };

  const onMouseWheel = (event: WheelEvent) => {
    zoom(event, setCamera, camera);
  };
  // Ajouter les écouteurs d'événements une seule fois
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);
  //canvas.addEventListener("wheel", onMouseWheel);

  return () => {
    // Supprimer les écouteurs d'événements lorsque le composant est démonté
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    //canvas.removeEventListener("wheel", onMouseWheel);
  };
};
