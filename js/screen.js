let sObj = {};
let canvas, context;
let x = 0, y = 0;
let level = [];

let setScrObj = (screenObj) => {
    sObj = screenObj;
};
let setGameLevel = (gameLevel) => {
    level = gameLevel;
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
                //wall
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
                    Math.PI * 1.85,
                    false
                );
                context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
                context.closePath();
                context.fill();
            } else if (xElem == 2) {
                context.beginPath();
                context.fillStyle = "#6A2CE3";

                context.closePath();
                context.fill();
            }
            x += sObj.dimension;
        }
        y += sObj.dimension;
        x = 0;
    }
};

let movePacman = (dir, pos) => {
    let arrowPosX = 0,
        arrowPosY = 0;
    let nextPos = 0;

    if (dir === "ArrowLeft") {
        arrowPosY = pos[1];
        arrowPosX = pos[0]-1;
    } else if (dir === "ArrowRight") {
        arrowPosY = pos[1];
        arrowPosX = pos[0]+1;;
    } else if (dir === "ArrowUp") {
        arrowPosY = pos[1]-1;
        arrowPosX = pos[0];
    } else if (dir === "ArrowDown") {
        arrowPosY = pos[1]+1;
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
    if (dir === "ArrowLeft") {
        context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.8,
            Math.PI * 0.75,
            Math.PI * 1.25,
            true
        );
    } else if (dir === "ArrowRight") {
        context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.8,
            Math.PI * 0.25,
            Math.PI * 1.75,
            false
        );
    } else if (dir === "ArrowDown") {
        context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.8,
            Math.PI * 0.75,
            Math.PI * 0.25,
            false
        );
    } else if (dir === "ArrowUp") {
        context.arc(
            x + sObj.dimension / 2,
            y + sObj.dimension / 2,
            sObj.dimension / 2.8,
            Math.PI * 1.25,
            Math.PI * 1.75,
            true
        );
    }
    context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
    context.closePath();
    context.fill();
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
export { setScrObj, setGameLevel, drawScreen, drawLevel, movePacman };

/* export { setScrObj, drawScreen, drawLevel }; */
