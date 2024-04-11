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

            let cell = document.createElement("td")
            cell.appendChild(input)
            row.appendChild(cell)
        }
        table.appendChild(row);
    }
}

renderTable();