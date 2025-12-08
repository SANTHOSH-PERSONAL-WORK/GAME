// Handle get input
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Handle board
let option = ["", "", "", "", "", "", "", "", ""];

const board = (value, coin) => {
  if (value !== undefined && coin !== undefined) {
    option[value] = coin;
  }
  console.log(` ${option[0]} | ${option[1]} | ${option[2]} `);
  console.log("-----------");
  console.log(` ${option[3]} | ${option[4]} | ${option[5]} `);
  console.log("-----------");
  console.log(` ${option[6]} | ${option[7]} | ${option[8]} `);
};

let userCoin = "";
let computerCoin = "";
let user = false;
let computer = false;

// Handle check win
const checkWinner = (coin) => {
  if (option[0] === coin && option[1] === coin && option[2] === coin)
    return true;
  else if (option[3] === coin && option[4] === coin && option[5] === coin)
    return true;
  else if (option[6] === coin && option[7] === coin && option[8] === coin)
    return true;
  else if (option[0] === coin && option[4] === coin && option[8] === coin)
    return true;
  else if (option[6] === coin && option[4] === coin && option[2] === coin)
    return true;
  else if (option[0] === coin && option[3] === coin && option[6] === coin)
    return true;
  else if (option[1] === coin && option[4] === coin && option[7] === coin)
    return true;
  else if (option[2] === coin && option[5] === coin && option[8] === coin)
    return true;
  else return false;
};

// handle check draw
const checkDraw = () => {
  let count = 0;
  for (let i = 0; i <= 8; i++) {
    if (option[i] !== "") {
      count++;
    }
  }
  return count;
};

// handle next move
const nextMove = () => {
  if (computer) {
    game("computer");
  } else {
    rl.question("Enter 0 to 8 choose place to play: ", (value) => {
      game(value);
    });
  }
};

// Handle computer option choice
const checkWinOrBlock = (coin) => {
  if (option[0] === "" && option[1] === coin && option[2] === coin) return 0;
  else if (option[0] === coin && option[1] === "" && option[2] === coin)
    return 1;
  else if (option[0] === coin && option[1] === coin && option[2] === "")
    return 2;
  else if (option[3] === "" && option[4] === coin && option[5] === coin)
    return 3;
  else if (option[3] === coin && option[4] === "" && option[5] === coin)
    return 4;
  else if (option[3] === coin && option[4] === coin && option[5] === "")
    return 5;
  else if (option[6] === "" && option[7] === coin && option[8] === coin)
    return 6;
  else if (option[6] === coin && option[7] === "" && option[8] === coin)
    return 7;
  else if (option[6] === coin && option[7] === coin && option[8] === "")
    return 8;
  else if (option[0] === "" && option[4] === coin && option[8] === coin)
    return 0;
  else if (option[0] === coin && option[4] === "" && option[8] === coin)
    return 4;
  else if (option[0] === coin && option[4] === coin && option[8] === "")
    return 8;
  else if (option[6] === "" && option[4] === coin && option[2] === coin)
    return 6;
  else if (option[6] === coin && option[4] === "" && option[2] === coin)
    return 4;
  else if (option[6] === coin && option[4] === coin && option[2] === "")
    return 2;
  else if (option[0] === "" && option[3] === coin && option[6] === coin)
    return 0;
  else if (option[0] === coin && option[3] === "" && option[6] === coin)
    return 3;
  else if (option[0] === coin && option[3] === coin && option[6] === "")
    return 6;
  else if (option[1] === "" && option[4] === coin && option[7] === coin)
    return 1;
  else if (option[1] === coin && option[4] === "" && option[7] === coin)
    return 4;
  else if (option[1] === coin && option[4] === coin && option[7] === "")
    return 7;
  else if (option[2] === "" && option[5] === coin && option[8] === coin)
    return 2;
  else if (option[2] === coin && option[5] === "" && option[8] === coin)
    return 5;
  else if (option[2] === coin && option[5] === coin && option[8] === "")
    return 8;
  else return false;
};

// Handle computer move
const computerMove = (coin) => {
  // Handle winnig possiblity
  const checkWin = checkWinOrBlock(coin);
  if (checkWin !== false) {
    return checkWin;
  }

  // Handle oponent block possiblity
  let opponent = "";
  if (coin === "X") {
    opponent = "O";
  } else {
    opponent = "X";
  }
  const checkBlock = checkWinOrBlock(opponent);
  if (checkBlock !== false) {
    return checkBlock;
  }

  // Take corner
  if (option[0] === "") return 0;
  else if (option[2] == "") return 2;
  else if (option[6] == "") return 6;
  else if (option[8] == "") return 8;

  // Take Center
  if (option[1] === "") return 1;
  else if (option[3] == "") return 3;
  else if (option[4] == "") return 4;
  else if (option[5] == "") return 5;
  else if (option[7] == "") return 7;
};

// Handle tic tac toe game
const game = (value) => {
  if (user) {
    if (value > 8) {
      console.log("Invalid position, Enter 0 to 8 choose place to play");
      nextMove();
      return;
    } else if (option[value] !== "") {
      console.log("Position already entered, Enter again");
      nextMove();
      return;
    }
    user = false;
    board(value, userCoin);

    if (checkWinner(userCoin)) {
      console.log("You win!");
      return resetGame();
    }

    if (checkDraw() === 9) {
      console.log("Match draw!");
      return resetGame();
    }

    computer = true;
  } else if (computer && value === "computer") {
    computer = false;
    let compMove = computerMove(computerCoin);

    console.log(`Computer choose: ${compMove}`);
    board(compMove, computerCoin);
    if (checkWinner(computerCoin)) {
      console.log("Computer win!");
      return resetGame();
    }

    if (checkDraw() === 9) {
      console.log("Match draw!");
      return resetGame();
    }

    user = true;
  }
  nextMove();
};

// Handle toss
const toss = () => {
  const tossValue = ["head", "tail"];
  const idx = Math.floor(Math.random() * tossValue.length);
  return tossValue[idx];
};

// Handle assign user coin
const assignUserCoin = (value) => {
  userCoin = value;
  if (value === "X") {
    computerCoin = "O";
  } else {
    computerCoin = "X";
  }
};

// Handle assign computer coin
const assignComputerCoin = () => {
  const coinFace = ["X", "O"];
  computerCoin = coinFace[Math.floor(Math.random() * coinFace.length)];
  if (computerCoin === "X") {
    userCoin = "O";
  } else {
    userCoin = "X";
  }
};

// Handle reset game
const resetGame = () => {
  rl.question("Do want play again?: ", (ans) => {
    if (ans === "yes") {
      for (let i = 0; i <= 9; i++) {
        option[i] = "";
      }
      board();
      startGame();
    } else {
      console.log("Thank you!");
      rl.close();
    }
  });
};

// Handle restart game
const startGame = () => {
  return rl.question(
    "Press enter to spin toss for start the tic tac toe game:",
    (value) => {
      if (value === "") {
        const tossResult = toss();
        rl.question("Choose head or tail: ", (toss) => {
          if (toss !== "tail" && toss !== "head") {
            console.log("Invalid input");
            return startGame();
          } else if (toss === tossResult) {
            console.log("You won the toss!");
            rl.question("Choose X or O to play:", (value) => {
              assignUserCoin(value);
              console.log(`You play with ${value}`);
              // board();
              user = true;
              nextMove();
            });
          } else {
            console.log("Computer won the toss!");
            assignComputerCoin();
            console.log(`Computer play with ${computerCoin}`);
            // board();

            computer = true;
            nextMove();
          }
        });
      } else {
        console.log("Please click the enter.");
      }
    }
  );
};

startGame();
