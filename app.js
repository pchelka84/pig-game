var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "img/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "img/dice-" + dice2 + ".png";

    // 3. Update the round score IF the rolled number was not a 1
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

//     if (dice !== 1) {
//       if (dice === 6 && previousDiceRoll === 6) {
//         roundScore = 0;
//         document.querySelector(
//           "#current-" + activePlayer
//         ).textContent = roundScore;
//         // console.log(
//         //   "it was two 6 in a row  - dice:" +
//         //     dice +
//         //     " previousDiceRoll: " +
//         //     previousDiceRoll
//         // );
//         nextPlayer();
//       } else {
//         previousDiceRoll = dice;
//         roundScore += dice;
//         document.querySelector(
//           "#current-" + activePlayer
//         ).textContent = roundScore;

//         // console.log(
//         //   "Dice roll isn't 1 and previousDiceRoll isn't 6, dice can be 6. The dice is " +
//         //     dice +
//         //     ", previousDiceRoll - " +
//         //     previousDiceRoll +
//         //     ", roundscore - " +
//         //     roundScore
//         // );
//       }
//     } else {
//       // console.log(
//       //   "This is a case when dice = 1 && previousDiceRoll: " +
//       //     previousDiceRoll +
//       //     ". Dice: " +
//       //     dice
//       // );

//       // change the player
//       nextPlayer();
//     }
//   }
// };

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add Current score to Global Score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    previousDiceRoll = 0;

    var userInput = document.querySelector(".winningScore").value;
    console.log(userInput);
    var winningScore;

    // Undefined, 0, null, or "" are coerced to false
    // anything else is coarced to true
    userInput ? (winningScore = userInput) : (winningScore = 100);

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
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

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousDiceRoll = 0;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

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
  // we needed to remove 'active' class to avoid double 'active' on the first player
  document.querySelector(".player-0-panel").classList.add("active");
}
