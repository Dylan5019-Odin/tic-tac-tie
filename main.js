// FACTORIES

// Using a Factory to setup the Players
const playerFactory = (name, value) => {
  return { name, value };
};

// MODULES

// Using a Module to setup the Game Board
const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const updateBoard = (i, j, newValue) => {
    board[i][j] = newValue;
  };

  // Function that checks the board to see if there is a winner
  const checkForWinner = (cells) => {
    for (let comb of winningCombos) {
      if (
        cells[comb[0]].textContent == cells[comb[1]].textContent &&
        cells[comb[1]].textContent == cells[comb[2]].textContent &&
        cells[comb[0]].textContent != ""
      ) {
        return true;
      }
    }
    return false;
  };

  return {
    board,
    updateBoard,
    checkForWinner,
  };
})();

// Using a Module to setup the display Controller
const displayController = (() => {
  // Generates the Grid Based off the gameBoard
  const generateGrid = () => {
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = document.createElement("div");
        cell.classList = "cell";
        cell.id = `cell_${i}_${j}`;
        cell.textContent = gameBoard.board[i][j];
        gameContainer.append(cell);
      }
    }
  };
  return {
    generateGrid,
  };
})();

// Using a Module to setup the Game Controller
const gameController = (() => {
  let player1 = playerFactory("Player 1", "X");
  let player2 = playerFactory("Player 2", "O");
  let currentPlayer = player2;
  let turn = 0;

  // Function that controls the gameplay loop and checks for a winner
  const playGame = () => {
    let cells = document.querySelectorAll(".cell");
    let isWinner = gameBoard.checkForWinner(cells);

    if (isWinner) {
      alert(`${currentPlayer.name} Wins!`);
      return;
    } else addCellEventListener(cells);
  };

  //Function to add the onClick event listener to each cell
  const addCellEventListener = (cells) => {
    let currentCell = [];

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        turn += 1;
        currentCell = cell.id.split("_");
        currentCell.shift();

        // Checks if the cell being clicked already has a value
        if (gameBoard.board[currentCell[0]][currentCell[1]] == "") {
          gameBoard.updateBoard(
            currentCell[0],
            currentCell[1],
            currentPlayer.value
          );

          //Checks if the game ended in a draw
          if (turn == 9) {
            alert(`DRAW!`);
            return;
          }
          updateBoard();
        }
      });
    });
  };

  //Function to switch the current player and updated the display text
  const updatePlayer = () => {
    const currentPlayerDisplay = document.getElementById("currentPlayer");

    if (currentPlayer.name == player1.name) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    currentPlayerDisplay.innerText = currentPlayer.name;
  };

  const updateBoard = () => {
    displayController.generateGrid();
    playGame();
    updatePlayer();
  };

  return {
    updateBoard,
  };
})();

//GLOBAL
// Starts the game
gameController.updateBoard();
