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
   defPos: [0,0],
   pos: [0,0],
   lastPoint : -1,
   earnedPoints : 0,
}
class Ghost {
   gType = 21; //6X for a freezed ghost
   scared = false;
   defPos = [0,0];
   position = [0,0];
   lastPoint = -1;
   speedMultiplier = 1;
   direction = "ArrowLeft"
}

export {sObj, pacman, Ghost};