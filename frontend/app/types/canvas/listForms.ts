import { CircleProps } from "../forms/circle";
import { SquareProps } from "../forms/square";
import { TriangleProps } from "../forms/triangle";

export type ListFormProps = Array<FormProps>;

export type FormProps = SquareProps | CircleProps | TriangleProps;
