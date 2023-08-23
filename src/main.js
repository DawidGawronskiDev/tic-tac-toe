import "./style.css";

const root = document.querySelector("#root");

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
let gameboardArr = Array.from({ length: 9 }, (_, index) => ({
  mark: "",
  index,
}));
let winningCombination = [];

const createGameboard = (arr) => {
  const gameboardElement = document.createElement("div");
  gameboardElement.classList.add("gameboard-elem");

  arr.forEach((cell) => gameboardElement.appendChild(createCell(cell)));

  return gameboardElement;
};

const createCell = (cell) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("gameboard-cell");
  cellElement.dataset.mark = cell.mark;

  if (cell.mark === "x") {
    cellElement.innerHTML = `<svg class="x-icon" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>`;
  }
  if (cell.mark === "o") {
    cellElement.innerHTML = `<svg class="o-icon" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/></svg>`;
  }

  return cellElement;
};

const createScoreboard = (players) => {
  const scoreboardElement = document.createElement("div");
  scoreboardElement.classList.add("scoreboard");

  players.forEach((player) =>
    scoreboardElement.appendChild(createScore(player))
  );

  return scoreboardElement;
};

const createScore = (player) => {
  const scoreElement = document.createElement("div");
  scoreElement.classList.add("score");

  if (player.mark) {
    const playerMark = player.mark === "x" ? "X" : "O";

    scoreElement.innerHTML = `
      <span class="heading-body">${playerMark} (${player.name})</span>
      <span class="heading-m">${player.score}<span>
    `;

    return scoreElement;
  }

  scoreElement.innerHTML = `
      <span class="heading-body">${player.name}</span>
      <span class="heading-m">${player.score}<span>
    `;

  return scoreElement;
};

import Logo from "./assets/logo.svg";
import Restart from "./assets/icon-restart.svg";

const createTurnDisplay = (currentPlayer) => {
  const turnDisplayElement = document.createElement("div");
  turnDisplayElement.classList.add("turn-display");

  const header = new Image();
  header.src = Logo;
  turnDisplayElement.appendChild(header);

  const turnElement = document.createElement("div");
  turnElement.classList.add("turn-elem");
  turnElement.innerHTML =
    currentPlayer.mark === "x"
      ? `<div class="turn-mark" data-mark="x"></div>`
      : `<div class="turn-mark" data-mark="o"></div>`;
  turnDisplayElement.appendChild(turnElement);
  turnElement.innerHTML += "<span>TURN</span>";

  const restartButton = document.createElement("button");
  restartButton.classList.add("restart-button");

  const restartIcon = new Image();
  restartIcon.src = Restart;
  restartButton.appendChild(restartIcon);
  turnDisplayElement.appendChild(restartButton);

  return turnDisplayElement;
};

const renderGame = () => {
  root.innerHTML = "";
  root.appendChild(createTurnDisplay(currentPlayer));
  root.appendChild(createGameboard(gameboardArr));
  root.appendChild(createScoreboard(playersArr));
};

const changeCurrentPlayer = (arr) => {
  currentPlayer === arr[0]
    ? (currentPlayer = arr[1])
    : (currentPlayer = arr[0]);
};

const playerChoice = (arr) => {
  bindCellElements(arr);
};

const cpuChoice = (arr) => {
  const emptyCells = arr.reduce((newArr, cell) => {
    if (!cell.mark) {
      newArr.push(cell.index);
    }
    return newArr;
  }, []);

  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  arr[randomIndex].mark = currentPlayer.mark;

  setTimeout(() => {
    checkWinner(arr, playersArr);
    changeCurrentPlayer(playersArr);
    gameController(arr);
  }, 300);
};

const renderWinningCells = (arr) => {
  const cells = Array.from(document.querySelectorAll(".gameboard-cell"));

  arr.forEach((index) => cells[index].classList.add("winning-cell"));

  return;
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

const createPopup = () => {
  const popupElement = document.createElement("div");
  popupElement.classList.add("popup");

  // IF PLAYER WIN
  if (isAnyWinner()) {
    changeCurrentPlayer(playersArr);

    const winnerIcon =
      currentPlayer.mark === "x"
        ? `<svg class="x-icon" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill-rule="evenodd"/></svg>`
        : `<svg class="o-icon" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"/></svg>`;

    popupElement.innerHTML = `
      <span class="heading-xs">${currentPlayer.name} WIN!</span>
      <div>
        <div class="popup-mark" data-mark="${currentPlayer.mark}">${winnerIcon}</div>
        <div class="heading-l" data-mark="${currentPlayer.mark}">TAKES THE ROUND!</div>
      </div>
      <div>
        <button class="secondary-button-one">QUIT</button>
        <button class="secondary-button-two next-round-button">NEXT ROUND</button>
      </div>
    `;
    return popupElement;
  }

  // IF THERE IS A DRAW
  popupElement.innerHTML = `
  <span class="heading-l">ROUND TIED</span>
  <div>
      <button class="secondary-button-one">QUIT</button>
      <button class="secondary-button-two next-round-button">NEXT ROUND</button>
    </div>
  `;
  return popupElement;
};

const bindCellElements = (arr) => {
  const cellElements = Array.from(document.querySelectorAll(".gameboard-cell"));

  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (e.target.dataset.mark === "") {
        const cellIndex = cellElements.indexOf(e.target);
        arr[cellIndex].mark = currentPlayer.mark;
        checkWinner(arr, playersArr);
        changeCurrentPlayer(playersArr);
        gameController(arr);
      }
    });
  });

  return { cellElements };
};

const bindNextRoundButton = () => {
  const nextRoundButtons = Array.from(
    document.querySelectorAll(".next-round-button")
  );
  const popup = document.querySelector(".popup");

  nextRoundButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("XD");
      popup.remove();
      nextRound();
    });
  });
};

const bindRestartButton = () => {
  const restartButtonElement = document.querySelector(".restart-button");

  restartButtonElement.addEventListener("click", (e) => {
    console.log("Hi!");
  });
};

const nextRound = () => {
  playersArr[0].isWinner = false;
  playersArr[1].isWinner = false;
  currentPlayer = playersArr[0];
  gameboardArr = Array.from({ length: 9 }, (_, index) => ({ mark: "", index }));
  winningCombination = [];

  gameController(gameboardArr);
};

const gameController = (arr) => {
  root.dataset.current = currentPlayer.mark;
  renderGame();

  if (isAnyWinner() || arr.every((cell) => cell.mark)) {
    renderWinningCells(winningCombination);
    root.appendChild(createPopup());
    bindNextRoundButton();
    return;
  }

  currentPlayer.isHuman ? playerChoice(arr) : cpuChoice(arr);

  bindRestartButton();
};

gameController(gameboardArr);
