import { doc } from "prettier";
import "./style.css";

const ROOT = document.querySelector("#root");

const PLAYERS = [
  {
    name: "",
    mark: "x",
    isHuman: true,
    isWinner: false,
  },
  {
    name: "",
    mark: "o",
    isHuman: false,
    isWinner: false,
  },
];

let currentPlayer = PLAYERS[0];

const GAMEBOARD_ARR = Array.from({ length: 9 }, () => ({ mark: "" }));

const CREATE_GAMEBOARD = (arr) => {
  const ELEMENT = document.createElement("div");
  ELEMENT.classList.add("gameboard-elem");

  ELEMENT.innerHTML = "";
  arr.forEach((cell) => ELEMENT.appendChild(CREATE_CELL(cell)));

  return ELEMENT;
};

const CREATE_CELL = (cell) => {
  const ELEMENT = document.createElement("div");
  ELEMENT.classList.add("gameboard-cell");
  ELEMENT.dataset.mark = cell.mark;

  return ELEMENT;
};

const ASSING_CURRENT_PLAYER = (currentPlayer) => {
  ROOT.dataset.current = currentPlayer.mark;
};

const RENDER = () => {
  ROOT.innerHTML = "";
  ROOT.appendChild(CREATE_GAMEBOARD(GAMEBOARD_ARR));
};

const CHANGE_PLAYER = () => {
  currentPlayer === PLAYERS[0]
    ? (currentPlayer = PLAYERS[1])
    : (currentPlayer = PLAYERS[0]);
};

const PLAYER_CHOICE = (currentPlayer, arr) => {
  const CELLS = Array.from(document.querySelectorAll(".gameboard-cell"));

  CELLS.forEach((cell) =>
    cell.addEventListener("click", (e) => {
      if (!e.target.dataset.mark) {
        const CELL_INDEX = CELLS.indexOf(e.target);
        arr[CELL_INDEX].mark = currentPlayer.mark;
        CHECK_WINNER(arr);
        CHANGE_PLAYER();
        GAME_CONTROLLER();
      }
    })
  );
};

const CPU_CHOICE = (currentPlayer, arr) => {
  const CELL_INDEX = Math.floor(Math.random() * 8);

  if (arr[CELL_INDEX].mark) {
    CPU_CHOICE(arr);
  } else {
    arr[CELL_INDEX].mark = currentPlayer.mark;
    CHECK_WINNER(arr);
    CHANGE_PLAYER();
    GAME_CONTROLLER();
  }
};

const CHECK_WINNER = (arr) => {
  let isWin = false;
  let isDraw = false;

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  WINNING_COMBINATIONS.forEach((comb) => {
    if (
      arr[comb[0]].mark === arr[comb[1]].mark &&
      arr[comb[1]].mark === arr[comb[2]].mark &&
      arr[comb[0]].mark &&
      arr[comb[1]].mark &&
      arr[comb[2]].mark
    ) {
      isWin = true;
    }
  });

  if (isWin) {
    currentPlayer.isWinner = true;
    return "WIN";
  }

  if (arr.every((cell) => cell.mark)) {
    isDraw = true;
    return "DRAW";
  }

  return false;
};

const GAME_CONTROLLER = () => {
  ASSING_CURRENT_PLAYER(currentPlayer);
  RENDER();

  if (PLAYERS.some((player) => player.isWinner)) {
    ROOT.dataset.current = "";
    return;
  }

  currentPlayer.isHuman
    ? PLAYER_CHOICE(currentPlayer, GAMEBOARD_ARR)
    : CPU_CHOICE(currentPlayer, GAMEBOARD_ARR);
};

GAME_CONTROLLER();
