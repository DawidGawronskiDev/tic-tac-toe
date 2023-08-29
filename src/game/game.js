import Logo from "../assets/logo.svg";

import createGameboard from "../components/Gameboard/Gameboard";
import createScoreboard from "../components/Scoreboard/Scoreboard";
import createTurnDisplay from "../components/TurnDisplay/TurnDisplay";

import {
    gameboardArr,
    playersArr,
    currentPlayer,
    winningCombination,
    nextRound,
    isAnyWinner,
    checkWinner,
    changeCurrentPlayer,
    restartGame
} from "../helpers/gameLogic";

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

const bindPickPlayer = (players) => {
    const pickX = document.querySelector(".pick-x");
    const pickO = document.querySelector(".pick-o");
    const indicator = document.querySelector(".indicator");
    const vsCPU = document.querySelector(".vs-cpu");
    const vsPlayer = document.querySelector(".vs-player");
  
    pickX.addEventListener("click", (e) => {
      indicator.style.transform = "TranslateX(0)";
      pickO.style.filter = `invert(83%) sepia(11%) saturate(406%) hue-rotate(153deg)
      brightness(88%) contrast(94%)`;
      pickX.style.filter = `invert(15%) sepia(30%) saturate(771%) hue-rotate(154deg)
      brightness(98%) contrast(89%)`;
  
      players[0].isHuman = true;
      players[1].isHuman = false;
    });
  
    pickO.addEventListener("click", (e) => {
      indicator.style.transform = "TranslateX(calc(100% - 16px))";
      pickO.style.filter = `invert(15%) sepia(30%) saturate(771%) hue-rotate(154deg)
      brightness(98%) contrast(89%)`;
      pickX.style.filter = `invert(83%) sepia(11%) saturate(406%) hue-rotate(153deg)
      brightness(88%) contrast(94%)`;
  
      players[0].isHuman = false;
      players[1].isHuman = true;
    });
  
    vsCPU.addEventListener("click", (e) => {
      if (players[0].isHuman) {
        players[0].name = "YOU";
        players[1].name = "CPU";
      } else {
        players[0].name = "CPU";
        players[1].name = "YOU";
      }
  
      gameController(gameboardArr);
    });
  
    vsPlayer.addEventListener("click", (e) => {
      if (players[0].isHuman) {
        players[0].name = "PLAYER 1";
        players[1].name = "PLAYER 2";
        players[1].isHuman = true;
      } else {
        players[0].name = "PLAYER 2";
        players[1].name = "PLAYER 1";
        players[0].isHuman = true;
      }
  
      gameController(gameboardArr);
    });
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
        popup.remove();
        nextRound();
      });
    });
};

const renderGame = () => {
    root.innerHTML = "";
    root.appendChild(createTurnDisplay(currentPlayer));
    root.appendChild(createGameboard(gameboardArr));
    root.appendChild(createScoreboard(playersArr));
};

const gameController = (arr) => {
    root.dataset.current = currentPlayer.mark;
    renderGame();
  
    if (isAnyWinner() || arr.every((cell) => cell.mark)) {
      renderWinningCells(winningCombination);
      root.appendChild(createPopup());
      bindQuitButton();
      bindNextRoundButton();
      return;
    }
  
    currentPlayer.isHuman ? playerChoice(arr) : cpuChoice(arr);
  
    bindRestartPopupButton();
};

const createGameSetup = () => {
    const gameSetupElement = document.createElement("div");
  
    gameSetupElement.innerHTML = `
    <div class="game-setup">
      <img src="${Logo}" alt="" />
  
      <div class="pick-player-container">
        <span class="heading-xs">PICK PLAYER 1’S MARK</span>
        <div class="pick-player-buttons-container">
          <div class="indicator"></div>
          <button class="pick-x"></button>
          <button class="pick-o"></button>
        </div>
        <span class="body">REMEMBER : X GOES FIRST</span>
      </div>
      <div class="pick-opponent">
      <button class="button-one heading-s vs-cpu">NEW GAME (VS CPU)</button>
      <button class="button-two heading-s vs-player">NEW GAME (VS PLAYER)</button>
      </div>
    </div>
    `;
  
    return gameSetupElement;
  };

const gameSetup = () => {
    root.innerHTML = "";
    root.appendChild(createGameSetup());
    bindPickPlayer(playersArr);
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
          <button class="secondary-button-one quit-button">QUIT</button>
          <button class="secondary-button-two next-round-button">NEXT ROUND</button>
        </div>
      `;
      return popupElement;
    }
  
    // IF THERE IS A DRAW
    popupElement.innerHTML = `
    <span class="heading-l">ROUND TIED</span>
    <div>
        <button class="secondary-button-one quit-button">QUIT</button>
        <button class="secondary-button-two next-round-button">NEXT ROUND</button>
      </div>
    `;
    return popupElement;
};

const bindRestartPopupButton = () => {
    const restartButtonElement = document.querySelector(".restart-popup-button");
  
    restartButtonElement.addEventListener("click", (e) => {
      root.appendChild(createRestartPopup());
      bindCancelRestartButton();
      bindRestartButton();
    });
};

const renderWinningCells = (arr) => {
    const cells = Array.from(document.querySelectorAll(".gameboard-cell"));
  
    arr.forEach((index) => cells[index].classList.add("winning-cell"));
  
    return;
};

const bindQuitButton = () => {
    const quitButton = document.querySelector(".quit-button");
  
    quitButton.addEventListener("click", (e) => {
      restartGame();
      gameSetup();
    })
}

const createRestartPopup = () => {
    const popupElement = document.createElement("div");
    popupElement.classList.add("popup");
  
    popupElement.innerHTML = `
      <span class="heading-l">RESTART GAME?</span>
      <div>
        <button class="secondary-button-one cancel-restart">NO, CANCEL</button>
        <button class="secondary-button-two restart-button">YES, RESTART</button>
      </div>
    `;
  
    return popupElement;
}

const bindCancelRestartButton = () => {
  const cancelRestartButton = document.querySelector(".cancel-restart");
  const popupElement = document.querySelector(".popup");
  cancelRestartButton.addEventListener("click", e => {
    console.log(e.target)
    popupElement.remove();
  })
}

const bindRestartButton = () => {
  const restartButtonElement = document.querySelector(".restart-button");
  const popupElement = document.querySelector(".popup");

  restartButtonElement.addEventListener("click", (e) => {
    root.appendChild(createRestartPopup());
    
    popupElement.remove();
    restartGame();
  });
};

export { gameController, gameSetup };


