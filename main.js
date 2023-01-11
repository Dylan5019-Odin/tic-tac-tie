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

  const updateBoard = (i, j, newValue) => {
    board[i][j] = newValue;
  };

  return {
    board,
    updateBoard,
  };
})();

// Using a Module to setup the display Controller
const gameController = (() => {
  let currentCell = [];

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

  // Function to Add an Event Listener that updates a cells text based on the
  // current players value
  const addCellEventListener = () => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        currentCell = cell.id.split("_");
        currentCell.shift();

        if (gameBoard.board[currentCell[0]][currentCell[1]] == "") {
          gameBoard.updateBoard(
            currentCell[0],
            currentCell[1],
            currentPlayer.value
          );

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
    addCellEventListener();
    updatePlayer();
  };

  return {
    displayBoard,
  };
})();

//GLOBAL

gameController.displayBoard();
