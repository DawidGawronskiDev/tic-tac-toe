import "./style.css";

const ROOT = document.querySelector("#root");

const PLAYERS = [
  {
    name: "PLAYER 1",
    mark: "x",
    isHuman: true,
    isWinner: false,
    color: "#31C3BD",
  },
  {
    name: "PLAYER 2",
    mark: "o",
    isHuman: true,
    isWinner: false,
    color: "#F2B137",
  },
];

let currentPlayer = PLAYERS[0];

const GAMEBOARD_ARR = Array.from({ length: 9 }, (_, index) => ({ mark: "", index }));

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
  ELEMENT.dataset.index = cell.index;

  return ELEMENT;
};

const ASSING_CURRENT_PLAYER = (currentPlayer) => {
  ROOT.dataset.current = currentPlayer.mark;
};

const RENDER = () => {
  ROOT.innerHTML = "";

  if (PLAYERS.some((player) => player.isWinner) || GAMEBOARD_ARR.every(cell => cell.mark)) {
    ROOT.appendChild(CREATE_POPUP(currentPlayer, PLAYERS, GAMEBOARD_ARR, ROOT))
  }

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
  const emptyCellIndices = arr.reduce((indices, cell, index) => {
    if (!cell.mark) {
      indices.push(index);
    }
    return indices;
  }, []);

  if (emptyCellIndices.length === 0) {
    GAME_CONTROLLER(); // Handle case when no empty cells are available
    return;
  }

  const CELL_INDEX = emptyCellIndices[Math.floor(Math.random() * emptyCellIndices.length)];

  arr[CELL_INDEX].mark = currentPlayer.mark;
  CHECK_WINNER(arr);
  CHANGE_PLAYER();
  GAME_CONTROLLER();
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
    isDraw = true; // Set isDraw to true when all cells are marked
    return "DRAW";
  }
  return false;
};

const CREATE_POPUP = (currentPlayer, players, arr, root) => {
  const ELEM = document.createElement("div");
  ELEM.classList.add("popup");
  const winner = players.find(player => player.isWinner);
  const isDraw = arr.every(cell => cell.mark);

  // PLAYER VS CPU
  if (players.some(player => !player.isHuman)) {
    const CPU_PLAYER = players.find(player => !player.isHuman);
    const message = CPU_PLAYER.isWinner ? "OH NO, YOU LOST…" : "YOU WON!";
    const playerName = CPU_PLAYER.isWinner ? CPU_PLAYER.name : currentPlayer.name;

    ELEM.innerHTML = `
      <span class="heading-xs">${message}</span>
      <div>
        <div class="popup-mark" data-mark="${currentPlayer.mark}"></div>
        <span class="heading-l">${playerName} TAKES THE ROUND</span>
      </div>
      <div>
        <button class="secondary-button-one">QUIT</button>
        <button class="secondary-button-two">NEXT ROUND</button>
      </div>
    `;
  // WHEN PLAYER VS PLAYER
  } else if (players.every(player => player.isHuman)) {
    const winnerName = winner ? winner.name : 0;
    const message = `${winnerName === currentPlayer.name ? "YOU" : winnerName} WINS!`;

    ELEM.innerHTML = `
      <span class="heading-xs">${message}</span>
      <div>
        <div class="popup-mark" data-mark="${currentPlayer.mark}"></div>
        <span class="heading-l">TAKES THE ROUND</span>
      </div>
      <div>
        <button class="secondary-button-one">QUIT</button>
        <button class="secondary-button-two">NEXT ROUND</button>
      </div>
    `;
  }
  
  if (isDraw && !winner) {
    root.dataset.current = "";
    ELEM.innerHTML = `
      <span class="heading-l">ROUND TIED</span>
      <div>
        <button class="secondary-button-one">QUIT</button>
        <button class="secondary-button-two">NEXT ROUND</button>
      </div>
    `;
  }

  return ELEM;
};

const GAME_CONTROLLER = () => {
  RENDER();

  if (PLAYERS.some((player) => player.isWinner) || GAMEBOARD_ARR.every(cell => cell.mark)) {
    CREATE_POPUP(currentPlayer, PLAYERS, GAMEBOARD_ARR, ROOT)
    return;
  }

  ASSING_CURRENT_PLAYER(currentPlayer);

  currentPlayer.isHuman
    ? PLAYER_CHOICE(currentPlayer, GAMEBOARD_ARR)
    : CPU_CHOICE(currentPlayer, GAMEBOARD_ARR);
};

GAME_CONTROLLER();

const INIT = () => {
  currentPlayer = PLAYERS[0];
  GAMEBOARD_ARR = Array.from({ length: 9 }, (index, mark) => ({ mark: "", index }));

  GAME_CONTROLLER();
}
