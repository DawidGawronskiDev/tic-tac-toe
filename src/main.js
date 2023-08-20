import { doc } from "prettier";
import "./style.css";

const ROOT = document.querySelector("#root");

const PLAYERS = [
  {
    name: "",
    mark: "x",
    isHuman: true,
  },
  {
    name: "",
    mark: "o",
    isHuman: true,
  },
];

let currentPlayer = PLAYERS[0];

const GAMEBOARD_ARR = Array.from({ length: 9 }, () => ({ mark: " " }));

const RENDER_GAMEBOARD = (arr) => {
  const ELEMENT = document.createElement("div");
  ELEMENT.classList.add("gameboard-elem");

  arr.forEach((cell) => ELEMENT.appendChild(CREATE_CELL(cell)));

  ROOT.innerHTML = "";
  ROOT.appendChild(ELEMENT);
};

const CREATE_CELL = (cell) => {
  const ELEMENT = document.createElement("div");
  ELEMENT.classList.add("gameboard-cell");
  ELEMENT.dataset.mark = cell.mark;

  return ELEMENT;
};

const GAMECONTROLLER = (() => {
  RENDER_GAMEBOARD(GAMEBOARD_ARR);
})();
