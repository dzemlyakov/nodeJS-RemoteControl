import robot from "robotjs";

export const mouseControl = (direction, args, duplex) => {
  let { x, y } = robot.getMousePos();
  const step = Number(args[0]) || 0;

  const mouseCommandObj = {
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
  return duplex.write(`${direction}:${step}`);
};

export const mousePosition = (duplex) => {
  const { x, y } = robot.getMousePos();
  return duplex.write(`mouse_position ${x},${y}\0`);
};
