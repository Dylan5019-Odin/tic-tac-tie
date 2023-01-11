

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

const player1 = playerFactory(`Player1`, `X`);
const player2 = playerFactory(`Player2`, `O`);
