import { gameController } from "../game/game";

let gameboardArr = Array.from({ length: 9 }, (_, index) => ({
    mark: "",
    index,
}));

const playersArr = [
    {
      name: "PLAYER 1",
      mark: "x",
      isHuman: true,
      isWinner: false,
      color: "#31C3BD",
      score: 0,
    },
    {
      name: "PLAYER 2",
      mark: "o",
      isHuman: false,
      isWinner: false,
      color: "#F2B137",
      score: 0,
    },
    {
      name: "TIES",
      score: 0,
    },
];

let currentPlayer = playersArr[0];

let winningCombination = [];

const changeCurrentPlayer = (arr) => {
    currentPlayer === arr[0]
      ? (currentPlayer = arr[1])
      : (currentPlayer = arr[0]);
};

const nextRound = () => {
    playersArr[0].isWinner = false;
    playersArr[1].isWinner = false;
    currentPlayer = playersArr[0];
    gameboardArr = Array.from({ length: 9 }, (_, index) => ({ mark: "", index }));
    winningCombination = [];
  
    gameController(gameboardArr);
};

const checkWinner = (arr, players) => {
    let isWin = false;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    winningCombinations.forEach((comb) => {
      if (
        arr[comb[0]].mark === arr[comb[1]].mark &&
        arr[comb[1]].mark === arr[comb[2]].mark &&
        comb.every((index) => arr[index].mark)
      ) {
        isWin = true;
        winningCombination = comb;
      }
    });
  
    if (isWin) {
      currentPlayer.isWinner = true;
      currentPlayer.score++;
      return "win";
    }
  
    if (arr.every((cell) => cell.mark)) {
      players[2].score++;
      return "draw";
    }
    return false;
};

const isAnyWinner = () => {
    return playersArr.some((player) => player.isWinner);
};

const restartGame = () => {
    gameboardArr = Array.from({ length: 9 }, (_, index) => ({ mark: "", index }));
    playersArr.forEach(player => player.score = 0);
  
    nextRound();
}

export {
    gameboardArr,
    playersArr, 
    currentPlayer, 
    winningCombination,
    changeCurrentPlayer,
    nextRound,
    checkWinner,
    isAnyWinner,
    gameController,
    restartGame
};