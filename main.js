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
const gameController = (() => {
  let currentCell = [];
  let isWinner = false;

  let player1 = playerFactory("Player 1", "X");
  let player2 = playerFactory("Player 2", "O");
  let currentPlayer = player2;

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

  // Function that Adds an event Listener and controls the main gameplay loop
  const playGame = () => {
    let cells = document.querySelectorAll(".cell");
    isWinner = gameBoard.checkForWinner(cells);
    let turn = 0;

    if (isWinner) {
      alert(`${currentPlayer.name} Wins!`);
      return;
    } else if (turn == 9) {
      return;
    }

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        currentCell = cell.id.split("_");
        currentCell.shift();

        if (gameBoard.board[currentCell[0]][currentCell[1]] == "") {
          gameBoard.updateBoard(
            currentCell[0],
            currentCell[1],
            currentPlayer.value
          );
          turn++;
          displayBoard();
        }
      });
    });
  };

  //Function to switch the current player
  const updatePlayer = () => {
    const currentPlayerDisplay = document.getElementById("currentPlayer");

    if (currentPlayer.name == player1.name) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
    currentPlayerDisplay.innerText = currentPlayer.name;
  };

  const displayBoard = () => {
   
    generateGrid();
    playGame();
    updatePlayer();
  };

  return {
    displayBoard,
  };
})();

//GLOBAL

gameController.displayBoard();
