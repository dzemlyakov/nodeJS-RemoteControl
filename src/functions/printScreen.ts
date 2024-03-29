import Jimp from "jimp";
import robot, { Bitmap } from "robotjs";
import { Duplex } from "../types/types";
import { SOMETHING_WRONG } from "../utils/constants";

export const printScreen = async (duplex:Duplex) => {
try {
    const { x, y } = robot.getMousePos();
    let data:any = [];
    const size = 200;
    
    const {width, height, image} = robot.screen.capture(x, y, size, size);
    let bitmap = image;
   
    //   Convert BGR to RGB
    for (let i = 0; i < bitmap.length; i += 4) {  
          data.push(bitmap[i+2], bitmap[i+1],bitmap[i],bitmap[i+3]) 
      }
      
    let jimp = new Jimp(width, height);
    jimp.bitmap.data = data

    const imageBase64 = await jimp.getBase64Async(Jimp.MIME_PNG);
    let imageBase64Formated = imageBase64.split(",")[1];
    
    duplex.write(`prnt_scrn ${imageBase64Formated}\0`);
} catch (err) {
    console.log(SOMETHING_WRONG);
}
};
