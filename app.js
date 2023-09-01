import {gameLevels} from "./js/level.js";
import { setScrObj,
    setGameLevel,
    drawScreen,
    drawLevel,
    movePacman,
    getLastEaten,
    clearLastEaten,
    clearScreen,
    drawWin,
    drawScore
} from "./js/screen.js";
import {getPos, getLevelPills, cloneArray} from "./js/utility.js"
import { sObj,
    pacman,
    ghost
} from "./js/config.js";

let currntLevel = 0;
let inGameLevel = [];
let score = 0;
let totLevelPills = 0;
let gameTimer = 0;

class Game {
    constructor(){
        setScrObj(sObj);
        drawScreen();
        setGameLevel([...gameLevels[currntLevel]]);
        drawLevel();
    }
    play = () => {
        inGameLevel = [...gameLevels[currntLevel]];
        setGameLevel(inGameLevel);
        pacman.pos = getPos(inGameLevel,5);
        totLevelPills = getLevelPills(inGameLevel, [4, 3]);

        let moveHandler = (e) => {
            if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
                pacman.pos = movePacman(e.key, pacman.pos);
                this.scoreValidation(moveHandler);
            }
        };

        document.addEventListener("keydown", moveHandler);
        gameTimer = setInterval(() => {
            
        }, 600 / sObj.speed);
    };
    scoreValidation = (moveHandler) => {
        if (getLastEaten == 2) {
            //game over;
        } else {
            if ([4,3].includes(getLastEaten())) {
                pacman.earnedPoints++;
            }
            if (pacman.earnedPoints === totLevelPills) {
                document.addEventListener("keydown", moveHandler, false);
                clearInterval(gameTimer);
                this.win();
            }
            if (getLastEaten() === 4) score += sObj.pointCategory.pill;
            if (getLastEaten() === 3) score += sObj.pointCategory.supperPills;
            if (getLastEaten() === 6) score += sObj.pointCategory.blueGhost;
            clearLastEaten();
            drawScore(score);
        }
    };
    win = () => {
        if (gameLevels.length -1 > currntLevel) {
            currntLevel++;
        } else {
            currntLevel = 0;
        }
        inGameLevel = [];
        pacman.pos = [];
        score = 0;
        pacman.earnedPoints= 0;
        totLevelPills = 0;
        drawWin();
        let resetGame = setInterval(() => {
            clearScreen();
            this.new();
            this.play();
            clearInterval(resetGame);
        }, 3000);
    };
    ghostAutomation = () => {
        //automate ghost movig an set timer for freezed ghost
    };
}

let pacmanGame = new Game();
pacmanGame.play();