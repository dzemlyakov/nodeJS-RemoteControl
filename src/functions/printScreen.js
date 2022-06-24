import Jimp from "jimp";
import robot from "robotjs";

export const printScreen = async (duplex) => {
  const { x, y } = robot.getMousePos();
  const size = 200;
  const image = robot.screen.capture(x, y, size, size);
  let data = [];
  let bitmap = image.image;
    
  for (let i = 0; i < bitmap.length; i += 4) {
        data.push(bitmap[i+2], bitmap[i+1],bitmap[i],bitmap[i+3]) 
    }
    
    console.log("🚀 ~ printScreen ~ data", data)
  const jimp = new Jimp(image.width, image.height);

  jimp.bitmap.data = data
  const imageBase64 = await jimp.getBase64Async(Jimp.MIME_PNG);

  let base = imageBase64.split(",")[1];
  console.log("🚀 ~ printScreen ~ base", base);

  duplex.write(`prnt_scrn ${base}\0`);
};
