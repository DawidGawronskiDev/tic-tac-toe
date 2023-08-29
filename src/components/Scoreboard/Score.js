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

  export default createScore;