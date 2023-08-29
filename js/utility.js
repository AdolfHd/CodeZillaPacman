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

export {getPos};