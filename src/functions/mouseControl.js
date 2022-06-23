import robot from "robotjs";
export const mouseControl = (direction, args, draw = '') => {
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
  } else {
    const mousePosition = `mouse_position ${x},${y}`;
    return { mousePosition };
  }
};
