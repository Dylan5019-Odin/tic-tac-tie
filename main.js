


// Using a Module to setup the Game Board
const gameBoard  = (() => {
    const board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];

    return {
        board
    };

})();


// Using a Factory to setup the Players
const playerFactory = (name, symb) => {
    return {name, symb}
};


// Using a Module to setup the display Controller
const displayController  = (() => {
    //const board =  gameBoard.board;

    const displayBoard  = () => {
      let gameContainer = document.getElementById("gameContainer");

      for (let i = 0; i < 9; i ++) {
        let cell = document.createElement("div");
        cell.classList = "cell";
        cell.id = `cell_${i}`;
        gameContainer.append(cell);
      }
    }

    return {
      displayBoard,
    };

})();



const player1 = playerFactory(`Player1`, `X`);
const player2 = playerFactory(`Player2`, `O`);

displayController.displayBoard();




