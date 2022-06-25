import {
  drawCircle,
  drawRectangular,
  drawSquare,
} from "../functions/drawShapes.js";
import { mouseControl, mousePosition } from "../functions/mouseControl.js";
import { printScreen } from "../functions/printScreen.js";
import { INVALID_INPUT, SOMETHING_WRONG} from "../utils/constants.js";

export const parseInput = async (inputData, duplex) => {
  try {
    const data = inputData.toString();
    console.log(`Sent from client: ${data} `);
    let [command, ...args] = data.split(" ");

    if (command.startsWith("mouse_")) {
      mouseControlHandler(command, args, duplex);
    } else if (command.startsWith("draw_")) {
      drawShapesHandler(command, args, duplex);
    } else if (command.startsWith("prnt_")) {
      printScreen(duplex);
    } else {
      console.log(INVALID_INPUT);
    }
  } catch (err) {
    console.log(SOMETHING_WRONG, err);
  }
};

const mouseControlHandler = (command, args, duplex) => {
  try {
    return command === "mouse_position"
      ? mousePosition(duplex)
      : mouseControl(command, args, duplex);
  } catch (err) {
    console.log(SOMETHING_WRONG, err);
  }
};

const drawShapesHandler = (command, args, duplex) => {
  try {
    let dimensionsInNumberArray = args.map(Number);
    let [radius, length = 0] = dimensionsInNumberArray;

    const drawCommandObj = {
      draw_circle(radius) {
        drawCircle(radius);
      },
      draw_square(width) {
        drawSquare(width);
      },
      draw_rectangle(width, length) {
        drawRectangular(width, length);
      },
    };

    if (Object.keys(drawCommandObj).includes(command)) {
      drawCommandObj[command](radius, length);
    }
    duplex.write(`${command}:${radius}`);
  } catch (err) {
    console.log(SOMETHING_WRONG, err);
  }
};
