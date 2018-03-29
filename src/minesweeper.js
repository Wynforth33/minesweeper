const generatePlayerBoard = (rows, columns) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (rows, columns, bombs) => {
  let board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(null);
    }
    board.push(row);
  }
  let bombsPlaced = 0;
  while (bombsPlaced < bombs) {
    const x = Math.floor(Math.random() * columns);
    const y = Math.floor(Math.random() * rows);
    if (board[x][y]===null) {
      board[x][y] = 'B';
      bombsPlaced++;
    }
  }
  return board;
};

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

const playerBoard = generatePlayerBoard(40,20);
const bombBoard = generateBombBoard(40,20,150);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);


































//
//
// const printBoard = (board)=> {
//   console.log('Current Board:');
//   console.log(board[0].join(' | '));
//   console.log(board[1].join(' | '));
//   console.log(board[2].join(' | '));
// }
//
// const board = [
//   [' ', ' ', ' '],
//   [' ', ' ', ' '],
//   [' ', ' ', ' ']
// ];
//
// printBoard(board);
//
// let guess = board[0][1] = '1'
// let mine = board[2][2] = 'B'
//
// printBoard(board);
//
//
// const gameBoard = [];
// const gameBoardRow = [];
//
// let numberOfRows = 5;
// let numberOfColumns = 10;
//
// for (let j = 0; j < numberOfColumns; j++) {
//   gameBoardRow.push(' ');
// }
// for (let i = 0; i < numberOfRows; i++) {
//   gameBoard.push(gameBoardRow);
// }
// console.log('Current Board:')
// for (let k = 0; k < gameBoard.length; k++) {
//   console.log(gameBoard[k].join(' | '));
// }
