"use client";

import { createForm } from "@/app/functions/canvas/create/create";
import { currentCursorPosition } from "@/app/functions/canvas/cursor-position/cursorPosition";
import { drawInfiniteCanvas } from "@/app/functions/canvas/draw/draw";
import { initialiseInfiniteCanvas } from "@/app/functions/canvas/initialise/initialise";
import { setWindowSize } from "@/app/functions/canvas/window-size/windowSize";
import { zoom } from "@/app/functions/canvas/zoom/zoom";
import { clickAction } from "@/app/functions/interface/click-action/click-action";
import { selectTypeOfMode } from "@/app/functions/interface/select-mode/select-mode";
import { SelectValue } from "@/app/functions/interface/select-mode/type";
import { Camera } from "@/app/types/canvas/camera";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { ListFormProps } from "@/app/types/canvas/listForms";
import { windowDimensionProps } from "@/app/types/canvas/windowDimension";
import { ItemPositionProps } from "@/app/types/itemPosition";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { useEffect, useRef, useState } from "react";

const Draw = () => {
  //déclarations

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windowDimension, setWindowDimension] = useState<windowDimensionProps>({
    height: 0,
    width: 0,
  });
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [cursorPositon, setCursorPosition] = useState<CursorPostion>({
    x: 0,
    y: 0,
  });
  const [list, setList] = useState<ListFormProps>([]);
  const [selectMode, setSelectMode] = useState<SelectValue>("select");
  const [selectedForm, setSelectedForm] = useState<SelectedFormProps>(null);

  // initialisations

  useEffect(() => {
    setWindowSize(setWindowDimension);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowSize(setWindowDimension);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialise le canvas et les événements de la souris (une seule fois)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const removeEventListeners = initialiseInfiniteCanvas(
          canvas,
          ctx,
          camera,
          setCamera,
          windowDimension,
          setCursorPosition
        );

        return () => {
          removeEventListeners();
        };
      }
    }
  }, [windowDimension, camera.zoom]);

  // Redessine le canvas lorsque la caméra ou la taille change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawInfiniteCanvas(ctx, camera, windowDimension, list, selectedForm);
      }
    }
  }, [camera, windowDimension, list, selectedForm]);

  //functions

  const handleClickMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    const value = e.currentTarget.value as SelectValue;
    console.log(value);
    selectTypeOfMode(value, setSelectMode);
  };

  const handleClickAction = () => {
    const cursor_position: ItemPositionProps = {
      x: cursorPositon.x + camera.x,
      y: cursorPositon.y + camera.y,
    };
    clickAction(selectMode, list, setList, cursor_position, setSelectedForm);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={windowDimension.width}
        height={windowDimension.height}
        onClick={handleClickAction}
      ></canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "#000000",
          width: "min",
        }}
      >
        <p className="text-[#ffffff]">
          x :{cursorPositon.x + camera.x}, y : {cursorPositon.y + camera.y},
        </p>
        <p className="text-[#ffffff]">
          cameraX : {camera.x}, cameraY : {camera.y},
        </p>
        <p className="text-white">zoom: {Math.round(camera.zoom * 100)}%</p>
        <p className="text-white">selected form : {selectedForm}</p>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000000",
          width: "min",
        }}
      >
        <p>panel : </p>
        <div className="flex flex-col">
          <button value={"select"} onClick={handleClickMode}>
            select
          </button>
          <button value={"square"} onClick={handleClickMode}>
            square
          </button>
          <button onClick={() => console.log(list)}>list</button>
        </div>
      </div>
    </>
  );
};

export default Draw;
