let sObj = {};
let canvas, context;
let x = 0, y = 0;
let level = [];
let lastEaten = 0;

let setScrObj = (screenObj) => {
    sObj = screenObj;
};
let setGameLevel = (gameLevel) => {
    level = gameLevel;
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
let drawScore = (score) => {
    console.log(typeof(context.fillText));
    context.fillStyle = sObj.backgroundColor;
    context.fillRect((level[0].length + 4) * sObj.dimension, 34, 40, 20);
    context.fillStyle = "yellow"
    context.font = "23px Arial";
    context.fillText = (score, (level[0].length + 1) * sObj.dimension, 50);
};
let drawScreen = () => {
    canvas = document.getElementById(sObj.canvasId);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0, 0, sObj.width, sObj.height);
};
let drawLevel = (gLevels, cLevel) => {

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
                context.beginPath();
                context.fillStyle = "yellow";
                context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension / 2.8,
                    Math.PI * 0.15,
                    Math.PI * 1.75,
                    false
                );
                context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
                context.closePath();
                context.fill();
            } else if (xElem == 2) {
                let tmp = (sObj.dimension)-(sObj.dimension /1.1);
                context.beginPath();
                context.fillStyle = "#6A2CE3";
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
                /* context.stroke(); */
            }
            x += sObj.dimension;
        }
        y += sObj.dimension;
        x = 0;
    }

    context.fillStyle = "yellow";
    context.font = "23px Arial";
    context.fillText = ("Score: ", (level[0].length + 1) * sObj.dimension, 50);
};

let movePacman = (dir, pos) => {
    let arrowPosX = 0,
        arrowPosY = 0;
    let nextPos = 0;

    if (dir === "ArrowLeft") {
        arrowPosY = pos[1];
        arrowPosX = pos[0] - 1;
    } else if (dir === "ArrowRight") {
        arrowPosY = pos[1];
        arrowPosX = pos[0] + 1;;
    } else if (dir === "ArrowUp") {
        arrowPosY = pos[1] - 1;
        arrowPosX = pos[0];
    } else if (dir === "ArrowDown") {
        arrowPosY = pos[1] + 1;
        arrowPosX = pos[0];
    }
    nextPos = level[arrowPosY][arrowPosX];

    if ([0, 3, 4, 6].includes(nextPos)) {
        level[pos[1]][pos[0]] = 0;
        level[arrowPosY][arrowPosX] = 5;
        pos = [arrowPosX, arrowPosY];
        drawPacman(dir, pos);
    }
    return pos;
};
let drawPacman = (dir, pos) => {
    let x = pos[0] * sObj.dimension;
    let y = pos[1] * sObj.dimension;

    clearRect(dir, pos);

    context.beginPath();
    context.fillStyle = "yellow";
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
    context.arc(...conf);
    context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
    context.closePath();
    context.fill();
}
let drawWin = () => {
    console.log(context);
    console.log(typeof(context.fillText));
    console.log(canvas);
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
export { setScrObj,
    setGameLevel,
    drawScreen,
    drawLevel,
    movePacman,
    getLastEaten,
    clearLastEaten,
    clearScreen,
    drawWin,
    drawScore
};
