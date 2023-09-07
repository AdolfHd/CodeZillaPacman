import {gameLevels} from "./js/level.js";
import { setScrObj,
    setGameLevel,
    drawLevel,
    moveEntity,
    getLastEaten,
    clearScreen,
    drawWin,
    drawScore,
    freezeGhosts,
    refreshGhostsPos
} from "./js/screen.js";
import {getPos, getLevelPills} from "./js/utility.js"
import { sObj,
    pacman,
    Ghost
} from "./js/config.js";

let currntLevel = 0;
let inGameLevel = [];
let totLevelPills = 0;
let gameTimer = 0;
let ghostPack = [];

class Game {
    constructor(){
        setScrObj(sObj);
        setGameLevel([...gameLevels[currntLevel]]);
        drawLevel();
    }
    play = () => {
        inGameLevel = [...gameLevels[currntLevel]];
        setGameLevel(inGameLevel);
        pacman.pos = getPos(inGameLevel,5);
        totLevelPills = getLevelPills(inGameLevel, [4, 3]);
        totLevelPills += getLevelPills(inGameLevel, [3]);
        this.ghostAutomation();
        let moveHandler = (e) => {
            if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
                pacman.direction = e.key;
                let tmpPos = moveEntity(e.key, pacman.pos, pacman.lastPoint);
                if (pacman.pos.toString() != tmpPos.toString()) {
                    pacman.pos = tmpPos;
                    this.scoreValidation(moveHandler);
                }
            }
            console.log(pacman);
            console.warn(ghostPack);
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
        } else if (getLastEaten() == 2) {
            //game over;
        } else {
            if (getLastEaten() === 4) pacman.earnedPoints += sObj.pointCategory.pill;
            if (getLastEaten() === 3) {
                pacman.earnedPoints += sObj.pointCategory.supperPills;
                freezeGhosts();
                ghostPack = refreshGhostsPos();
                drawLevel();
            }
            if (getLastEaten() === 6) pacman.earnedPoints += sObj.pointCategory.blueGhost;
        }
        drawScore();
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
        drawWin();
        let resetGame = setInterval(() => {
            clearScreen();
            this.new();
            this.play();
            clearInterval(resetGame);
        }, 3000);
    };
    ghostAutomation = () => {
        ghostPack = refreshGhostsPos();
        let movmnt = setInterval(() => {
            ghostPack.forEach(ghost => {
                let tmpPos = moveEntity(ghost.direction, ghost.position, pacman.lastPoint,ghost.gType);
                if (ghost.position.toString() == tmpPos.toString()) {
                    let directions = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
                    ghost.direction = directions[Math.floor(Math.random()*directions.length)];
                }
                ghost.position = tmpPos;
            });
            drawLevel();
        }, 10000);
    };
    
}

let pacmanGame = new Game();
pacmanGame.play();