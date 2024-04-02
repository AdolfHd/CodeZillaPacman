import { ghostsPos, getPos } from "./utility.js";
import { pacman, Ghost } from "./config.js";
let sObj = {};
let canvas, context;
let x = 0, y = 0;//all the game depends on this two,defines the positionament on screen
let portals = [];

let setScrObj = (screenObj) => {
    sObj = screenObj;
};
let setGameLevel = (gameLevel) => {
    portals = [getPos(gameLevel,7), getPos(gameLevel, 8)];
    return gameLevel;
};
let clearScreen = () => {
    sObj = {};
    x = 0;
    y = 0;
};
let drawScore = (level) => {
    context.fillStyle = sObj.backgroundColor;
    //context.fillRect((level[0].length + 1) * sObj.dimension, 54, 80, 40);
    context.fillRect((level.length + 1) * sObj.dimension, 54, 80, 40);
    context.font = "23px monospace";
    context.fillStyle = "yellow";
    //context.fillText(pacman.earnedPoints, (level[0].length + 1) * sObj.dimension, 80);
    context.fillText(pacman.earnedPoints, (level.length + 1) * sObj.dimension, 80);
};
let drawScreen = () => {
    canvas = document.getElementById(sObj.canvasId);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0, 0, sObj.width, sObj.height);
};
let drawLevel = (level) => {
    drawScreen();
    drawScore(level);

    context.fillStyle = "yellow";
    context.font = "23px Arial";
    context.fillText("Score: ", (level[0].length + 1) * sObj.dimension, 50);

    for (const yElem of level) {
        for (const xElem of yElem) {
            if (xElem == 1) {
                context.fillStyle = "blue";
                context.fillRect(x, y, sObj.dimension, sObj.dimension);
            } else if (xElem == 4) {
                drawPill([x, y], "#FEFF9F", 8);
            } else if (xElem == 3) {
                drawPill([x, y], "#2ECC71", 4);
            } else if (xElem == 5) {
                drawPacman(pacman.direction, getPos(level, xElem));
            } else if ([21, 22, 23, 24, 61, 62, 63, 64].includes(xElem)) {//normal
                drawGhost('ArrowUp', getPos(level, xElem));
            }
            x += sObj.dimension;
        }
        y += sObj.dimension;
        x = 0;
    }
    x = 0;
    y = 0;

};
let movePlayer = ({ direction: dir, pos, lastEaten, lastPos, type: elem }, level) => {
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
    clearRect(pos, lastEaten, lastPos);
    if ([0, 3, 4, 21, 22, 23, 24, 61, 62, 63, 64, 7, 8, undefined].includes(nextPos)) {
        if (nextPos == undefined) {
            //if the pacman or ghost are in the portals
            //select the portals and discart the actual player position
            let newPos = portals.filter(portal => pos.toString() != portal.toString())[0];
            level[pos[1]][pos[0]] = lastEaten;
            lastEaten = level[pos[1]][pos[0]];
            level[newPos[1]][newPos[0]]=elem;
            pos = [...newPos];
        } else if (elem === 5 & [0, 3, 4, 61, 62, 63, 64, 7, 8].includes(nextPos)){
            level[arrowPosY][arrowPosX] = elem;
            level[pos[1]][pos[0]] = 0;
            pos = [arrowPosX, arrowPosY];
            lastEaten = nextPos;
        }else{
            console.log("moving ghost");
            level[arrowPosY][arrowPosX] = elem;
            level[pos[1]][pos[0]] = lastEaten;
            pos = [arrowPosX, arrowPosY];
            lastEaten = nextPos;
        }
    }
    if (elem == 5) {
        clearRect(pos, lastEaten, lastPos);
        drawPacman(dir, pos);
    } else {
        clearRect(pos, lastEaten, lastPos, true);
        drawGhost(dir, pos);
    }
    return { pos, lastEaten };
};
let freezeGhosts = (level) => {
    let tmp = 61;
    ghostsPos(level).forEach(pos => {
        level[pos[1] - 1][pos[0] - 1] = tmp;
        tmp++
    });
    let restore = setTimeout(() => {
        let tmp = 21;
        ghostsPos(level).forEach(pos => {
            level[pos[1] - 1][pos[0] - 1] = tmp;
            tmp++;
            drawLevel(level);
        });
    }, 3000);
}
let drawPacman = (dir, pos) => {
    console.log("pacman", pos, dir);
    let thisPos = [(pos[0] * sObj.dimension) + sObj.dimension / 2, (pos[1] * sObj.dimension) + sObj.dimension / 2];
    let conf = [thisPos[0], thisPos[1], sObj.dimension / 2.8, 0, 0, true];
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
    context.lineTo(thisPos[0], thisPos[1]);
    context.closePath();
    context.fill();
}
let drawGhost = (dir, pos, ghostType) => {

    let thisPos = [(pos[0] * sObj.dimension), (pos[1] * sObj.dimension)];
    //dir is for the ghost eyes
    let tmp = (sObj.dimension) - (sObj.dimension / 1.1);
    context.beginPath();
    context.fillStyle = "#e50606";
    if (ghostType > 60) context.fillStyle = "#6A2CE3";
    context.moveTo(thisPos[0] + sObj.dimension - tmp, thisPos[1] + sObj.dimension - tmp);
    context.lineTo(thisPos[0] + sObj.dimension / 2.6, thisPos[1] + sObj.dimension / 2);
    context.arc(
        thisPos[0] + sObj.dimension / 2,
        thisPos[1] + sObj.dimension / 2,
        sObj.dimension / 2.6,
        0,
        Math.PI,
        true
    );
    context.lineTo(thisPos[0] + tmp, thisPos[1] + sObj.dimension - tmp);
    context.lineTo(thisPos[0] + sObj.dimension - tmp, thisPos[1] + sObj.dimension - tmp);
    context.closePath();
    context.fill();
}
let drawPill = (pos, color, size) => {
    // "#FEFF9F",8 for pill 4
    // "#2ECC71",4 for pill 3
    // pos[0] = (pos[0] * sObj.dimension);
    // pos[1] = (pos[1] * sObj.dimension);
    context.beginPath();
    context.fillStyle = color;
    context.arc(
        pos[0] + sObj.dimension / 2,
        pos[1] + sObj.dimension / 2,
        sObj.dimension / size,
        0,
        Math.PI * 2,
        true
    );
    context.closePath();
    context.fill();
}
let drawWin = (level) => {
    context.fillStyle = "yellow";
    context.font = "40px monospace";
    context.fillText("You Win!!", ((level[0].length + 1) * sObj.dimension), 10);
    context.font = "20px monospace";
    context.fillText("Siguiente nivel en 3 segundos", ((level[0].length + 1) * sObj.dimension), 175);
}

let clearRect = (pos, lastEaten, lastPos, ghost = false) => {
    // let cRX = pos[0];
    // let cRY = pos[1];
    context.fillStyle = sObj.backgroundColor;
    if (!ghost) {
        context.fillRect(
            lastPos[0] * sObj.dimension,
            lastPos[1] * sObj.dimension,
            sObj.dimension,
            sObj.dimension
        );
        context.fillRect(
            pos[0] * sObj.dimension,
            pos[1] * sObj.dimension,
            sObj.dimension,
            sObj.dimension
        );
    } else if ([3,4].includes(lastEaten)){
        //temp positions to set
        let color = lastEaten === 4 ? "#FEFF9F" : "#2ECC71";
        let size = lastEaten === 4 ? 8 : 4;
        drawPill(lastPos,color,size);
    }
    // if (dir === "ArrowLeft") {
    //     cRX++;
    // } else if (dir === "ArrowRight") {
    //     cRX--;
    // } else if (dir === "ArrowUp") {
    //     cRY++;
    // } else if (dir === "ArrowDown") {
    //     cRY--;
    // }
    // if (lastEaten !== 0 && entity !== 5){
    //     if (lastEaten === 4) {
    //         drawPill("#FEFF9F",8);
    //     } else if (lastEaten === 3) {
    //         drawPill("#2ECC71",4);
    //     }
    // }else{

    // }
};

let refreshGhostsPos = (level) => {
    let tmpGhosts = ghostsPos(level);
    let tmpGhosPk = [];
    tmpGhosts.forEach(ghost => {
        let tmp = new Ghost();
        tmp.pos = [...ghost];
        tmp.gType = level[ghost[1] - 1][ghost[0] - 1];
        tmpGhosPk.push(tmp);
    });
    return tmpGhosPk;
}
export {
    setScrObj,
    setGameLevel,
    drawScreen,
    drawLevel,
    movePlayer,
    clearScreen,
    drawWin,
    drawScore,
    freezeGhosts,
    refreshGhostsPos,
};
