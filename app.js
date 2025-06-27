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
  board.innerHTML = '';  // Limpiar el tablero antes de volver a renderizarlo

  // Iterar de 0 a 8 para crear un tablero de 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const cellValue = gameBoard[r][c]; // Acceder a las celdas del tablero

      // Dependiendo del valor de la celda, asignar la clase correspondiente
      if (cellValue === 0) cell.classList.add('empty');
      else if (cellValue === 1) {
        if (shipsVisible) cell.classList.add('ship');
        else cell.classList.add('empty');
      }
      else if (cellValue === 2) cell.classList.add('hit');
      else if (cellValue === 3) cell.classList.add('miss');

      // Al hacer clic en la celda, disparar directamente
      cell.addEventListener('click', () => {
        fireTorpedo(r, c);  // Pasar las coordenadas correctamente
      });

      board.appendChild(cell); // Añadir la celda al tablero
    }
  }
}

// Función disparar con coordenadas recibidas o con inputs
function fireTorpedo(row, col) {
  if (row === undefined || col === undefined) {
    // Parsear correctamente las coordenadas ingresadas
    row = parseInt(inputRow.value) - 1; // Restar 1 para que los índices sean de 0 a 8
    col = parseInt(inputCol.value) - 1;

    // Validar que las coordenadas sean correctas
    if (isNaN(row) || isNaN(col) || row < 0 || row > 8 || col < 0 || col > 8) {
      alert('Por favor ingresa coordenadas válidas (1-9)');
      return;
    }
  }

  // Comprobar si ya se disparó en esa celda
  if (gameBoard[row][col] === 2 || gameBoard[row][col] === 3) {
    alert('Ya disparaste en esta celda');
    return;
  }

  // Si el disparo es a un barco
  if (gameBoard[row][col] === 1) {
    gameBoard[row][col] = 2; // Marca la celda como tocada
  } else if (gameBoard[row][col] === 0) {
    gameBoard[row][col] = 3; // Marca la celda como agua (fallo)
  }

  // Limpiar los inputs y deshabilitar el botón
  inputRow.value = '';
  inputCol.value = '';
  fireButton.disabled = true;

  renderBoard(); // Volver a renderizar el tablero
}

// Mostrar u ocultar barcos
function toggleShips() {
  shipsVisible = !shipsVisible;
  showShipsButton.textContent = shipsVisible ? 'Ocultar barcos' : 'Mostrar barcos';
  renderBoard();
}

// Habilitar botón disparar solo si ambos inputs tienen valor
// Habilitar el botón de disparo solo si ambos inputs tienen valor
function checkInputs() {
  fireButton.disabled = !(inputRow.value !== '' && inputCol.value !== '');
}

// Listeners para entradas y disparo
fireButton.addEventListener('click', () => fireTorpedo());
showShipsButton.addEventListener('click', toggleShips);
inputRow.addEventListener('input', checkInputs);
inputCol.addEventListener('input', checkInputs);
// Inicializar
renderBoard();

