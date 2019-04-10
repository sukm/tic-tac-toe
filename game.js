const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const player = 'X';
const AI = 'O';

let isPlaying = false;
let board;

class Game {
  constructor() {
    this.board = new Array(9).fill('-');
    this.count = 0;
    this.currPlayer = player;
  }
  addPiece(token, position) {
    const board = this.board;
    if (position < 0 && position > 8) {
      throw new Error('Wrong position');
    }
    if (board[position] !== '-') {
      throw new Error('Already taken');
    }

    board[position] = token;
    this.count += 1;
  }
  print() {
    const board = this.board;
    let result = '';
    for (let i = 0; i < board.length; i += 1) {
      result += board[i];
      if ((i + 1) % 3 === 0 && i < board.length - 1) {
        result += '\n';
      } else if ((i + 1) % 3 !== 0) {
        result += '|';
      }
    }
    console.log(result);
  }
  makeAIMove() {
    // if (this.isFull()) {
    // throw new Error('Board is full');
    // }
    for (let i = 0; i < this.board.length; i += 1) {
      if (this.board[i] === '-') {
        this.board[i] = AI;
        this.count += 1;
        return;
      }
    }
  }
  isFull() {
    return this.count === 9;
  }
  gameLoop(position) {
    if (this.isFull()) {
      return 'Full';
    }
    if (this.currPlayer === player) {
      this.addPiece(player, position);
      this.currPlayer = AI;
    } else {
      this.makeAIMove();
      this.currPlayer = player;
    }
    this.print();
  }
  hasWon() {}
}

const inputTable = {
  '0,0': 0,
  '0,1': 1,
  '0,2': 2,
  '1,0': 3,
  '1,1': 4,
  '1,2': 5,
  '2,0': 6,
  '2,1': 7,
  '2,2': 8,
};

rl.on('line', (input) => {
  try {
    if (!isPlaying) {
      board = new Game();
      isPlaying = true;
    }
    const i = inputTable[input];
    const res = board.gameLoop(i);

    if (res === 'Full') {
      rl.close();
    }
  } catch (error) {
    console.log(error);
  }
});
