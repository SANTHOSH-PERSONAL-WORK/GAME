// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const diceValue = () => {
//   return Math.floor(Math.random() * 6) + 1;
// };

// const boardOption = () => {
//   const option = ["No Play", "Ladder", "Snake"];
//   const index = Math.floor(Math.random() * option.length);
//   return option[index];
// };

// let players = [];
// let playersDiceRollingCount = {};
// let playersPosition = {};
// let initialPlayer = 0;
// let playerCount = 0;

// const game = (playerCount, startGame) => {
//   let player = players[initialPlayer];

//   if (startGame === "spin" && initialPlayer < playerCount) {
//     playersDiceRollingCount[player]++;

//     const value = diceValue();
//     const option = boardOption();
//     console.log(players[initialPlayer]);
//     console.log(`Dice Number: ${value}`);

//     if (option === "No Play" && initialPlayer < playerCount) {
//       console.log("No Play");

//       console.log(`Current position:${playersPosition[player]} `);
//       initialPlayer++;
//       getInput();
//     } else if (option === "Ladder" && initialPlayer < playerCount) {
//       console.log("Ladder");
//       playersPosition[player] += value;
//       if (playersPosition[player] > 100) {
//         playersPosition[player] -= value;
//       } else if (playersPosition[player] === 100) {
//         console.log(`Current position:${playersPosition[player]} You are win`);
//         console.log(
//           `Number of times dice was played:${playersDiceRollingCount[player]}`
//         );
//         rl.close();
//         return;
//       }
//       console.log(`Current position:${playersPosition[player]} `);
//       getInput();
//     } else if (option === "Snake" && initialPlayer < playerCount) {
//       console.log("Snake");
//       playersPosition[player] -= value;
//       if (playersPosition[player] < 0) {
//         playersPosition[player] = 0;
//       }
//       console.log(`Current position:${playersPosition[player]} `);
//       initialPlayer++;
//       getInput();
//     } else {
//       initialPlayer = 0;
//       getInput();
//     }
//   } else if (initialPlayer >= playerCount) {
//     initialPlayer = 0;
//     game(playerCount, startGame);
//   } else {
//     console.log("Please type spin");
//     getInput();
//   }
// };

// const getPlayerCount = () => {
//   return rl.question(
//     "Well come to Snake Ladder Game! Enter Player count: ",
//     (count) => {
//       playerCount = count;
//       for (let i = 1; i <= playerCount; i++) {
//         const name = `player${i}`;
//         players[i - 1] = name;
//         playersDiceRollingCount[name] = 0;
//         playersPosition[name] = 0;
//       }
//       getInput();
//     }
//   );
// };

// getPlayerCount();

// const getInput = () => {
//   return rl.question("Spin the dice(Enter spin): ", (startGame) => {
//     game(playerCount, startGame);
//   });
// };

// Handle user input
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Handle dice value
const diceValue = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// Handle board option
const boardOption = () => {
  const option = ["No Play", "Ladder", "Snake"];
  const index = Math.floor(Math.random() * option.length);
  return option[index];
};

const boardOptionPlace = [
  4, 9, 17, 21, 28, 51, 54, 62, 64, 71, 80, 87, 93, 95, 98,
];

let players = [];
let playersDiceRollingCount = {};
let playersPosition = {};
let initialPlayer = 0;
let playerCount = 0;

// Handle snake & ladder game
const game = (playerCount, startGame) => {
  let player = players[initialPlayer];

  if (startGame === "" && initialPlayer < playerCount) {
    playersDiceRollingCount[player]++;

    const value = diceValue();
    let option = boardOption();
    const PlayerNextPosition = playersPosition[player] + value;

    let isBoardOption = false;
    for (let i = 0; i < boardOptionPlace.length; i++) {
      if (boardOptionPlace[i] === PlayerNextPosition) {
        isBoardOption = true;
        break;
      }
    }

    // Change board option if player position = 1 and option = snake
    if (playersPosition[player] === 1) {
      while (option === "Snake") {
        option = boardOption();
      }
    }

    console.log(players[initialPlayer]);
    console.log(`Dice Number: ${value}`);

    //Handle player enter the game
    if (playersPosition[player] === 0 && value === 1) {
      playersPosition[player] += value;
      console.log(`Current position:${playersPosition[player]} `);
      getInput();
      return;
    } else if (playersPosition[player] === 0 && value > 1) {
      console.log("Spin 1 to start the game");
      initialPlayer++;
      getInput();
      return;
    }

    if (isBoardOption === false) {
      console.log(`Previous position:${playersPosition[player]} `);
      console.log(`${value} Times player moved`);
      playersPosition[player] += value;
      console.log("Normol move");

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
      if (value !== 6) {
        initialPlayer++;
      }
      getInput();
      return;
    } else {
      console.log(`Previous position:${playersPosition[player]} `);
      playersPosition[player] += value;
      console.log(`${value} Times player moved`);
    }

    if (isBoardOption === true) {
      option = boardOption();
    }

    // Verify board option
    if (playersPosition[player] >= 1 && isBoardOption === true) {
      // Handle no play option
      if (option === "No Play" && initialPlayer < playerCount) {
        console.log("No Play");

        console.log(`Current position:${playersPosition[player]} `);
        if (value !== 6) {
          initialPlayer++;
        }
        getInput();
      }

      // Handle ladder option
      else if (option === "Ladder" && initialPlayer < playerCount) {
        console.log("Ladder");
        playersPosition[player] += value;
        if (playersPosition[player] > 100) {
          playersPosition[player] -= value;
        } else if (playersPosition[player] === 100) {
          console.log(
            `Current position:${playersPosition[player]} You are win`
          );
          console.log(
            `Number of times dice was played:${playersDiceRollingCount[player]}`
          );
          rl.close();
          return;
        }
        console.log(`Current position:${playersPosition[player]} `);
        getInput();
      }

      // Handle snake option
      else if (
        option === "Snake" &&
        initialPlayer < playerCount &&
        playersPosition[player] > 1
      ) {
        console.log("Snake");
        playersPosition[player] -= value;
        if (playersPosition[player] < 0) {
          playersPosition[player] = 0;
        }
        console.log(`Current position:${playersPosition[player]} `);
        if (value !== 6) {
          initialPlayer++;
        }
        getInput();
      } else {
        initialPlayer = 0;
        getInput();
      }
    } else {
      initialPlayer++;
      getInput();
    }
  } else if (initialPlayer >= playerCount) {
    initialPlayer = 0;
    game(playerCount, startGame);
  } else {
    console.log("Please type enter");
    getInput();
  }
};

// Handle player count
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

// Handle user input
const getInput = () => {
  return rl.question(
    "Player can spin the dice to press enter: ",
    (startGame) => {
      game(playerCount, startGame);
    }
  );
};
