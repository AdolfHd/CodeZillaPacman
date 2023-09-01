let sObj = {
   height : 1000,
   width : 600,
   backgroundColor: "black",
   canvasId: "canvas0",
   dimension: 20,
   speed: 2,
   pointCategory: {
      blueGhost: 5,
      pill: 1,
      supperPills: 2,
      time: 2
   }
};
let pacman = {
   lifes : 1,
   direction  : "ArrowRight",
   pos: [0,0],
   earnedPoints : 0,
}
class Ghost {
   constructor(position){
      let gType = 2; //6 fro a freezed ghost
      let scared = false;
      let pos = position;
      let speedMultiplier = 1;
      let direction = "ArrowLeft"
   }
   freeze = () => {
      this.scared = !this.scared;
   };
   move = () => {
      console.warn("moving randomly ghsts");
   };
}

export {sObj, pacman, Ghost};