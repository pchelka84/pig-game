var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number

    var dice;
    dice = Math.floor(Math.random() * 6) + 1;
    // currentScore = document.querySelector("#current-" + activePlayer)
    //   .textContent;

    // 2. Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "img/dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was not a 1
    if (dice !== 1) {
      if (dice === 6 && previousDiceRoll === 6) {
        roundScore = 0;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
        // console.log(
        //   "it was two 6 in a row  - dice:" +
        //     dice +
        //     " previousDiceRoll: " +
        //     previousDiceRoll
        // );
        nextPlayer();
      } else {
        previousDiceRoll = dice;
        roundScore += dice;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;

        // console.log(
        //   "Dice roll isn't 1 and previousDiceRoll isn't 6, dice can be 6. The dice is " +
        //     dice +
        //     ", previousDiceRoll - " +
        //     previousDiceRoll +
        //     ", roundscore - " +
        //     roundScore
        // );
      }
    } else {
      // console.log(
      //   "This is a case when dice = 1 && previousDiceRoll: " +
      //     previousDiceRoll +
      //     ". Dice: " +
      //     dice
      // );
      // change the player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add Current score to Global Score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    previousDiceRoll = 0;
    // console.log(
    //   "Active plaeyer global score is " +
    //     scores[activePlayer] +
    //     " previousDiceRoll: " +
    //     previousDiceRoll
    // );

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // change the player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  previousDiceRoll = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousDiceRoll = 0;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  // first player is always active when a new game starts
  // we needed to remove 'active' class to avid double 'active' on the first player
  document.querySelector(".player-0-panel").classList.add("active");
}
