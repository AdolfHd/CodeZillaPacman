import { ghostsPos, getPos } from "./utility.js";
import { pacman, Ghost } from "./config.js";
let sObj = {};
let canvas, context;
let x = 0, y = 0;
let level = [];
let lastEaten = 0;
let portals = [];

let setScrObj = (screenObj) => {
    sObj = screenObj;
};
let setGameLevel = (gameLevel) => {
    level = structuredClone(gameLevel);
    portals = [getPos(level,7),getPos(level,8)];
};
let getLastEaten = () => {
    return lastEaten;
};
let clearLastEaten = () => {
    lastEaten = 0;
};
let clearScreen = () => {
    sObj = {};
    x = 0;
    y = 0;
    level = [];
    lastEaten = 0;
};
let drawScore = () => {
    context.fillStyle = sObj.backgroundColor;
    context.fillRect((level[0].length + 1) * sObj.dimension, 54, 80, 40);
    context.font = "23px monospace";
    context.fillStyle = "yellow";
    context.fillText(pacman.earnedPoints, (level[0].length + 1) * sObj.dimension, 80);
};
let drawScreen = () => {
    canvas = document.getElementById(sObj.canvasId);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0, 0, sObj.width, sObj.height);
};
let drawLevel = () => {

    drawScreen();
    drawScore();

    context.fillStyle = "yellow";
    context.font = "23px Arial";
    context.fillText("Score: ", (level[0].length + 1) * sObj.dimension, 50);

    for (const yElem of level) {
        for (const xElem of yElem) {
            if (xElem == 1) {
                context.fillStyle = "blue";
                context.fillRect(x, y, sObj.dimension, sObj.dimension);
            } else if (xElem == 4) {
                context.beginPath();
                context.fillStyle = "#FEFF9F";
                context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension / 8,
                    0,
                    Math.PI * 2,
                    true
                );
                context.closePath();
                context.fill();
            } else if (xElem == 3) {
                context.beginPath();
                context.fillStyle = "#2ECC71";
                context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension / 4,
                    0,
                    Math.PI * 2,
                    true
                );
                context.closePath();
                context.fill();
            } else if (xElem == 5) {
                drawEntity(pacman.direction, getPos(level,5),true,xElem);
            } else if ([21,22,23,24,61,62,63,64].includes(xElem)) {//normal
                drawEntity('ArrowLeft', [x+sObj.dimension, y+sObj.dimension],true,xElem);
            }
            x += sObj.dimension;
        }
        y += sObj.dimension;
        x = 0;
    }
    x = 0;
    y = 0;

};
let moveEntity = (dir, pos, elem = 5 ) => {
    let arrowPosX = 0,
        arrowPosY = 0;
    let nextPos = 0;

    if (dir === "ArrowLeft") {
        arrowPosY = pos[1];
        arrowPosX = pos[0] - 1;
    } else if (dir === "ArrowRight") {
        arrowPosY = pos[1];
        arrowPosX = pos[0] + 1;
    } else if (dir === "ArrowUp") {
        arrowPosY = pos[1] - 1;
        arrowPosX = pos[0];
    } else if (dir === "ArrowDown") {
        arrowPosY = pos[1] + 1;
        arrowPosX = pos[0];
    }
    nextPos = level[arrowPosY][arrowPosX];
    if ([0, 3, 4, 61, 62, 63, 64, 7, 8, undefined].includes(nextPos) ) {
        level[pos[1]][pos[0]] = lastEaten;
        if (nextPos == undefined){
            clearRect(dir,pos);
            pos = portals.filter(POS => pos.toString() != POS.toString())[0];
            level[pos[1]][pos[0]] = elem;
            lastEaten = level[pos[1]][pos[0]];
        } else {
            level[arrowPosY][arrowPosX] = elem;
            if(elem == 5) level[pos[1]][pos[0]] = 0;
            pos = [arrowPosX, arrowPosY];
            lastEaten = nextPos;
        }
        console.log(elem,lastEaten);
        drawEntity(dir, pos, false, elem);
    };
    return pos;
};
let freezeGhosts = () => {
    let tmp = 61;
    ghostsPos(level).forEach(pos => {
        level[pos[1]-1][pos[0]-1] = tmp;
        tmp ++
    });
    let restore = setTimeout(() => {
        let tmp = 21;
        ghostsPos(level).forEach(pos => {
            level[pos[1]-1][pos[0]-1] = tmp;
            tmp++;
            drawLevel();
        });
    }, 3000);
}
let drawEntity = (dir, pos, first = false, entity = 5) => {
    if (!first) clearRect(dir, pos);
    if (entity == 5) {
        let x = pos[0] * sObj.dimension;
        let y = pos[1] * sObj.dimension;
        let conf = [x + sObj.dimension / 2, y + sObj.dimension / 2, sObj.dimension / 2.8, 0, 0, true];
        if (dir === "ArrowLeft") {
            conf[3] = Math.PI * 0.75;
            conf[4] = Math.PI * 1.25;
        } else if (dir === "ArrowRight") {
            conf[3] = Math.PI * 1.75;
            conf[4] = Math.PI * 0.25;
        } else if (dir === "ArrowDown") {
            conf[3] = Math.PI * 0.25;
            conf[4] = Math.PI * 0.75;
        } else if (dir === "ArrowUp") {
            conf[3] = Math.PI * 1.25;
            conf[4] = Math.PI * 1.75;
        }
        context.beginPath();
        context.fillStyle = "yellow";
        context.arc(...conf);
        context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
        context.closePath();
        context.fill();
    } else{
        let tmp = (sObj.dimension)-(sObj.dimension /1.1);
        context.beginPath();
        context.fillStyle = "#e50606";
        if (entity > 60)context.fillStyle = "#6A2CE3";
        context.moveTo(x+sObj.dimension - tmp, y+sObj.dimension - tmp);
        context.lineTo(x + sObj.dimension / 2.6, y + sObj.dimension / 2);
        context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.6,
            0,
            Math.PI,
            true
        );
        context.lineTo(x + tmp, y + sObj.dimension - tmp);
        context.lineTo(x+sObj.dimension - tmp, y+sObj.dimension - tmp);
        context.closePath();
        context.fill();
    }
}
let drawWin = () => {
    context.fillStyle = "yellow";
    context.font = "40px monospace";
    context.fillText("You Win!!", ((level[0].length + 1)* sObj.dimension), 10);
    context.font = "20px monospace";
    context.fillText("Siguiente nivel en 3 segundos", ((level[0].length + 1)* sObj.dimension), 175);
}
let clearRect = (dir, pos) => {
    let cRX = pos[0];
    let cRY = pos[1];
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(
        pos[0] * sObj.dimension,
        pos[1] * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
    if (dir === "ArrowLeft") {
        cRX++;
    } else if (dir === "ArrowRight") {
        cRX--;
    } else if (dir === "ArrowUp") {
        cRY++;
    } else if (dir === "ArrowDown") {
        cRY--;
    }
    context.fillRect(
        cRX * sObj.dimension,
        cRY * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
};
let refreshGhostsPos = () => {
    let tmpGhosts = ghostsPos(level);
    let tmpGhosPk = [];
    tmpGhosts.forEach(ghost => {
        let tmp = new Ghost();
        tmp.position = ghost;
        tmp.gType = level[ghost[1]-1][ghost[0]-1];
        tmpGhosPk.push(tmp);
    });
    console.warn(tmpGhosPk);
    return tmpGhosPk;
}
export { setScrObj,
    setGameLevel,
    drawScreen,
    drawLevel,
    moveEntity,
    getLastEaten,
    clearLastEaten,
    clearScreen,
    drawWin,
    drawScore,
    freezeGhosts,
    refreshGhostsPos,
};
