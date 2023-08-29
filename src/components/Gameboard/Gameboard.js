import createCell from "./Cell";

const createGameboard = (arr) => {
    const gameboardElement = document.createElement("div");
    gameboardElement.classList.add("gameboard-elem");
  
    arr.forEach((cell) => gameboardElement.appendChild(createCell(cell)));
  
    return gameboardElement;
};

export default createGameboard;
