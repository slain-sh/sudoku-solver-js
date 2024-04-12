// console.log("Hello World!")

// Array with all cells 0-80
let cells = [];

function renderTable() {
    const table = document.getElementById("gui");

    for (let r = 0; r < 9; r++) {
        let row = document.createElement("tr");
        for (let c = 0; c < 9; c++) {
            let input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.row = r;
            input.column = c;
            input.square = getSquareNumber(r, c)

            console.log("\nrow: " + r + "\ncolumn: " + c + "\nsquare: " + input.square)

            let cell = document.createElement("td");
            cell.appendChild(input);
            row.appendChild(cell);
            cells.push(cell);
        }
        table.appendChild(row);
    }
}

function getSquareNumber(row, column) {
    // offset column and row by 1, so they don't start at 0
    column++;
    row++;

    // 1st row
    if (column <= 3 && row <= 3) {
        return 1;
    } else if ((column >= 4 && column <= 6) && row <= 3) {
        return 2;
    } else if ((column >= 7 && column <= 9) && row <= 3) {
        return 3;
    }
    // 2nd row
    else if ((row >= 4 && row <= 6) && column <= 3) {
        return 4;
    } else if ((row >= 4 && row <= 6) && (column >= 4 && column <= 6)) {
        return 5;
    } else if ((row >= 4 && row <= 6) && (column >= 7 && column <= 9)) {
        return 6;
    }
    // 3rd row
     else if ((row >= 7 && row <= 9) && column <= 3) {
        return 7;
    } else if ((row >= 7 && row <= 9) && (column >= 4 && column <= 6)) {
        return 8;
    } else if ((row >= 7 && row <= 9) && (column >= 7 && column <= 9)) {
        return 9;
    } 
}

renderTable();
console.log(cells);