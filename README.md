# Sudoku Solver JS
## Showcase: https://youtu.be/qXVeqdareEA
- Video showcase: https://youtu.be/qXVeqdareEA
- View the site: https://zakar98k.github.io/sudoku-solver-js/

## Project description:

This is Sudoku Solver JS, my final project for CS50x! This project showcases a [Sudoku](https://en.wikipedia.org/wiki/Sudoku) solver implemented in JavaScript using the [backtracking algorithm](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms). In this README, we'll delve into how backtracking works, its application in solving Sudoku puzzles, and how it is implemented using [recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) in JavaScript.

### How Backtracking Works

Backtracking is an algorithmic technique used to find solutions to constraint satisfaction problems, where you must make a series of choices that ultimately satisfy a set of constraints. It involves systematically trying different options until a solution is found or all possibilities have been exhausted.

The basic idea behind backtracking is to explore all possible paths recursively, making a choice at each step and backtracking if the choice leads to a dead end. By backtracking, the algorithm revisits previous decisions and explores alternative paths, thus efficiently searching through the solution space.

### Using Backtracking to solve Sudoku Boards

Sudoku is a popular puzzle game that involves filling a 9x9 grid with digits from 1 to 9, subject to certain constraints. The objective is to fill the grid in such a way that each row, column, and 3x3 subgrid contains all the digits from 1 to 9 without repetition.

Backtracking is an effective technique for solving Sudoku puzzles because it allows us to systematically explore different digit placements and backtrack when a placement violates the Sudoku rules. The algorithm tries different digits for each empty cell, recursively filling in the grid until a solution is found or all possibilities have been exhausted.

### Creating the front-end of the website
#### Rendering Sudoku using HTML tables
A Sudoku board consists of a 9x9 grid. I'm sure there are multiple different ways to render a 9x9 grids in HTML, but I surmised that using HTML tables was a sufficient and organized way of rendering the Sudoku board.

I made a function in JavaScript to render the board. The board `<table>` would consist of rows `<tr>`, and `<td>` tags would serve as the columns. In the function, I also made each `<td>` have a child `<input>` element so the user would be able to input their own clues if they wish.

Using CSS, I styled the `<td>` and `<input>` to have a fixed width of 40px, as well as style the borders so that they're thicker in between subgrids.

#### Styling using PicoCSS and flexbox-grid
To make the site look a bit prettier, and not the bland black-and-white of css-less HTML, I used a minimal CSS framework called [Pico CSS](https://picocss.com/).

I wanted to layout the site so that info and buttons would be on the left, and the actual board would be to the right, so I used a minimal flexbox framework called [Flexbox Grid](https://flexboxgrid.com/) for that. If the viewport gets too small, i.e on mobile devices, the layout would collapse so that the info & buttons would be on top, while the board would be on the bottom.

### Implementing Backtracking in main.js

I chose to implement backtracking using a programming technique known as recursion. Here's a high-level overview of how I implemented the backtracking algorithm for Sudoku Solver JS:

1. **Find an empty cell:** Start by searching for an empty cell in the Sudoku grid.

2. **Try different digits:** For each empty cell, try placing each digit from 1 to 9.

3. **Check constraints:** Before placing a digit, check if it satisfies the Sudoku rules (no repetition in the same row, column, or 3x3 subgrid).

4. **Recursively solve:** If a digit satisfies the constraints, recursively solve the rest of the puzzle with the updated grid.

5. **Backtrack:** If no digit satisfies the constraints, backtrack to the previous cell and try a different digit.

6. **Repeat:** Continue this process until the entire grid is filled or all possibilities have been exhausted.

### Generating random boards using Dosoku API
Now that I had a working backtracking algorithm, I needed a way to generate boards randomly, so that you could see the algorithm in action in different boards. (You could use the algorithm to solve an empty board, but it would always return the same solution; where's the fun in that!?)

I found a simple API called [Dosoku](https://sudoku-api.vercel.app/) which saved me time from coding the actual randomizer.

If I chose not to implement this API, I would have to code a `generateBoard()` function that would fill the first row with random digits 1-9, solve that board using my `solveBoard()` function, then empty random cells to achieve a "believeable" random effect.

