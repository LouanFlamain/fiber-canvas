export type TriangleProps = {
  id: number;
  type: string;
  posX: number;
  posY: number;
  point1: Position;
  point2: Position;
  point3: Position;
  rotate: number;
  color: string;
};

type Position = {
  x: number;
  y: number;
};
