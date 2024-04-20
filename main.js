// console.log("Hello World!")

// Array with all cells 0-80
let cells = [];

async function generateBoard() {
    try {
        clearBoard();
        const response = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}');
        const data = await response.json();
        
        const grid = (data.newboard.grids[0].value);
        grid.map(function(v, i) {
            v.map(function(e, j) {
                if (e !== 0) {
                    let input = cells[i][j]
                    input.value = e;
                    input.unassigned = false;
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


function setUnassigned(input) {
    // Check if input value is empty
    if (input.value.trim() === "" || input.value.trim() == 0) {
        input.unassigned = true;
    } else {
        input.unassigned = false;
    }
}


function validate(event) {
    // Allow tab, arrow keys, and backspace
  if (event.key === "Tab" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Backspace") {
    return;
  }
  // Allow numerical digits
  if (/^\d$/.test(event.key)) {
    return;
  }
  // Prevent default action for all other keys
  event.preventDefault();
}


function renderBoard() {
    const table = document.getElementById("gui");

    for (let r = 0; r < 9; r++) {
        let row = document.createElement("tr");
        let row_cells = [];
        for (let c = 0; c < 9; c++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.row = r;
            input.column = c;
            input.square = getSquareNumber(input.row, input.column);
            input.unassigned = true;
            input.addEventListener("keydown", validate);
            input.addEventListener("input", function() {
                setUnassigned(input);
            })

            // console.log("\nrow: " + r + "\ncolumn: " + c + "\nsquare: " + input.square)
            let cell = document.createElement("td");
            cell.appendChild(input);
            row.appendChild(cell);
            row_cells.push(input)
        }
        cells.push(row_cells);
        table.appendChild(row);
    }
}


function getSquareNumber(row, column) {
    // offset column and row by 1, so they don't start at 0
    column++;
    row++;

    // 1st row
    if (column <= 3 && row <= 3) {
        return 0;
    } else if ((column >= 4 && column <= 6) && row <= 3) {
        return 1;
    } else if ((column >= 7 && column <= 9) && row <= 3) {
        return 2;
    }
    // 2nd row
    else if ((row >= 4 && row <= 6) && column <= 3) {
        return 3;
    } else if ((row >= 4 && row <= 6) && (column >= 4 && column <= 6)) {
        return 4;
    } else if ((row >= 4 && row <= 6) && (column >= 7 && column <= 9)) {
        return 5;
    }
    // 3rd row
     else if ((row >= 7 && row <= 9) && column <= 3) {
        return 6;
    } else if ((row >= 7 && row <= 9) && (column >= 4 && column <= 6)) {
        return 7;
    } else if ((row >= 7 && row <= 9) && (column >= 7 && column <= 9)) {
        return 9;
    } 
}

/** !!! The actual recursive function !!! **/
function solveBoard(grid, r = 0, c = 0) {
    if (r === 9) {
        // Base case: We've solved the board!
        return true;
    } else if (c === 9) {
        // We've hit the end of the column, move to next row
        return solveBoard(grid, r+1, 0);
    } else if (grid[r][c].unassigned === false) {
        // We've hit column already assigned, move to next col
        return solveBoard(grid, r, c+1);
    } else {
        for (let v = 1; v < 10; v++) {
            if (isValid(grid, r, c, v)) {
                console.log(v + " is valid")
                grid[r][c].classList.add("pico-color-azure-400");
                grid[r][c].value = String(v);
                if (solveBoard(grid, r, c+1) === true) {
                    return true;
                }
                // Unset the value if next solve (c+1) backtracks
                grid[r][c].value = "";
            }
        }
        // Numbers 1-9 are exhausted: return false and backtrack
        return false;
    }
}


function isValid(grid, r, c, value) {
    for (let i = 0; i < grid[r].length; i++) {
        if (Number(grid[r][i].value) === value && i != c) {
            console.log(value + " already in row");
            return false;
        }
    }
    for (let j = 0; j < grid.length; j++) {
        if (Number(grid[j][c].value) === value && j != r) {
            console.log(value + " already in column");
            return false;
        }
    }
    let currentSquare = getSquareNumber(r, c);
    let subgridCells = [].concat(...grid).filter(input => input.square === currentSquare);
    for (let cell of subgridCells) {
        if (Number(cell.value) === value) {
            return false;
        }
    }

    return true;
}


function clearBoard() {
    for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
            let input = cells[r][c];
            input.value = "";
            input.classList.remove("pico-color-azure-400");
            input.unassigned = true;
        }
    }
}

renderBoard();