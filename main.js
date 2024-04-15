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
                let input = cells[i][j].firstChild
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
            row_cells.push(cell)
        }
        cells.push(row_cells);
        table.appendChild(row);
    }
}

/* !!! The actual recursive function !!! */
// 1. Check if unassigned. Skip and traverse grid if already assigned
// 2. Check if 1 will break board. If it breaks, increment up to 9 until board wont break
// 3. If num reaches 9 but still breaks board, backtrack and increment.
function solveBoard(grid, row = 0, col = 0, direction = 1) {
    let current_direction = direction;
    // console.log("Element at [" + row + "][" + col + "]:", grid[row][col]);
    // If row index equals the number of rows (9), stop recursion
    if (row === grid.length) { return true; }


    let current_square = getSquareNumber(row, col);
    let subgrid_cells = [].concat(...grid)
    subgrid_cells = subgrid_cells.filter(obj => obj.firstChild.square === current_square);
    subgrid_cells = Array.from(subgrid_cells).map(parent => parent.firstChild);

    // console.log("row: " + row + "\ncol: " + col);
    let input = grid[row][col].firstChild;
    let num = input.value === "" || input.value === 0 ? 1 : input.value;
    let hasBrokenBoard;
    if (input.unassigned === true) {

        do {
            hasBrokenBoard = false;

            subgrid_cells.map(function(cell) {
                if (Number(cell.value) === num) {
                    hasBrokenBoard = true;
                }
            });

            for (let c = 0; c < grid[row].length; c++) {
                if (c != col) {
                    if (Number(grid[row][c].firstChild.value) === num) {
                        hasBrokenBoard = true;
                    }
                }
            }
            for (let r = 0; r < grid.length; r++) {
                if (r != row) {
                    if (Number(grid[r][col].firstChild.value) === num) {
                        hasBrokenBoard = true;
                    }
                }
            }

            if (hasBrokenBoard === false) {
                console.log("Placing " + num + "\nRow: " + row + "\nCol: " + col);
                // direction = 1;
                input.value = num;
                break;
            } else if (hasBrokenBoard === true) {
                if (num < 9) {
                    num++;
                }
                else {
                    // direction = -1;
                    break;
                }
            }
        } while (num < 10);
    }


    if (hasBrokenBoard === true) {
        current_direction = -1;
    } else if (hasBrokenBoard === false) {
        current_direction = 1;
    }

    console.log(current_direction);
    
    let nextCol = col + (1 * current_direction);
    let nextRow = row;
    if (nextCol === grid[row].length) {
        // Move to next row, reset col to 0
        nextRow = row + 1;
        nextCol = 0;
    } else if (nextCol < 0) {
        if (nextRow === 0) {
            nextRow = 0;
            nextCol = 0;
        } else {
            nextRow = nextRow - 1;
            nextCol = grid[nextRow].length - 1;
        }
    }

    // console.log(String(row + "\n" + col))
    console.log(String(nextRow + "\n" + nextCol))
    // Recursion go brr
    solveBoard(grid, nextRow, nextCol, current_direction);
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


function clearBoard() {
    for (let r = 0; r < cells.length; r++) {
        for (let c = 0; c < cells[r].length; c++) {
            let input = cells[r][c].firstChild;
            input.value = "";
            input.unassigned = true;
            // console.log(cells[r][c]);
        }
    }
}


renderBoard();
console.log(cells);
// solveBoard(cells);