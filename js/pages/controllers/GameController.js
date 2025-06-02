import * as chessUtils from '../../chessUtils.js';

export default ['$location', '$scope', '$timeout', function ($location, $scope, $timeout) {
  this.playingAs = 'white';
  this.currentlyPlaying = 'black';

  this.blindfolded = true;

  this.pgn = '';
  this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
  this.winner = null;
  this.chessUtils = chessUtils;

  let chess = new Chess();

  this.createNewGame = function (newFen) {
    chess.reset();
    chess = new Chess(newFen || this.fen);

    this.updateValues();

    this.winner = null;
    this.blindfolded = false;
    this.playingAs = chess.turn() === 'w' ? 'white' : 'black';

    // set the currently playing based on the turn
    this.currentlyPlaying = chess.turn() === 'w' ? 'white' : 'black';
    console.log('New game created with FEN:', this.fen);
  }

  this.moveTo = function (from, to) {
    this.inputMove = '';

    if (chess.game_over()) {
      console.error('Game is over, cannot make a move');
      return;
    }

    let move = null;

    if (from && to) {
      move = chess.move({ from: from, to: to, promotion: 'q' });
    } else if (from) {
      move = chess.move(from);
    }

    if (move === null) {
      console.error('Invalid move:', from, to);
      return;
    }

    this.updateValues();

    // if current player is not the playingAs, do a random move
    if (chess.turn() !== (this.playingAs === 'white' ? 'w' : 'b')) {
      this.currentlyPlaying = chess.turn() === 'w' ? 'white' : 'black';
      this.doRandomChessMove();
    } else {
      this.currentlyPlaying = chess.turn() === 'w' ? 'black' : 'white';
    }
  }

  this.doRandomChessMove = function () {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    // {current player} moved {move}
    console.log(`${chess.turn()} moved ${move}`);
    chess.move(move);

    if (chess.game_over()) {
      this.winner = chess.in_checkmate() ? (chess.turn() === 'w' ? 'black' : 'white') : 'draw';
    } else {
      // $timeout(() => {
      //   this.doRandomChessMove()
      // }, 1000);
    }

    this.updateValues();

    // this.blindfolded = !this.blindfolded;
  }

  this.updateValues = function () {
    this.pgn = chess.pgn();
    this.fen = chess.fen();
    this.ascii = chess.ascii();

    const board = chess.board();
    // put the pieces in this.pieces, in the format of : {'a1': 'r', 'e4': 'P', ...}
    this.pieces = {};
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const square = String.fromCharCode(97 + file) + (8 - rank);
        const piece = board[rank][file];
        if (piece) {
          this.pieces[square] = chessUtils.fenToClassName(piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase());
        }
      }
    }
  }

  this.doRandomChessMove();
}];
