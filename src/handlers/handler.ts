import {
  drawCircle,
  drawRectangular,
  drawSquare,
} from "../functions/drawShapes";
import { mouseControl, mousePosition } from "../functions/mouseControl";
import { printScreen } from "../functions/printScreen";
import { Duplex } from "../types/types";
import { INVALID_INPUT, SOMETHING_WRONG} from "../utils/constants";

export const parseInput = async (inputData:Buffer, duplex:Duplex) => {
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

const mouseControlHandler = (command:string, args:string[], duplex:Duplex) => {
  try {
    return command === "mouse_position"
      ? mousePosition(duplex)
      : mouseControl(command, args, duplex);
  } catch (err) {
    console.log(SOMETHING_WRONG, err);
  }
};

const drawShapesHandler = (command:string, args:string[], duplex:Duplex) => {
  try {
    let dimensionsInNumberArray = args.map(Number);
    let [radius, length = 0] = dimensionsInNumberArray;

    const drawCommandObj:any = {
      draw_circle(radius:number) {
        drawCircle(radius);
      },
      draw_square(width:number) {
        drawSquare(width);
      },
      draw_rectangle(width:number, length:number) {
        drawRectangular(width, length);
      },
    };

    if (Object.keys(drawCommandObj).includes(command)) {
      drawCommandObj[command](radius, length);
    }
    duplex.write(`${command}:${radius}\0`);
  } catch (err) {
    console.log(SOMETHING_WRONG, err);
  }
};
