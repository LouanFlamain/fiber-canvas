"use client";

import { createForm } from "@/app/functions/canvas/create/create";
import { currentCursorPosition } from "@/app/functions/canvas/cursor-position/cursorPosition";
import { drawInfiniteCanvas } from "@/app/functions/canvas/draw/draw";
import { initialiseInfiniteCanvas } from "@/app/functions/canvas/initialise/initialise";
import { setWindowSize } from "@/app/functions/canvas/window-size/windowSize";
import { zoom } from "@/app/functions/canvas/zoom/zoom";
import { clickAction } from "@/app/functions/interface/click-action/click-action";
import { mouseDownAction } from "@/app/functions/interface/mouse-down-action/mouse-down-action";
import { mouseMoveAction } from "@/app/functions/interface/mouse-move-action/mouse-move-action";
import { mouseUpAction } from "@/app/functions/interface/mouse-up-action/mouse-up-action";
import { selectForm } from "@/app/functions/interface/select-form/select-form";
import { selectTypeOfMode } from "@/app/functions/interface/select-mode/select-mode";
import { SelectValue } from "@/app/functions/interface/select-mode/type";
import { Camera } from "@/app/types/canvas/camera";
import { CursorPostion } from "@/app/types/canvas/cursorPositon";
import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
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
  const [lockedCursorPosition, setLockedCursorPosition] =
    useState<CursorPostion>({
      x: 0,
      y: 0,
    });

  const [lockedItem, setLockedItem] = useState<FormProps>({
    id: 0,
    type: "",
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
    rotate: 0,
    color: "",
  });

  const [list, setList] = useState<ListFormProps>([]);
  const [selectMode, setSelectMode] = useState<SelectValue>("select");
  const [selectedForm, setSelectedForm] = useState<SelectedFormProps>(null);
  const selectedFormRef = useRef<SelectedFormProps>(null);
  const [formSelectMode, setFormSelectMode] = useState<string | null>(null);

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
          setCursorPosition,
          selectedFormRef
        );

        return () => {
          removeEventListeners();
        };
      }
    }
  }, []);

  // Redessine le canvas lorsque la caméra ou la taille change
  useEffect(() => {
    selectedFormRef.current = selectedForm;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawInfiniteCanvas(ctx, camera, windowDimension, list, selectedForm);
      }
    }
  }, [
    camera,
    windowDimension,
    list,
    selectedForm,
    windowDimension,
    camera.zoom,
  ]);

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
    console.log(cursor_position);
    clickAction(selectMode, list, setList, cursor_position, setSelectedForm);
  };

  const handleMouseDownAction = () => {
    const cursor_position: ItemPositionProps = {
      x: cursorPositon.x + camera.x,
      y: cursorPositon.y + camera.y,
    };
    mouseDownAction(
      selectedForm,
      cursor_position,
      list,
      setFormSelectMode,
      setLockedCursorPosition,
      setLockedItem
    );
  };

  const handleMouseUpAction = () => {
    mouseUpAction(setFormSelectMode);
  };

  const handleMouseMoveAction = () => {
    const cursor_position: ItemPositionProps = {
      x: cursorPositon.x + camera.x,
      y: cursorPositon.y + camera.y,
    };
    mouseMoveAction(
      list,
      setList,
      selectedForm,
      cursor_position,
      lockedCursorPosition,
      lockedItem,
      formSelectMode
    );
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={windowDimension.width}
        height={windowDimension.height}
        onClick={handleClickAction}
        onMouseDown={handleMouseDownAction}
        onMouseUp={handleMouseUpAction}
        onMouseMove={handleMouseMoveAction}
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
          locked_x :{lockedCursorPosition.x}, locked_y :{" "}
          {lockedCursorPosition.y},
        </p>
        <p className="text-[#ffffff]">
          locked_form_x :{lockedItem.posX}, locked_form_y : {lockedItem.posY},
        </p>
        <p className="text-[#ffffff]">
          cameraX : {camera.x}, cameraY : {camera.y},
        </p>
        <p className="text-white">zoom: {Math.round(camera.zoom * 100)}%</p>
        <p className="text-white">selected form : {selectedForm}</p>
        <p className="text-white">selected form mode : {formSelectMode}</p>
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
        <p className="text-white">panel : </p>
        <div className="flex flex-col">
          <button
            className="text-white"
            value={"select"}
            onClick={handleClickMode}
          >
            select
          </button>
          <button
            className="text-white"
            value={"square"}
            onClick={handleClickMode}
          >
            square
          </button>
          <button className="text-white" onClick={() => console.log(list)}>
            list
          </button>
          <button
            className="text-white"
            onClick={() => console.log(selectedFormRef.current)}
          >
            ref
          </button>
        </div>
      </div>
    </>
  );
};

export default Draw;
