import robot from "robotjs";

const sleep = (ms:number) => new Promise((r) => setTimeout(r, ms));

export const drawCircle = async (radius:number) => {
  let { x, y } = robot.getMousePos();
  robot.mouseClick();
  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const coordinateX = (x + radius * Math.cos(i)) - radius;   
    const coordinateY = y + radius * Math.sin(i);
    
    robot.mouseToggle("down");
    robot.dragMouse(coordinateX, coordinateY);
  }
  robot.mouseToggle("up");
};

export const drawSquare = async (width:number) => {
  let { x, y } = robot.getMousePos();

  robot.mouseClick();
  await sleep(1000);
  robot.mouseToggle("down");
    
  robot.dragMouse(x + width, y);                 //right
  await sleep(200);
  robot.dragMouse(x + width, y + width);         //down
  await sleep(200);
  robot.dragMouse(x, y + width);                 //left
  await sleep(200);
  robot.dragMouse(x, y);                         //up
  await sleep(200);

  robot.mouseToggle("up");
};

export const drawRectangular = async (width:number, length:number) => {
  let { x, y } = robot.getMousePos();

  robot.mouseClick();
  await sleep(1000);
  robot.mouseToggle("down");

  robot.dragMouse(x + width, y);                 //right
  await sleep(200);
  robot.dragMouse(x + width, y + length);        //down
  await sleep(200);
  robot.dragMouse(x, y + length);                //left
  await sleep(200);
  robot.dragMouse(x, y);                         //up
  await sleep(200);
  
  robot.mouseToggle("up");
};
