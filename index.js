import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Connection accepted!");
  const mouseObj = {
    up: "mouse_up",
    down: "mouse_down",
    left: "mouse_left",
    right: "mouse_right",
  };
  const parseInput = (data) => {
    let [direction, step] = data.split(" ");
  };
  
  const drawCircle = radius => {
    const mousePos = robot.getMousePos();

    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        
        const x = mousePos.x + (radius * Math.cos(i)) ;
        const y = mousePos.y + (radius * Math.sin(i));
        
        robot.mouseToggle("down");
        robot.dragMouse(x - radius, y);
         
    }
    robot.mouseToggle("up");
};
  const mouseControl = (data) => {
    let [direction, step] = data.toString().split(" ");
    const mousePos = robot.getMousePos();

    switch (direction) {
      case "mouse_up":
        robot.moveMouseSmooth(mousePos.x, mousePos.y - +step);
        ws.send(data.toString());
        break;
      case "mouse_down":
        ws.send(data.toString());
        robot.moveMouseSmooth(mousePos.x, mousePos.y + +step);
        break;
      case "mouse_left":
        ws.send(data.toString());
        robot.moveMouseSmooth(mousePos.x - +step, mousePos.y);
        break;
      case "mouse_right":
        ws.send(data.toString());
        robot.moveMouseSmooth(mousePos.x + +step, mousePos.y);
        break;
      default:
        ws.send(`mouse_position ${mousePos.x},${mousePos.y}`);
        break;
    }
  };

  ws.on("message", (data) => {
    console.log(data.toString());
    if (data.toString().startsWith("mouse_")) {
      mouseControl(data);
    } else if(data.toString().startsWith("draw_circle")){
        drawCircle(200)
    }
  });
});
