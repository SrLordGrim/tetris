// Variables del juego
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const board = [];
let score = 0;
let currentPiece;
let nextPiece;

// Elementos del DOM
const tetris = document.getElementById('tetris');
const boardElement = document.getElementById('board');
const nextPieceElement = document.getElementById('next-piece');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

// Crear el tablero
function createBoard() {
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  }
}

// Dibujar el tablero
function drawBoard() {
  let html = '';
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] !== 0) {
        html += `<div class="block" style="top:${row * BLOCK_SIZE}px;left:${col * BLOCK_SIZE}px;"></div>`;
      }
    }
  }
  boardElement.innerHTML = html;
}

// Crear pieza aleatoria
function createPiece() {
  const pieces = [
    {
      color: 'cyan',
      blocks: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    },
    {
      color: 'blue',
      blocks: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2]
      ]
    },
    {
      color: 'orange',
      blocks: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0]
      ]
    },
    {
      color: 'yellow',
      blocks: [
        [0, 0, 0],
        [4, 4, 4],
        [0, 4, 0]
      ]
    },
    {
      color: 'green',
      blocks: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0]
      ]
    },
    {
      color: 'purple',
      blocks: [
        [0, 0, 0],
        [6, 6, 0],
        [0, 6, 6]
      ]
    },
    {
      color: 'red',
      blocks: [
        [0, 0, 0],
        [0, 7, 7],
        [0, 7, 7]
      ]
    }
  ];
  const piece = pieces[Math.floor(Math.random() * pieces.length)];
  return {
    color: piece.color,
    blocks: piece.blocks,
    row: 0,
    col: Math.floor(Math.random() * (COLS - piece.blocks[0].length + 1))
  };
}

// Dibujar la pieza actual
function drawPiece() {
  let html = '';
  for (let row = 0; row < currentPiece.blocks.length; row++) {
    for (let col = 0; col < currentPiece.blocks[0].length; col++) {
        if (currentPiece.blocks[row][col]) {
        html += `<div class="block ${currentPiece.color}" style="top:${(currentPiece.y + row) * blockSize}px;left:${(currentPiece.x + col) * blockSize}px;"></div>`;
        }
        }
        }
        pieceElement.innerHTML = html;
        }
        
        // Mover la pieza actual hacia abajo
        function moveDown() {
        currentPiece.y++;
        if (hasCollisions()) {
        currentPiece.y--;
        placePiece();
        removeFullRows();
        addNewPiece();
        if (hasCollisions()) {
        gameOver();
        }
        }
        draw();
        }
        
        // Mover la pieza actual hacia la izquierda
        function moveLeft() {
        currentPiece.x--;
        if (hasCollisions()) {
        currentPiece.x++;
        }
        draw();
        }
        
        // Mover la pieza actual hacia la derecha
        function moveRight() {
        currentPiece.x++;
        if (hasCollisions()) {
        currentPiece.x--;
        }
        draw();
        }
        
        // Rotar la pieza actual
        function rotate() {
        const previousPiece = currentPiece.blocks;
        currentPiece.blocks = currentPiece.blocks[0].map((_, index) =>
        currentPiece.blocks.map((row) => row[index]).reverse()
        );
        if (hasCollisions()) {
        currentPiece.blocks = previousPiece;
        }
        draw();
        }
        
        // Comprobar si la pieza actual tiene colisiones con los bordes o con otras piezas
        function hasCollisions() {
        for (let row = 0; row < currentPiece.blocks.length; row++) {
        for (let col = 0; col < currentPiece.blocks[0].length; col++) {
        if (
        currentPiece.blocks[row][col] &&
        (currentPiece.x + col < 0 ||
        currentPiece.x + col >= board[0].length ||
        currentPiece.y + row >= board.length ||
        board[currentPiece.y + row][currentPiece.x + col])
        ) {
        return true;
        }
        }
        }
        return false;
        }
        
        // Colocar la pieza actual en el tablero
        function placePiece() {
        for (let row = 0; row < currentPiece.blocks.length; row++) {
        for (let col = 0; col < currentPiece.blocks[0].length; col++) {
        if (currentPiece.blocks[row][col]) {
        board[currentPiece.y + row][currentPiece.x + col] = currentPiece.color;
        }
        }
        }
        }
        
        // Eliminar las filas completas del tablero y aumentar la puntuación
        function removeFullRows() {
        let rowsToRemove = [];
        for (let row = 0; row < board.length; row++) {
        if (board[row].every((block) => block !== '')) {
        rowsToRemove.push(row);
        }
        }
        for (let i = rowsToRemove.length - 1; i >= 0; i--) {
        board.splice(rowsToRemove[i], 1);
        board.unshift(new Array(board[0].length).fill(''));
        score += 10;
        }
        updateScore();
        }
        
        // Añadir una nueva pieza al juego
        function addNewPiece() {
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        currentPiece = {
        blocks: randomPiece.blocks,
        color: randomPiece.color,
        x: Math.floor((board[0].length - randomPiece.blocks[0].length) / 2),
        y: 0,
        };
        }
        
        // Actualizar la puntuación en la página
        function updateScore() {
            document.getElementById('score').innerHTML = score.toString();
            }
            
            // Mover la pieza actual hacia abajo
            function moveDown() {
            if (canMove(0, 1)) {
            currentPiece.y += 1;
            } else {
            lockPiece();
            checkRows();
            spawnPiece();
            }
            }
            
            // Mover la pieza actual hacia la izquierda
            function moveLeft() {
            if (canMove(-1, 0)) {
            currentPiece.x -= 1;
            }
            }
            
            // Mover la pieza actual hacia la derecha
            function moveRight() {
            if (canMove(1, 0)) {
            currentPiece.x += 1;
            }
            }
            
            // Rotar la pieza actual
            function rotatePiece() {
            if (canRotate()) {
            currentPiece.rotate();
            }
            }
            
            // Verificar si se puede mover la pieza actual
            function canMove(moveX, moveY) {
            let newX = currentPiece.x + moveX;
            let newY = currentPiece.y + moveY;
            for (let row = 0; row < currentPiece.blocks.length; row++) {
            for (let col = 0; col < currentPiece.blocks[0].length; col++) {
            if (currentPiece.blocks[row][col]) {
            let x = newX + col;
            let y = newY + row;
            if (y < 0 || x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT || board[y][x]) {
            return false;
            }
            }
            }
            }
            return true;
            }
            
            // Verificar si se puede rotar la pieza actual
            function canRotate() {
            let rotatedBlocks = currentPiece.getRotatedBlocks();
            for (let row = 0; row < rotatedBlocks.length; row++) {
            for (let col = 0; col < rotatedBlocks[0].length; col++) {
            if (rotatedBlocks[row][col]) {
            let x = currentPiece.x + col;
            let y = currentPiece.y + row;
            if (y < 0 || x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT || board[y][x]) {
            return false;
            }
            }
            }
            }
            return true;
            }
            
            // Fijar la pieza actual en el tablero
            function lockPiece() {
            for (let row = 0; row < currentPiece.blocks.length; row++) {
            for (let col = 0; col < currentPiece.blocks[0].length; col++) {
            if (currentPiece.blocks[row][col]) {
            let x = currentPiece.x + col;
            let y = currentPiece.y + row;
            board[y][x] = currentPiece.color;
            }
            }
            }
            }
            
            // Verificar si una fila está completa
            function isRowComplete(row) {
            for (let col = 0; col < BOARD_WIDTH; col++) {
            if (!board[row][col]) {
            return false;
            }
            }
            return true;
            }
            
            // Eliminar las filas completas y actualizar la puntuación
            function checkRows() {
            let rowsCleared = 0;
            for (let row = 0; row < BOARD_HEIGHT; row++) {
            if (isRowComplete(row)) {
            rowsCleared += 1;
            for (let y = row; y > 0; y--) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
            board[y][x] = board[y-1][x];
        }
        }
        for (let x = 0; x < BOARD_WIDTH; x++) {
        board[0][x] = 0;
        }
        }
        }
        if (rowsCleared > 0) {
        score += rowsCleared * 100;
        updateScore();
        }
        }
