let getPos = (level, toSearch) => {
    let pos = [];
    let foundIt= false;
    level.forEach((element, idx1) => {
        if (!foundIt) {
            pos[0] = element.findIndex((val, idx) => foundIt = val === toSearch);
            pos[1] = pos[0] != null ? idx1 : null;
        };
    });
    return pos;
};

let blockScrollPage = ()=>{
    window.addEventListener( 'keydown', (e) => {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1){
            e.preventDefault();
        }
    },
    false
    );
};
export {getPos, blockScrollPage};