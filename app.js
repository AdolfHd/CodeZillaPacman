import {gameLevels} from "./js/level.js";
import { setScrObj,
    setGameLevel,
    drawLevel,
    movePlayer,
    clearScreen,
    drawWin,
    drawScore,
    freezeGhosts,
    refreshGhostsPos
} from "./js/screen.js";
import {getPos,
    getLevelPills,
    turnAround,
    ghostsPos,
} from "./js/utility.js"
import { sObj,
    pacman
} from "./js/config.js";
import { directions } from "./js/constants.js";

let currntLevel = 0;
let inGameLevel = [];
let totLevelPills = 0;
let gameTimer = 0;
let ghostPack = [];

class Game {
    constructor(){
        setScrObj(sObj);
        inGameLevel = setGameLevel([...gameLevels[currntLevel]]);
        drawLevel(inGameLevel);
        pacman.pos = getPos(inGameLevel,5);
        pacman.lastPos = [...pacman.pos];
        ghostPack = refreshGhostsPos(inGameLevel);
    }

    play = () => {
        totLevelPills = getLevelPills(inGameLevel, [4, 3]);
        totLevelPills += getLevelPills(inGameLevel, [3]);
        this.ghostAutomation();

        let moveHandler = (e) => {
            if (directions.includes(e.key)){
                pacman.direction = e.key;
                let {pos:tmpPos, lastEaten:tmpLastEaten} = movePlayer(pacman, inGameLevel);
                if (pacman.pos.toString() != tmpPos.toString()) {
                    pacman.lastPos = [...pacman.pos];
                    pacman.pos = [...tmpPos];
                    pacman.lastEaten = tmpLastEaten;
                    this.scoreValidation(moveHandler);
                }
            }
        };

        document.addEventListener("keydown", moveHandler);
        gameTimer = setInterval(() => {
            
        }, 600 / sObj.speed);
    };

    scoreValidation = (moveHandler) => {
        if (pacman.earnedPoints === totLevelPills) {
            document.addEventListener("keydown", moveHandler, false);
            clearInterval(gameTimer);
            this.win();
        } else if (pacman.lastEaten == 2) {
            //game over;
        } else {
            if (pacman.lastEaten === 4) pacman.earnedPoints += sObj.pointCategory.pill;
            if (pacman.lastEaten === 3) {
                pacman.earnedPoints += sObj.pointCategory.supperPills;
                freezeGhosts(inGameLevel);
                drawLevel(inGameLevel);
            }
            if (pacman.lastEaten === 6) pacman.earnedPoints += sObj.pointCategory.blueGhost;
        }
        drawScore(inGameLevel);
    };

    win = () => {
        if (gameLevels.length -1 > currntLevel) {
            currntLevel++;
        } else {
            currntLevel = 0;
        }
        inGameLevel = [];
        pacman.pos = [];
        pacman.earnedPoints= 0;
        totLevelPills = 0;
        drawWin(inGameLevel);
        let resetGame = setInterval(() => {
            clearScreen();
            this.new();
            this.play();
            clearInterval(resetGame);
        }, 3000);
    };

    ghostAutomation = () => {
        let movmnt = setInterval(() => {
            ghostPack.forEach(ghost => {
                ghost.lastPos = [...ghost.pos];
                let {pos:tmpPos, lastEaten:tmpLastEaten} = movePlayer(ghost, inGameLevel);
                ghost.pos = [...tmpPos];
                ghost.lastEaten = tmpLastEaten;
                if (ghost.lastPos.toString() === ghost.pos.toString()){
                    ghost.direction = turnAround(ghost.direction);
                }
            });
        }, 10000);
    };
    
}

let pacmanGame = new Game();
pacmanGame.play();