import robot from "robotjs";
import { Duplex } from "../types/types";

export const mouseControl = (direction:string, args:string[], duplex:Duplex) => {
  let { x, y } = robot.getMousePos();
  const step = Number(args[0]) || 0;

  const mouseCommandObj:any = {
    mouse_up() {
      return (y = y - step);
    },
    mouse_down() {
      return (y = y + step);
    },
    mouse_left() {
      return (x = x - step);
    },
    mouse_right() {
      return (x = x + step);
    },
  };

  if (Object.keys(mouseCommandObj).includes(direction)) {
    mouseCommandObj[direction]();
    robot.moveMouse(x, y);
  }
  return duplex.write(`${direction}:${step}\0`);
};

export const mousePosition = (duplex:Duplex) => {
  const { x, y } = robot.getMousePos();
  return duplex.write(`mouse_position ${x},${y}\0`);
};
