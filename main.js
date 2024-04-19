// console.log("Hello World!")

// Array with all cells 0-80
let cells = [];

function loadBoard() {
    clearBoard();
    let sudoku1 =  [[0,0,0,2,6,0,7,0,1],
                    [6,8,0,0,7,0,0,9,0],
                    [1,9,0,0,0,4,5,0,0],
                    [8,2,0,1,0,0,0,4,0],
                    [0,0,4,6,0,2,9,0,0],
                    [0,5,0,0,0,3,0,2,8],
                    [0,0,9,3,0,0,0,7,4],
                    [0,4,0,0,5,0,0,3,6],
                    [7,0,3,0,1,8,0,0,0]
    ];
    
    let sudoku2 = [
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
    
    let sudoku3 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 8, 5],
        [0, 0, 1, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 7, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 1, 0, 0],
        [0, 9, 0, 0, 0, 0, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 7, 3],
        [0, 0, 2, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 9]
    ];

    let sudoku4 = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0]
      ];
      

    // Generate a random number between 1 and 3 (inclusive)
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    let randomBoard;

    // Switch statement based on the random number
    switch (randomNumber) {
    case 1:
        randomBoard = sudoku1
        break;
    case 2:
        randomBoard = sudoku2
        break;
    case 3:
        randomBoard = sudoku3
        break;
    case 4:
        randomBoard = sudoku4
        break;
    }

    randomBoard.map(function(v, i, a) {
        // console.log(v);
        v.map(function(e, j, a) {
            if (e !== 0) {
                let input = cells[i][j]
                input.value = e;
                input.unassigned = false;
            }
        });
    });

    // randomBoard = [].concat(...randomBoard);

    // for (let i = 0; i < randomBoard.length; i++) {
    //     if (randomBoard[i] != 0) {
    //         cells[i].firstElementChild.value = randomBoard[i];
    //     }
    // }
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

function solveBoard(grid, r = 0, c = 0) {
    // Base case: We've solved the board!
    if (r === 9) {
        return true;
    // We've hit the end of the column, move to next row
    } else if (c === 9) {
        return solveBoard(grid, r+1, 0);
    } else if (grid[r][c].unassigned === false) {
        // console.log("Next column")
        return solveBoard(grid, r, c+1);
    } else {
        for (let v = 1; v < 10; v++) {
            if (isValid(grid, r, c, v)) {
                console.log(v + " is valid")
                grid[r][c].value = String(v);
                if (solveBoard(grid, r, c+1) === true) {
                    return true;
                }
                // console.log("Override with empty");
                grid[r][c].value = "";
            }
        }
        return false;
    }
}


function isValid(grid, r, c, value) {
    // let valid = false;
    // let notInRow = !grid[r].some(input => Number(input.value) === value);
    // let notInColumn = !Array.from({ length: 9 }, (_, i) => grid[i][c]).some(input => Number(input.value) === value)

    // let currentSquare = getSquareNumber(r, c);
    // let subgridCells = [].concat(...grid).filter(input => input.square === currentSquare);
    // // console.log(subgridCells);
    // let notInSubgrid = !subgridCells.some(cell => cell.square === value);

    // if (notInRow && notInColumn && notInSubgrid) { valid = true}

    // return valid;

    // if (Array.from(grid[r]).map(input => Number(input.value)).includes(value)) {
    //     return false;
    // } 
    // console.log(grid.map(row => row[c]).map(input => Number(input.value)));
    // if (grid.map(row => row[c]).map(input => Number(input.value)).includes(value)) {
    //     return false;
    // }

    // let currentSquare = getSquareNumber(r, c);
    // let subgridCells = [].concat(...grid).filter(input => input.square === currentSquare);
    // if (subgridCells.some(cell => cell.square === value)) {
    //     return false;
    // }
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
            input.unassigned = true;
            // console.log(cells[r][c]);
        }
    }
}



renderBoard();
console.log(cells);
// solveBoard(cells);