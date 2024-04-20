// pawn = 1
// knight = 3
// bishop = 3
// rook = 5
// queen = 9
// king = 100

const B = "b";
const W = "w";

let playerTurn = true;

const BLANK = { team: "", piece: 0, pieceName: "" };

const kingScoring = [
  -0.012061386986611867, -0.023333378021380864, -0.03826521602752056,
  -0.050059563318787775, -0.05005956331878777, -0.03826521602752056,
  -0.023333378021380864, -0.012061386986611869, -0.02263698334681434,
  -0.049685951521702305, -0.09268403777465939, -0.13222548989105898,
  -0.13222548989105898, -0.09268403777465939, -0.049685951521702305,
  -0.022636983346814344, -0.035593344017429925, -0.0904005048552107,
  -0.20251178215248, -0.3375240706307236, -0.3375240706307236,
  -0.20251178215248003, -0.0904005048552107, -0.035593344017429925,
  -0.04218418509692667, -0.12374579217365012, -0.3314399375031576, -0.5, -0.5,
  -0.33143993750315764, -0.12374579217365012, -0.04218418509692667,
  -0.028875390820770553, -0.10737062378600995, -0.31675017048991677, -0.5, -0.5,
  -0.31675017048991677, -0.10737062378600995, -0.028875390820770553,
  0.015487358203919614, -0.024234457203753296, -0.14724092459985044,
  -0.2981446499339661, -0.2981446499339661, -0.14724092459985044,
  -0.024234457203753296, 0.015487358203919614, 0.09881814122439156,
  0.1358629782240616, 0.035461297669575356, -0.05912822611343158,
  -0.05912822611343159, 0.035461297669575356, 0.1358629782240616,
  0.09881814122439156, 0.17264350492795189, 0.25, 0.1542500539868602,
  0.04191074772265206, 0.04191074772265206, 0.1542500539868602, 0.25,
  0.17264350492795189,
];

const defaultScoring = [
  -0.4843305103173719, -0.47014855237238645, -0.451440642445965,
  -0.43668696490051717, -0.43668696490051717, -0.451440642445965,
  -0.47014855237238645, -0.4843305103173719, -0.47014855237238645,
  -0.43608986750156675, -0.38225732349110875, -0.3328352515559663,
  -0.3328352515559663, -0.38225732349110875, -0.43608986750156675,
  -0.47014855237238645, -0.451440642445965, -0.38225732349110875,
  -0.24201083384152905, -0.07339530774867248, -0.07339530774867248,
  -0.24201083384152905, -0.38225732349110875, -0.451440642445965,
  -0.43668696490051717, -0.33283525155596627, -0.07339530774867248, 0.25, 0.25,
  -0.07339530774867248, -0.3328352515559663, -0.43668696490051717,
  -0.43668696490051717, -0.33283525155596627, -0.07339530774867253, 0.25, 0.25,
  -0.07339530774867248, -0.33283525155596627, -0.43668696490051717,
  -0.451440642445965, -0.38225732349110875, -0.24201083384152905,
  -0.07339530774867253, -0.07339530774867253, -0.24201083384152905,
  -0.38225732349110875, -0.451440642445965, -0.47014855237238645,
  -0.43608986750156675, -0.38225732349110875, -0.33283525155596627,
  -0.33283525155596627, -0.38225732349110875, -0.43608986750156675,
  -0.47014855237238645, -0.4843305103173719, -0.47014855237238645,
  -0.451440642445965, -0.43668696490051717, -0.43668696490051717,
  -0.451440642445965, -0.47014855237238645, -0.4843305103173719,
];

const Board = function () {
  this.pos = [
    { team: "b", piece: 5, pieceName: "r" },
    { team: "b", piece: 3, pieceName: "k" },
    { team: "b", piece: 3, pieceName: "b" },
    { team: "b", piece: 9, pieceName: "q" },
    { team: "b", piece: 100, pieceName: "ki" },
    { team: "b", piece: 3, pieceName: "b" },
    { team: "b", piece: 3, pieceName: "k" },
    { team: "b", piece: 5, pieceName: "r" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "b", piece: 1, pieceName: "p" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "", piece: 0, pieceName: "" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 1, pieceName: "p" },
    { team: "w", piece: 5, pieceName: "r" },
    { team: "w", piece: 3, pieceName: "k" },
    { team: "w", piece: 3, pieceName: "b" },
    { team: "w", piece: 9, pieceName: "q" },
    { team: "w", piece: 100, pieceName: "ki" },
    { team: "w", piece: 3, pieceName: "b" },
    { team: "w", piece: 3, pieceName: "k" },
    { team: "w", piece: 5, pieceName: "r" },
  ];
};

Board.prototype.eval = function () {
  let white = 0;
  let black = 0;
  this.pos.forEach((tile, index) => {
    if (tile.piece == 0) {
      return;
    }
    const scoring =
      tile.pieceName == "ki"
        ? tile.team == W
          ? kingScoring
          : [...kingScoring].reverse()
        : defaultScoring;
    if (tile.team == W) {
      white += tile.piece + scoring[index];
    } else {
      black += tile.piece + scoring[index];
    }
  });
  return Math.round((black - white) * 100) / 100;
};

Board.prototype.display = function () {
  const boardElement = document.querySelector(".board");
  const pieceIcons = {
    r: "♜",
    k: "♞",
    b: "♝",
    q: "♛",
    ki: "♚",
    p: "♟",
  };
  boardElement.innerHTML = "";
  let tileIndex = 0;
  let currentRow;
  this.pos.forEach((tile, index) => {
    if (tileIndex == 0) {
      currentRow = document.createElement("tr");
    }
    const tileElement = document.createElement("td");
    tileElement.id = String(index);
    tileElement.classList.add("tile");
    if (tile.pieceName != "") {
      const pieceElement = document.createElement("div");
      pieceElement.classList.add("piece");
      pieceElement.innerHTML = pieceIcons[tile.pieceName];
      if (tile.team == W) {
        pieceElement.draggable = "true";
        pieceElement.classList.add("white");
      } else {
        pieceElement.classList.add("black");
      }
      tileElement.appendChild(pieceElement);
    }
    currentRow.appendChild(tileElement);
    if (tileIndex == 7) {
      tileIndex = 0;
      boardElement.appendChild(currentRow);
      return;
    }
    tileIndex += 1;
  });

  const pieceElements = document.querySelectorAll(".piece");

  pieceElements.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    });
    piece.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });

    if (this.pos[piece.parentNode.id].team == W) {
      piece.addEventListener("mouseenter", () => {
        this.pieceMoves(piece.parentNode.id).forEach((move) => {
          const moveElement = document.getElementById(String(move));
          moveElement.style.backgroundColor = "gray";
        });
      });
      piece.addEventListener("mouseleave", () => {
        this.pieceMoves(piece.parentNode.id).forEach((move) => {
          const moveElement = document.getElementById(String(move));
          moveElement.style.backgroundColor = "lightgray";
        });
      });
    }
  });

  const tiles = document.querySelectorAll(".tile");

  tiles.forEach(async (tile) => {
    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggingElement = document.querySelector(".dragging");
      const moves = this.pieceMoves(draggingElement.parentNode.id);
      if (e.target.id == "") {
        e.target.id = e.target.parentNode.id;
      }
      if (!moves.includes(parseInt(e.target.id))) return;
      const origin = draggingElement.parentNode;
      if (playerTurn) {
        e.target.innerHTML = "";
        e.target.appendChild(draggingElement);
        this.pos[e.target.id] = this.pos[origin.id];
        this.pos[origin.id] = BLANK;
        this.display();
      }
      playerTurn = false;
      this.bot(4, W);
      this.display();
      playerTurn = true;
    });
  });
};

Board.prototype.pieceMoves = function (index) {
  index = parseInt(index);
  const tile = this.pos[index];

  const rangeDiagonalMoves = () => {
    const upLeft = Math.floor(index / 8);
    const upRight = Math.floor(index / 8);
    const downLeft = index % 8;
    const downRight = 7 - downLeft;

    const possibilities = [];

    for (let i = 1; i < upLeft + 1; i += 1) {
      const calc = index - (8 * i + i);
      if (
        calc < 0 ||
        calc > 63 ||
        this.pos[calc].team == tile.team ||
        calc % 8 == 7
      )
        break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }
    for (let i = 1; i < upRight + 1; i += 1) {
      const calc = index - (8 * i - i);
      if (
        calc < 0 ||
        calc > 63 ||
        this.pos[calc].team == tile.team ||
        calc % 8 == 0
      )
        break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }

    for (let i = 1; i < downLeft + 1; i += 1) {
      const calc = index + (8 * i - i);
      if (
        calc < 0 ||
        calc > 63 ||
        this.pos[calc].team == tile.team ||
        calc % 8 == 7
      )
        break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }
    for (let i = 1; i < downRight + 1; i += 1) {
      const calc = index + (8 * i + i);
      if (
        calc < 0 ||
        calc > 63 ||
        this.pos[calc].team == tile.team ||
        calc % 8 == 0
      )
        break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }

    return possibilities;
  };
  const rangePlaneMoves = () => {
    const left = index % 8;
    const right = 7 - left;
    const top = Math.floor(index / 8);
    const bottom = 7 - top;

    const possibilities = [];

    for (let i = 1; i < left + 1; i += 1) {
      const calc = index - i;
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }
    for (let i = 1; i < right + 1; i += 1) {
      const calc = index + i;
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }

    for (let i = 1; i < top + 1; i += 1) {
      const calc = index - i * 8;
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }
    for (let i = 1; i < bottom + 1; i += 1) {
      const calc = index + i * 8;
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) break;
      possibilities.push(calc);
      if (this.pos[calc].piece != 0) break;
    }

    return possibilities;
  };

  if (tile.pieceName == "p") {
    let move = 1;
    const direction = tile.team == W ? -1 : 1;

    if (
      (tile.team == W && index > 47 && index < 56) ||
      (tile.team == B && index > 7 && index < 16)
    ) {
      move = 2;
    }

    const possibilities = [];

    for (let i = 1; i < move + 1; i += 1) {
      let calc;
      if (tile.team == W) {
        calc = index - 8 * i;
      }
      if (tile.team == B) {
        calc = index + 8 * i;
      }
      if (calc < 0 || calc > 63 || this.pos[calc].piece != 0) break;
      possibilities.push(calc);
    }

    if (
      this.pos[index + direction * 9].piece != 0 &&
      this.pos[index + direction * 9].team != tile.team
    ) {
      possibilities.push(index + direction * 9);
    }
    if (
      this.pos[index + direction * 7].piece != 0 &&
      this.pos[index + direction * 7].team != tile.team
    ) {
      possibilities.push(index + direction * 7);
    }

    return possibilities;
  } else if (tile.pieceName == "r") {
    return rangePlaneMoves();
  } else if (tile.pieceName == "k") {
    const temp = [
      index - 16 + 1,
      index - 16 - 1,
      index + 16 + 1,
      index + 16 - 1,
      index % 8 < 2 ? -1 : index - 2 + 8,
      index % 8 < 2 ? -1 : index - 2 - 8,
      index + 2 + 8,
      index + 2 - 8,
    ];
    const possibilities = [];

    temp.forEach((calc) => {
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) return;
      possibilities.push(calc);
    });

    return possibilities;
  } else if (tile.pieceName == "b") {
    return rangeDiagonalMoves();
  } else if (tile.pieceName == "q") {
    return rangeDiagonalMoves().concat(rangePlaneMoves());
  } else if (tile.pieceName == "ki") {
    const temp = [
      index - 1,
      index + 1,
      index - 8,
      index + 8,
      index - 9,
      index - 7,
      index + 9,
      index + 7,
    ];
    const possibilities = [];

    temp.forEach((calc) => {
      if (calc < 0 || calc > 63 || this.pos[calc].team == tile.team) return;
      possibilities.push(calc);
    });

    return possibilities;
  }
};

Board.prototype.moves = function (team) {
  const options = [];
  this.pos.forEach((tile, index) => {
    if (tile.team != team) return;
    const pieceMoves = this.pieceMoves(index);
    if (pieceMoves != undefined && pieceMoves.length > 0) {
      pieceMoves.forEach((move) => {
        options.push([index, move]);
      });
    }
  });
  return options;
};

Board.prototype.make = function (move) {
  const temp = new Board();
  temp.pos = [...this.pos];
  temp.pos[move[1]] = temp.pos[move[0]];
  temp.pos[move[0]] = BLANK;
  return temp;
};

const minimax = function (board, depth, team, alpha, beta) {
  if (depth == 0 || board.loss(B)) {
    return { move: null, value: board.eval() };
  }

  let best = { move: null, value: team == W ? -Infinity : Infinity };
  const moves = team == W ? board.moves(B) : board.moves(W);

  for (const move of moves) {
    const b = board.make(move);
    const val = minimax(b, depth - 1, team == W ? B : W, alpha, beta);

    if (team == W && val.value > best.value) {
      best.value = val.value;
      best.move = move;
      alpha = Math.max(alpha, val.value);
    } else if (team == B && val.value < best.value) {
      best.value = val.value;
      best.move = move;
      beta = Math.min(beta, val.value);
    }

    if (beta <= alpha) {
      // Alpha-beta pruning
      break;
    }
  }

  return best;
};

Board.prototype.bot = async function (depth, team) {
  const best = minimax(this, depth, team, -Infinity, Infinity);
  this.pos = this.make(best.move).pos;
};

Board.prototype.loss = function (team) {
  let returnValue = true;
  this.pos.forEach((piece) => {
    if (piece.team == team && piece.pieceName == "ki") {
      returnValue = false;
    }
  });
  return returnValue;
};

const board = new Board();
board.display();
