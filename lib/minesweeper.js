'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('You Lose; Fatality! Final Board: ');
        this._board.print(this._board.playerBoard);
        console.log('Bomb Board: ');
        this._board.print(this._board.bombBoard);
      } else if (!this._board.hasSafeTiles()) {
        console.log('The Dirty Work is Over.. Go Have A Drink!! Final Player Board: ');
      } else {
        console.log('Current Board: ');
        this._board.print(this._board.playerBoard);
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        console.log("BOOOOOOOM!!! You have found a Bomb!");
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        // Attempt to refactor this into two complex inequalities ( 0 <= x <= numberOfy)
        if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print(board) {
      console.log(board.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'bombBoard',
    get: function get() {
      return this._bombBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(rows, columns) {
      var playerBoard = [];
      for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < columns; j++) {
          row.push(' ');
        }
        playerBoard.push(row);
      }
      return playerBoard;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(rows, columns, bombs) {
      var bombBoard = [];
      var bombsPlaced = 0;
      for (var i = 0; i < rows; i++) {
        var row = [];
        for (var j = 0; j < columns; j++) {
          row.push(' ');
        }
        bombBoard.push(row);
      }
      while (bombsPlaced < bombs) {
        var r = Math.floor(Math.random() * rows);
        var c = Math.floor(Math.random() * columns);
        if (bombBoard[r][c] === ' ') {
          bombBoard[r][c] = 'B';
          bombsPlaced++;
        }
      }
      return bombBoard;
    }
  }]);

  return Board;
}();

var game = new Game(20, 20, 100);
game.playMove(0, 0);