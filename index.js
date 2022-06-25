import { httpServer } from "./src/http_server/index.js";
import { createWebSocketStream, WebSocketServer } from "ws";
import { parseInput } from "./src/handlers/handler.js";
import 'dotenv/config';

const HTTP_PORT = process.env.PORT || 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Connection accepted!");
 const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
 })
 
 duplex.on("data", (data) => {
    parseInput(data, duplex)
  });

 duplex.on('close', () => {
  console.log("Stream is closed");
 })
});

