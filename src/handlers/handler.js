import { drawGet } from "../functions/drawShapes.js";
import { mouseControl } from "../functions/mouseControl.js";

export const parseInput = (data) => {
    console.log(data.toString(), '++++++');
    let [command, ...args] = data.toString().split(" ");
   // console.log("🚀 ~ parseInput ~ args", args)
    //console.log("🚀 ~ parseInput ~ command", command)
    
    if (command.startsWith("mouse_")) {
        mouseControl(command, args)
    } else if(command.startsWith("draw_")) {
        drawGet(command, args)
    }
    
    
  };