import {gameLevels} from "./js/level.js";
import { setScrObj,
    setGameLevel,
    drawLevel,
    movePacman,
    getLastEaten,
    clearLastEaten,
    clearScreen,
    drawWin,
    drawScore,
    freezeGhosts
} from "./js/screen.js";
import {getPos, getLevelPills, ghostsPos} from "./js/utility.js"
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
        this.ghostAutomation(ghostsPos(inGameLevel));
        let moveHandler = (e) => {
            if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
                pacman.direction = e.key;
                pacman.pos = movePacman(e.key, pacman.pos, true);
                this.scoreValidation(moveHandler);
            }
        };

        document.addEventListener("keydown", moveHandler);
        gameTimer = setInterval(() => {
            
        }, 600 / sObj.speed);
        
    };
    scoreValidation = (moveHandler) => {
        if (getLastEaten() == 2) {
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
            if (getLastEaten() === 4) pacman.earnedPoints += sObj.pointCategory.pill;
            if (getLastEaten() === 3) {
                pacman.earnedPoints += sObj.pointCategory.supperPills;
                freezeGhosts();
                drawLevel();
            }
            if (getLastEaten() === 6) pacman.earnedPoints += sObj.pointCategory.blueGhost;
        }
        clearLastEaten();
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
    ghostAutomation = (pos) => {
        pos.forEach(ghost => {
            let tmp = new Ghost(ghost);
            ghostPack.push(tmp);
        });
        ghostPack.forEach(element => {
            /* let ghstd = setInterval(() => {
                element.move();
            }, 1000); */
        });
    };
}

let pacmanGame = new Game();
pacmanGame.play();