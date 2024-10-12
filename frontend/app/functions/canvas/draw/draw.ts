import { Camera } from "@/app/types/canvas/camera";
import { FormProps, ListFormProps } from "@/app/types/canvas/listForms";
import { windowDimensionProps } from "@/app/types/canvas/windowDimension";
import { drawElement } from "../draw-element/draw-element";
import { SelectedFormProps } from "@/app/types/selectedForm";
import { drawSelector } from "../draw-selector/draw-selector";

export const drawInfiniteCanvas = (
  ctx: CanvasRenderingContext2D,
  camera: Camera,
  dimension: windowDimensionProps,
  list: ListFormProps,
  select: SelectedFormProps
) => {
  //définis canvas de base
  ctx.clearRect(0, 0, dimension.width, dimension.height);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, dimension.width, dimension.height);
  ctx.save();
  ctx.scale(camera.zoom, camera.zoom);
  ctx.translate(-camera.x, -camera.y);
  let selectElement!: FormProps;
  if (list) {
    list.forEach((element) => {
      if (select !== null) {
        if (select === element.id) {
          selectElement = element;
        }
      }
      ctx.save();
      drawElement(ctx, element);
      ctx.restore();
    });
  }
  if (select != null) {
    if (selectElement) {
      drawSelector(ctx, selectElement);
    }
  }

  ctx.restore();
};
