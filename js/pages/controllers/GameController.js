export default ['$location', '$scope', '$timeout', function ($location, $scope, $timeout) {
  this.playingAs = 'white';
  this.currentlyPlaying = 'black';

  this.pgn = '';
  this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  const chess = new Chess()

  this.doRandomChessMove = function () {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move);

    if (!chess.game_over()) {
      $timeout(() => {
        this.doRandomChessMove()
      }, 100);
    }

    this.pgn = chess.pgn();
    this.fen = chess.fen();
  }

  this.doRandomChessMove();
}];
