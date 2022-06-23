import robot from 'robotjs';

export const parseInput = (data) => {
    
    let [command, ...args] = data.toString().split(" ");
   // console.log("🚀 ~ parseInput ~ args", args)
    //console.log("🚀 ~ parseInput ~ command", command)
    
    switch (true) {
        case command.startsWith("mouse_"):
        mouseControl(command, args)
            break;
       /// case command.startsWith("draw_"):
            
        //    break;
       // case command.startsWith("prnt_"):
            
        //    break;        
        default:
            break;
    }
    
  };


  export const mouseControl = (direction, args) => {
      let { x, y } = robot.getMousePos();
      const step = Number(args[0]) || 0

    
    const mouseCommandObj = {
        mouse_up() {
            return y = y - step
        }, 
        mouse_down(){
            return y = y + step
        },
        mouse_left() {
            return x = x - step
        },
        mouse_right() {
            return x = x + step
        }
      }
    
      if(Object.keys(mouseCommandObj).includes(direction)){
       
        mouseCommandObj[direction]()
        
        robot.moveMouse(x,y)
    }else{
        const mousePosition = `mouse_position ${x},${y}`
        return { mousePosition } 
    }  
        
  }

