const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const diceValue = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const boardOption = () => {
  const option = ["No Play", "Ladder", "Snake"];
  const index = Math.floor(Math.random() * option.length);
  return option[index];
};

let playerOnePosition = 0;
let playerTwoPosition = 0;

let playerOneDiceRollingCount = 0;
let playerTwoDiceRollingCount = 0;

const player1 = (dice) => {
  if (dice === "spin") {
    playerOneDiceRollingCount++;
    const value = diceValue();
    const option = boardOption();
    console.log("Player1");
    console.log(`Dice Number: ${value}`);

    if (option === "No Play") {
      console.log("No Play");
      console.log(`Current position:${playerOnePosition} `);
      getInput(player2);
    } else if (option === "Ladder") {
      console.log("Ladder");
      playerOnePosition += value;
      if (playerOnePosition > 100) {
        playerOnePosition -= value;
      } else if (playerOnePosition === 100) {
        console.log(`Current position:${playerOnePosition} You are win`);
        console.log(
          `Number of times dice was played:${playerOneDiceRollingCount}`
        );
        rl.close();
        return;
      }
      console.log(`Current position:${playerOnePosition} `);
      getInput(player1);
    } else if (option === "Snake") {
      console.log("Snake");
      playerOnePosition -= value;
      if (playerOnePosition < 0) {
        playerOnePosition = 0;
      }
      console.log(`Current position:${playerOnePosition} `);
      getInput(player2);
    }
  } else {
    console.log("Please type spin");
    getInput(player1);
  }
};

const player2 = (dice) => {
  if (dice === "spin") {
    playerTwoDiceRollingCount++;
    const value = diceValue();
    const option = boardOption();
    console.log("Player2");
    console.log(`Dice Number: ${value}`);

    if (option === "No Play") {
      console.log("No Play");
      console.log(`Current position:${playerTwoPosition} `);
      getInput(player1);
    } else if (option === "Ladder") {
      console.log("Ladder");
      playerTwoPosition += value;
      if (playerTwoPosition > 100) {
        playerTwoPosition -= value;
      } else if (playerTwoPosition === 100) {
        console.log(`Current position:${playerTwoPosition} You are win`);
        console.log(
          `Number of times dice was played:${playerTwoDiceRollingCount}`
        );
        rl.close();
        return;
      }
      console.log(`Current position:${playerTwoPosition} `);
      getInput(player2);
    } else if (option === "Snake") {
      console.log("Snake");
      playerTwoPosition -= value;
      if (playerTwoPosition < 0) {
        playerTwoPosition = 0;
      }
      console.log(`Current position:${playerTwoPosition} `);
      getInput(player1);
    }
  } else {
    console.log("Please type spin");
    getInput(player2);
  }
};

const getInput = (player1) => {
  return rl.question("Spin the dice(Enter spin): ", player1);
};
getInput(player1);
