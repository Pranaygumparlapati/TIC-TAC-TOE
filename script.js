const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const xMovesText = document.getElementById("xMoves");
const oMovesText = document.getElementById("oMoves");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;
let moveCount = { X: 0, O: 0 };

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  
    [0, 4, 8], [2, 4, 6]              
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", restartGame);

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    moveCount[currentPlayer]++;
    this.textContent = currentPlayer;
    this.classList.add("taken");

    updateMoveCount();
    checkWinner();
}

function updateMoveCount() {
    xMovesText.textContent = moveCount["X"];
    oMovesText.textContent = moveCount["O"];
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let condition of winningCombinations) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        running = false;

        winningCells.forEach(index => {
            cells[index].classList.add("winner");
        });

    } else if (!board.includes("")) {
        statusText.textContent = "😲 It's a Draw!";
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    moveCount = { X: 0, O: 0 };

    statusText.textContent = "Player X's Turn";
    xMovesText.textContent = "0";
    oMovesText.textContent = "0";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "winner");
    });
}
