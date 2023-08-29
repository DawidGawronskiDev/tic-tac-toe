import Logo from "../../assets/logo.svg";
import Restart from "../../assets/icon-restart.svg";

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
  restartButton.classList.add("restart-popup-button");

  const restartIcon = new Image();
  restartIcon.src = Restart;
  restartButton.appendChild(restartIcon);
  turnDisplayElement.appendChild(restartButton);

  return turnDisplayElement;
};

export default createTurnDisplay;