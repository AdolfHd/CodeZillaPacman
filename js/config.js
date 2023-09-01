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
   pos: [0,0],
   earnedPoints : 0,
}
let ghost = {
   gType : 2, //6
   scared : false,
   speedMultiplier: 1,
}

export {sObj, pacman, ghost};