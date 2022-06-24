import robot from "robotjs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const drawCircle = async (radius) => {
  let { x, y } = robot.getMousePos();
  robot.mouseClick();
  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const coordinateX = x + radius * Math.cos(i) - radius;
    const coordinateY = y + radius * Math.sin(i);
    
    robot.mouseToggle("down");
    robot.dragMouse(coordinateX, coordinateY);
  }
  robot.mouseToggle("up");
};

export const drawSquare = async (width) => {
  let { x, y } = robot.getMousePos();

  robot.mouseClick();
  await sleep(1000);
  robot.mouseToggle("down");
    
  robot.dragMouse(x + width, y);
  await sleep(200);
  robot.dragMouse(x + width, y + width);
  await sleep(200);
  robot.dragMouse(x, y + width);
  await sleep(200);
  robot.dragMouse(x, y);
  await sleep(200);

  robot.mouseToggle("up");
};

export const drawRectangular = async (width, length) => {
  let { x, y } = robot.getMousePos();

  robot.mouseClick();
  await sleep(1000);
  robot.mouseToggle("down");

  robot.dragMouse(x + width, y);
  await sleep(200);
  robot.dragMouse(x + width, y + length);
  await sleep(200);
  robot.dragMouse(x, y + length);
  await sleep(200);
  robot.dragMouse(x, y);
  await sleep(200);
  
  robot.mouseToggle("up");
};



// export const drawSquare = async (width) => {
//     let { x, y } = robot.getMousePos();
  
   
//     let obj = {
//       right(){
//           return robot.dragMouse(x + width, y)
//       },
//       down(){
//           return robot.dragMouse(x + width, y + width)
//       },
//       left(){
//           return robot.dragMouse(x, y + width)
//       },
//       up(){
//           return  robot.dragMouse(x, y)
//       }
      
//     }
//     robot.mouseClick();
//     await sleep(1000);
//     robot.mouseToggle("down");
      
//         console.log( Object.keys(obj));
//     for(let move in obj){
//           console.log("🚀 ~ drawSquare ~ move", move)
//           // await sleep(100)
          
//           return obj[move]
//          } 
    
//   //  Object.keys(obj).forEach(async (item) => {
//   //     await sleep(1000);
//   //     console.log("🚀 ~ iterat ~ obj[item]", obj[item])
//   //     return obj[item]()
//   //   })
      
//     //   for (let index = 0; index < arr.length; index++) {
//   //     arr[index]
//   //     await sleep(2000 * index)
      
//   //   }
//   //   robot.dragMouse(x + width, y);
//   //   await sleep(200);
//   //   robot.dragMouse(x + width, y + width);
//   //   await sleep(200);
//   //   robot.dragMouse(x, y + width);
//   //   await sleep(200);
//   //   robot.dragMouse(x, y);
//   //   await sleep(200);
// let arr = [
//     robot.dragMouse(x + width, y),
//     robot.dragMouse(x + width, y + width),
//     robot.dragMouse(x, y + width),
//     robot.dragMouse(x, y)
//     ]
  
//   robot.mouseToggle("up");
//   };
  
// //   export const drawRectangular = async(width, length) => {
// //     let { x, y } = robot.getMousePos();
  
// //     robot.mouseClick();
// //     await sleep(1000);
// //     robot.mouseToggle("down");
  
  
// //     robot.dragMouse(x + width, y);
// //     await sleep(200);
// //     robot.dragMouse(x + width, y + length);
// //     await sleep(200);
// //     robot.dragMouse(x, y + length);
// //     await sleep(200);
// //     robot.dragMouse(x, y);
// //     await sleep(200);
// //     robot.mouseToggle("up");
// //   };
// robot.moveMouseSmooth(x + width, y);
// await sleep(200);
// robot.moveMouseSmooth(x + width, y + width);
// await sleep(200);
// robot.moveMouseSmooth(x, y + width);
// await sleep(200);
// robot.moveMouseSmooth(x, y);
// await sleep(200);