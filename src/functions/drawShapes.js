import robot from "robotjs";
import { mouseControl } from "./mouseControl.js";

export const drawGet = (command, args) =>{
    let dimensionsInNumberArray = args.map(Number)
    let [ radius, length = 0 ] = dimensionsInNumberArray
    const drawCommandObj = {
        draw_circle(radius){
            drawCircle(radius)
            },
         draw_square(width){
            drawSquare(width)
         }   
        }
    if (Object.keys(drawCommandObj).includes(command)){
        drawCommandObj[command](radius)
        
    }
}

export const drawCircle = (radius) => {
    let { x, y } = robot.getMousePos();
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        
        const coordinateX = x + (radius * Math.cos(i)) - radius;
        const coordinateY = y + (radius * Math.sin(i));
    
        robot.mouseToggle("down");
        robot.mouseToggle("down");
        robot.dragMouse(coordinateX , coordinateY);
         
    }
    robot.mouseToggle("up");
};


const sleep = ms => new Promise(r => setTimeout(r, ms));
export const drawSquare = async (width) => {

    let { x, y } = robot.getMousePos();
    console.log("🚀 ~ drawSquare ~ y", y)
    console.log("🚀 ~ drawSquare ~ x", x)
   
    robot.mouseToggle("down");
    await sleep(1000)
    robot.mouseToggle("down");
    
    // robot.dragMouse(x - width,y);
    // console.log("🚀 ~ left ~ x", x)
    // await sleep(1000)
    
    // robot.dragMouse(x, y - width);
    // console.log("🚀 ~ up ~ x", x)
    // await sleep(1000)
    
    // robot.dragMouse(x + width, y);
    // await sleep(1000)
    
    // robot.dragMouse(x , y + width);
    // await sleep(1000)
 
    robot.dragMouse(x + width, y);
   await sleep(150)
  robot.dragMouse(x + width, y + width);
   await sleep(150)
  robot.dragMouse(x, y + width);
   await sleep(150)
  robot.dragMouse(x, y);
   await sleep(150)
   robot.mouseToggle("up");

}

export const drawLine = ( end) =>{
    let { x, y } = robot.getMousePos();
    // robot.mouseToggle("up");
    for (let i = 0; i < end; i++) {
    
    const coordinateX = x - end 
    const coordinateY = y
    robot.mouseToggle("down");
    robot.dragMouse(coordinateX , coordinateY);
}
    
}

// robot.dragMouse(x - width,y);
// robot.dragMouse(x, y - width);
// robot.dragMouse(x + width, y);
// robot.dragMouse(x , y + width);