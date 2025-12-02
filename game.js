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

let players = [];
let playersDiceRollingCount = {};
let playersPosition = {};
let initialPlayer = 0;
let playerCount = 0;

const game = (playerCount, startGame) => {
  let player = players[initialPlayer];

  if (startGame === "spin" && initialPlayer < playerCount) {
    playersDiceRollingCount[player]++;

    const value = diceValue();
    const option = boardOption();
    console.log(players[initialPlayer]);
    console.log(`Dice Number: ${value}`);

    if (option === "No Play" && initialPlayer < playerCount) {
      console.log("No Play");

      console.log(`Current position:${playersPosition[player]} `);
      initialPlayer++;
      getInput();
    } else if (option === "Ladder" && initialPlayer < playerCount) {
      console.log("Ladder");
      playersPosition[player] += value;
      if (playersPosition[player] > 100) {
        playersPosition[player] -= value;
      } else if (playersPosition[player] === 100) {
        console.log(`Current position:${playersPosition[player]} You are win`);
        console.log(
          `Number of times dice was played:${playersDiceRollingCount[player]}`
        );
        rl.close();
        return;
      }
      console.log(`Current position:${playersPosition[player]} `);
      getInput();
    } else if (option === "Snake" && initialPlayer < playerCount) {
      console.log("Snake");
      playersPosition[player] -= value;
      if (playersPosition[player] < 0) {
        playersPosition[player] = 0;
      }
      console.log(`Current position:${playersPosition[player]} `);
      initialPlayer++;
      getInput();
    } else {
      initialPlayer = 0;
      getInput();
    }
  } else if (initialPlayer >= playerCount) {
    initialPlayer = 0;
    game(playerCount, startGame);
  } else {
    console.log("Please type spin");
    getInput();
  }
};

const getPlayerCount = () => {
  return rl.question(
    "Well come to Snake Ladder Game! Enter Player count: ",
    (count) => {
      playerCount = count;
      for (let i = 1; i <= playerCount; i++) {
        const name = `player${i}`;
        players[i - 1] = name;
        playersDiceRollingCount[name] = 0;
        playersPosition[name] = 0;
      }
      getInput();
    }
  );
};

getPlayerCount();

const getInput = () => {
  return rl.question("Spin the dice(Enter spin): ", (startGame) => {
    game(playerCount, startGame);
  });
};
