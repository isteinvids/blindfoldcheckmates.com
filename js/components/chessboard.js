export default () => {
  // dialog component
  return {
    templateUrl: 'templates/chessboard.html',
    controllerAs: '$ctrl',
    bindings: {
      'fen': '<',
      'winner': '<',
      'size': '<', // size in pixels, default is 64
      'onMove': '&', // callback for when a move is made
    },
    controller: [function () {
      this.squares = 'abcdefgh'.split('');
      this.ranks = '87654321'.split('');

      console.log('chessboard controller loaded');

      this.onSquareTap = function ($event, coord) {
        if (this.selectedPiece) {
          this.onMove({ from: this.selectedPiece, to: coord });
          this.selectedPiece = null; // reset selected piece after move
        }
      }

      this.onPieceTap = function ($event, coord) {
        console.log('piece tapped', coord);
        this.selectedPiece = coord;
      }
      
      this.flip = function () {
        console.log('flip');
        this.ranks.reverse();
        this.squares.reverse();
      }

      this.pieces = {};

      // this.pieces['e4'] = 'P';
      // this.pieces['e5'] = 'p';
      // this.pieces['e2'] = 'n';

      // set up pieces from the fen
      this.$onChanges = (changes) => {
        const constantSquares = 'abcdefgh'.split(''); // this.squares may flip, so we use this
        const constantRanks = '87654321'.split('');
  
        if (changes.fen && changes.fen.currentValue) {
          this.pieces = {};
          const fen = changes.fen.currentValue;
          const parts = fen.split(' ');
          const board = parts[0].split('/');
          for (let rank = 0; rank < 8; rank++) {
            let file = 0;
            for (let char of board[rank]) {
              const coord = `${constantSquares[file]}${constantRanks[rank]}`;
              if (isNaN(char)) {
                this.pieces[coord] = char;
                file++;
              } else {
                file += parseInt(char);
              }
            }
          }
        }
      };

      this.$onChanges({ fen: { currentValue: this.fen } });

      this.isLight = function (fen) {
        // returns true if the square is light
        const file = fen.charCodeAt(0) - 'a'.charCodeAt(0);
        const rank = parseInt(fen[1]) - 1;
        return (file + rank) % 2 === 1;
      }

      this.isDark = function (fen) {
        return !this.isLight(fen);
      }

      this.fenToClassName = function (fen) {
        switch (fen) {
          case 'r': return 'rook-b';
          case 'n': return 'knight-b';
          case 'b': return 'bishop-b';
          case 'q': return 'queen-b';
          case 'k': return 'king-b';
          case 'p': return 'pawn-b';
          case 'R': return 'rook-w';
          case 'N': return 'knight-w';
          case 'B': return 'bishop-w';
          case 'Q': return 'queen-w';
          case 'K': return 'king-w';
          case 'P': return 'pawn-w';
          default: return '';
        }
      };

    }]
  };
};
