class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('You Lose; Fatality! Final Board: ');
      this._board.print(this._board.playerBoard);
      console.log('Bomb Board: ')
      this._board.print(this._board.bombBoard);
    } else if (!this._board.hasSafeTiles()) {
      console.log('The Dirty Work is Over.. Go Have A Drink!! Final Player Board: ');
    } else {
      console.log('Current Board: ')
      this._board.print(this._board.playerBoard);
    }
  }
}

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

  get bombBoard() {
    return this._bombBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
      console.log("BOOOOOOOM!!! You have found a Bomb!")
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
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex]==='B') {
          numberOfBombs ++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(rows, columns) {
    let playerBoard = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push(' ');
      }
      playerBoard.push(row);
    }
    return playerBoard;
  }

  static generateBombBoard(rows, columns, bombs) {
    let bombBoard = [];
    let bombsPlaced = 0;
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        row.push(' ');
      }
      bombBoard.push(row);
    }
    while (bombsPlaced < bombs) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * columns);
      if (bombBoard[r][c]===' ') {
        bombBoard[r][c] = 'B';
        bombsPlaced++;
      }
    }
    return bombBoard;
  }
}

const game = new Game(20,20,100);
game.playMove(0,0);
