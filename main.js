// Using a Module to setup the Game Board
const gameBoard = (() => {
  const board = [
    ["O", "X", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ];

  const updateBoard = (i, j, newValue) => {
    [board[i][j] = newValue];
  }

  return {
    board,
    updateBoard,
  };
})();


// Using a Factory to setup the Players
const playerFactory = (name, symb) => {
  return { name, symb };
};

// Using a Module to setup the display Controller
const displayController = (() => {

const getCurrentCellEvent = () => {
    let currentCell = [];
    document.querySelectorAll(".cell").forEach(cell => {
     cell.addEventListener("click", () => {
        currentCell = cell.id.split("_");
        currentCell.shift();       
     });

     return currentCell;
  });
 
}

// Generates the Grid Based off the gameBoard
  const generateGrid = () => {
    let gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = '';

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

  const displayBoard = () => {
    generateGrid();
    getCurrentCellEvent();
  };

  return {
    displayBoard,
  };
})();

const player1 = playerFactory(`Player1`, `X`);
const player2 = playerFactory(`Player2`, `O`);

displayController.displayBoard();


