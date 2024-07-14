const cells = document.querySelectorAll('.cell');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] === '') {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        } else if (board.every(cell => cell !== '')) {
            setTimeout(() => alert('Draw!'), 100);
        } else {
            currentPlayer = 'O'; // Switch to AI move
            makeAIMove();
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function makeAIMove() {
    // Simple AI: Random move
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (emptyCells.length) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        if (checkWin('O')) {
            setTimeout(() => alert('O wins!'), 100);
        } else if (board.every(cell => cell !== '')) {
            setTimeout(() => alert('Draw!'), 100);
        } else {
            currentPlayer = 'X'; // Switch back to human move
        }
    }
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}