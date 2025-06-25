// Estado del tablero
// 0 = vacío, 1 = barco, 2 = tocado, 3 = agua (fallo)
let gameBoard = [
  [1,1,1,1,1,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0],
  [1,0,0,1,1,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

let shipsVisible = false;

// Referencias DOM
const board = document.getElementById('game-board');
const fireButton = document.getElementById('fire-button');
const inputRow = document.getElementById('input-row');
const inputCol = document.getElementById('input-col');
const showShipsButton = document.getElementById('show-ships-button');

// Render del tablero con 100 divs dentro (flex-wrap: wrap)
function renderBoard() {
  board.innerHTML = '';

  for(let r=0; r<10; r++) {
    for(let c=0; c<10; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const cellValue = gameBoard[r][c];

      if(cellValue === 0) cell.classList.add('empty');
      else if(cellValue === 1) {
        if(shipsVisible) cell.classList.add('ship');
        else cell.classList.add('empty');
      }
      else if(cellValue === 2) cell.classList.add('hit');
      else if(cellValue === 3) cell.classList.add('miss');

      // Al hacer clic dispara directo en esta celda
      cell.addEventListener('click', () => {
        fireTorpedo(r, c);
      });

      board.appendChild(cell);
    }
  }
}

// Función disparar con coordenadas recibidas o con inputs
function fireTorpedo(row, col) {
  if(row === undefined || col === undefined) {
    row = parseInt(inputRow.value, 10);
    col = parseInt(inputCol.value, 10);

    if(isNaN(row) || isNaN(col) || row < 0 || row > 9 || col < 0 || col > 9) {
      alert('Por favor ingresa coordenadas válidas (0-9)');
      return;
    }
  }

  if(gameBoard[row][col] === 2 || gameBoard[row][col] === 3) {
    alert('Ya disparaste en esta celda');
    return;
  }

  if(gameBoard[row][col] === 1) {
    gameBoard[row][col] = 2; // tocado
  } else if(gameBoard[row][col] === 0) {
    gameBoard[row][col] = 3; // fallido
  }

  inputRow.value = '';
  inputCol.value = '';
  fireButton.disabled = true;

  renderBoard();
}

// Mostrar u ocultar barcos
function toggleShips() {
  shipsVisible = !shipsVisible;
  showShipsButton.textContent = shipsVisible ? 'Ocultar barcos' : 'Mostrar barcos';
  renderBoard();
}

// Habilitar botón disparar solo si ambos inputs tienen valor
function checkInputs() {
  fireButton.disabled = !(inputRow.value !== '' && inputCol.value !== '');
}

// Listeners
fireButton.addEventListener('click', () => fireTorpedo());
showShipsButton.addEventListener('click', toggleShips);
inputRow.addEventListener('input', checkInputs);
inputCol.addEventListener('input', checkInputs);

// Inicializar
renderBoard();

