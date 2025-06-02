
export function isLight(fen) {
  // returns true if the square is light
  const file = fen.charCodeAt(0) - 'a'.charCodeAt(0);
  const rank = parseInt(fen[1]) - 1;
  return (file + rank) % 2 === 1;
}

export function isDark(fen) {
  return !this.isLight(fen);
}

export function fenToClassName(fen) {
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