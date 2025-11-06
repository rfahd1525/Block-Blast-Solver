# Block Blast Solver

A web-based solver for the Block Blast puzzle game. Upload a screenshot or manually input your grid, select your pieces, and get the optimal solution.

## Features

- **Screenshot Upload**: Take a screenshot of your Block Blast game and the solver will automatically detect the grid
- **Manual Input**: Option to manually set up your grid
- **Smart Solving**: Uses depth-first search with backtracking to find the best possible placement
- **Visual Solution**: Step-by-step visualization showing exactly where to place each piece
- **Line Clearing**: Automatically handles row and column clearing just like the real game
- **Continue Feature**: Once you've placed your pieces, you can continue from the final state to plan your next moves

## How to Use

### Screenshot Mode
1. Take a screenshot of your Block Blast game
2. Upload it to the solver (drag & drop or browse)
3. The grid will be automatically detected (you can manually adjust any cells if needed)
4. Select your 3 pieces from the available pieces list
5. Click "Find Optimal Solution"

### Manual Mode
1. Click cells on the 8×8 grid to toggle them filled/empty
2. Select 1-3 pieces from the available pieces
3. Click "Find Optimal Solution"

The solver will show you the best placement order with the highest score, including how many lines will be cleared.

## How It Works

The solver uses depth-first search with backtracking to try all possible permutations and placements of your selected pieces. It's guaranteed to find the optimal solution by exploring every valid combination and choosing the one with the highest score.

The grid detection uses edge detection and pattern recognition to automatically identify the game board from screenshots.

## Running Locally

Open `index.html` in your browser. No build process or dependencies needed.

## Pieces Supported

All standard Block Blast pieces are supported:
- Single blocks
- Dominoes (horizontal and vertical)
- Diagonal pieces (2 and 3 blocks)
- Triominoes (straight and L-shapes)
- Tetrominoes (I, O, T, S, Z, L, J pieces)
- 5-block straight pieces
- Rectangles and squares (2×3, 3×3)


## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
