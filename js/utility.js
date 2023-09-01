
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
let ghostsPos = (level) => {
    let positions = [];
    let tmpY = 0;
    level.forEach(row => {
        tmpY++;
        var tmpX = 0;
        row.forEach(pos => {
            tmpX++;
            if (pos == 2 | pos ==6) {
                positions.push([tmpX,tmpY]);
            }
        });
    });
    return positions;
};
let getLevelPills = (level, toSearch) => {
    let pillCountr = 0;
    level.forEach((yElem)=>{
        pillCountr += yElem.filter(x => toSearch.includes(x)).length;
    });
    return pillCountr;
};

export {getPos, getLevelPills, ghostsPos};