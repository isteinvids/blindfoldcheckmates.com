export default ['$location', '$scope', '$timeout', function ($location, $scope, $timeout) {
  this.playingAs = 'white';
  this.currentlyPlaying = 'black';

  this.blindfolded = true;

  this.pgn = '';
  this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
  this.winner = null;

  let chess = new Chess();

  this.createNewGame = function (newFen) {
    chess.reset();
    chess = new Chess(newFen || this.fen);
    this.pgn = chess.pgn();
    this.fen = chess.fen();
    this.ascii = chess.ascii();

    this.winner = null;
    this.blindfolded = false;
    this.playingAs = chess.turn() === 'w' ? 'white' : 'black';

    // set the currently playing based on the turn
    this.currentlyPlaying = chess.turn() === 'w' ? 'white' : 'black';
    console.log('New game created with FEN:', this.fen);
  }

  this.moveTo = function (from, to) {
    if (chess.game_over()) {
      console.error('Game is over, cannot make a move');
      return;
    }

    const move = chess.move({ from: from, to: to, promotion: 'q' }); // always promote to queen for simplicity
    if (move === null) {
      console.error('Invalid move:', from, to);
      return;
    }

    this.pgn = chess.pgn();
    this.fen = chess.fen();
    this.ascii = chess.ascii();

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

    this.pgn = chess.pgn();
    this.fen = chess.fen();
    this.ascii = chess.ascii();

    // this.blindfolded = !this.blindfolded;
  }

  this.doRandomChessMove();
}];
