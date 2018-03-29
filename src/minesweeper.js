class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
      console.log("You're Dead!!");
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      // Attempt to refactor this into two complex inequalities ( 0 <= x <= numberOfy)
      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
        if (bombBoard[neighborRowIndex][neighborColumnIndex]==='B') {
          numberOfBombs ++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
    }
  }

  print(board){
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }
}

const generatePlayerBoard = (rows, columns) => {
  let playerBoard = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(' ');
    }
    playerBoard.push(row);
  }
  return playerBoard;
};

const generateBombBoard = (rows, columns, bombs) => {
  let bombBoard = [];
  let bombsPlaced = 0;
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(null);
    }
    bombBoard.push(row);
  }
  while (bombsPlaced < bombs) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * columns);
    if (bombBoard[r][c]===null) {
      bombBoard[r][c] = 'B';
      bombsPlaced++;
    }
  }
  return bombBoard;
};

// const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
//   const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
//   const numberOfRows = bombBoard.length;
//   const numberOfColumns = bombBoard[0].length;
//   let numberOfBombs = 0;
//   neighborOffsets.forEach(offset => {
//     const neighborRowIndex = rowIndex + offset[0];
//     const neighborColumnIndex = columnIndex + offset[1];
//
//     // Attempt to refactor this into two complex inequalities ( 0 <= x <= numberOfy)
//     if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
//       if (bombBoard[neighborRowIndex][neighborColumnIndex]==='B') {
//         numberOfBombs ++;
//       }
//     }
//   });
//   return numberOfBombs;
// }

// const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex)=> {
//   if (playerBoard[rowIndex][columnIndex] !== ' '){
//     console.log('This tile has already been flipped!');
//     return;
//   } else if (bombBoard[rowIndex][columnIndex] === 'B') {
//     playerBoard[rowIndex][columnIndex] = 'B';
//     console.log("You're Dead!!");
//   } else {
//     playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
//   }
// };

// const printBoard = (board) => {
//   console.log(board.map(row => row.join(' | ')).join('\n'));
// }

const game = new Board(20,40,150)

console.log('Player Board: ');
Board.print(this._playerBoard);
console.log('Bomb Board: ');
Board.print(this._bombBoard);

Board.flipTile(0, 0);
console.log('Updated Player Board: ');
Board.print(this._playerBoard);
