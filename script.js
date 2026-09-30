// Sample Sudoku puzzle
// 0 means empty cell

const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const grid = document.getElementById("sudoku-grid");

// Create Sudoku grid
for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        const input = document.createElement("input");

        input.type = "number";
        input.min = "1";
        input.max = "9";
        input.className = "cell";

        // Put sample numbers into the grid
        if (puzzle[row][col] !== 0) {
            input.value = puzzle[row][col];

            // Make original numbers read-only
            input.readOnly = true;
            input.classList.add("given");
        }

        grid.appendChild(input);
    }
}


// Solve Sudoku
function solveSudoku() {

    const cells = document.querySelectorAll(".cell");

    let board = [];

    // Convert grid into 2D array
    for (let row = 0; row < 9; row++) {

        board[row] = [];

        for (let col = 0; col < 9; col++) {

            let value =
                parseInt(cells[row * 9 + col].value);

            board[row][col] =
                isNaN(value) ? 0 : value;
        }
    }

    // Solve the puzzle
    if (solve(board)) {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                cells[row * 9 + col].value =
                    board[row][col];
            }
        }

        document.getElementById("message").innerText =
            "Sudoku solved successfully!";

    } else {

        document.getElementById("message").innerText =
            "This Sudoku puzzle has no solution.";
    }
}


// Backtracking algorithm
function solve(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            // Find an empty cell
            if (board[row][col] === 0) {

                // Try numbers 1 to 9
                for (let num = 1; num <= 9; num++) {

                    if (isValid(board, row, col, num)) {

                        board[row][col] = num;

                        // Continue solving
                        if (solve(board)) {
                            return true;
                        }

                        // Backtrack
                        board[row][col] = 0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}


// Check whether a number is valid
function isValid(board, row, col, num) {

    // Check row
    for (let x = 0; x < 9; x++) {

        if (board[row][x] === num) {
            return false;
        }
    }

    // Check column
    for (let x = 0; x < 9; x++) {

        if (board[x][col] === num) {
            return false;
        }
    }

    // Check 3 × 3 box
    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {

        for (let j = 0; j < 3; j++) {

            if (
                board[startRow + i][startCol + j] === num
            ) {
                return false;
            }
        }
    }

    return true;
}


// Clear the grid
function clearGrid() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        if (!cell.classList.contains("given")) {
            cell.value = "";
        }
    });

    document.getElementById("message").innerText = "";
}