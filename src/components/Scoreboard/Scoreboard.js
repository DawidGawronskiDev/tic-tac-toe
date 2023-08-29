import createScore from "./Score";

const createScoreboard = (players) => {
    const scoreboardElement = document.createElement("div");
    scoreboardElement.classList.add("scoreboard");
  
    players.forEach((player) =>
      scoreboardElement.appendChild(createScore(player))
    );
  
    return scoreboardElement;
};

export default createScoreboard;