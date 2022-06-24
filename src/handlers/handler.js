import { drawCircle, drawRectangular, drawSquare } from "../functions/drawShapes.js";
import { mouseControl, mousePosition } from "../functions/mouseControl.js";

export const parseInput = (data, duplex) => {
    console.log(data.toString(), '++++++');
    let [command, ...args] = data.toString().split(" ");

  if (command.startsWith("mouse_")) {
    mouseControlHandler(command, args, duplex)
    } else if(command.startsWith("draw_")) {
        drawShapesHandler(command, args, duplex)
    }
  };

const mouseControlHandler = (command, args, duplex) => {
    return command === 'mouse_position' ? mousePosition(duplex) : mouseControl(command, args, duplex)
  }

const drawShapesHandler = (command, args, duplex) => {
    let dimensionsInNumberArray = args.map(Number);
    let [radius, length = 0] = dimensionsInNumberArray;
    
    const drawCommandObj = {
      draw_circle(radius) {
        drawCircle(radius);
      },
      draw_square(width) {
        drawSquare(width);
      },
      draw_rectangle(width,length){
          drawRectangular(width,length)
      }
    };
    
    if (Object.keys(drawCommandObj).includes(command)) {
      drawCommandObj[command](radius, length);
    }
    duplex.write(`${command}:${radius}`)
  };