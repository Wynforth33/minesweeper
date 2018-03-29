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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
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

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex)=> {
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
    console.log("You're Dead!!");
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
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

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
