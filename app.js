import {gameLevels} from "./js/level.js";
import {setScrObj, drawScreen, drawLevel, setGameLevel, movePacman} from "./js/screen.js";
import {getPos, blockScrollPage} from "./js/utility.js"

let currntLevel = 0;
let inGameLevel = [];
let pacmanPos = [];

let sObj = {
    height: 500,
    width: 600,
    backgroundColor: "black",
    canvasId: "canvas0",
    dimension: 10
}

class Game {
    constructor(){
        setScrObj(sObj);
        drawScreen();
        blockScrollPage();
        setGameLevel([...gameLevels[currntLevel]]);
        drawLevel();
    }
    play = () => {
        inGameLevel = [...gameLevels[currntLevel]];
        setGameLevel(inGameLevel);
        pacmanPos = getPos(inGameLevel,5);

        document.addEventListener("keydown", (e) => {
            pacmanPos = movePacman(e.key, pacmanPos);
        });
    };

}

let pacmanGame = new Game();
pacmanGame.play();