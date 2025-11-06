// Block Blast Solver Algorithm

class BlockBlastSolver {
    constructor(grid, pieces) {
        this.initialGrid = grid.map(row => [...row]);
        this.pieces = pieces; // Array of 3 pieces
        this.bestSolution = null;
        this.bestScore = -1;
    }

    // Main solving function
    solve() {
        console.log('Starting solver...');
        console.log('Initial grid:', this.initialGrid);
        console.log('Pieces to place:', this.pieces);

        // Try all permutations of pieces (different orders)
        const permutations = this.getPermutations(this.pieces);

        for (const piecesOrder of permutations) {
            this.solveDFS(this.initialGrid, piecesOrder, [], 0);
        }

        if (this.bestSolution) {
            console.log('Best solution found with score:', this.bestScore);
            return {
                success: true,
                solution: this.bestSolution,
                score: this.bestScore
            };
        } else {
            console.log('No solution found');
            return {
                success: false,
                message: 'No valid placement found for the given pieces'
            };
        }
    }

    // Depth-first search with backtracking
    solveDFS(currentGrid, remainingPieces, placedPieces, depth) {
        // Base case: all pieces placed successfully!
        if (remainingPieces.length === 0) {
            // Calculate score for this complete solution
            const scoreData = calculateScore(currentGrid, placedPieces);

            // Check if this is the best complete solution so far
            if (scoreData.score > this.bestScore) {
                this.bestScore = scoreData.score;
                this.bestSolution = {
                    placements: [...placedPieces],
                    finalGrid: currentGrid.map(row => [...row]),
                    scoreData: scoreData
                };
            }
            return;
        }

        // Try to place the next piece
        const currentPiece = remainingPieces[0];
        const restPieces = remainingPieces.slice(1);

        // Get all valid placements for this piece
        const validPlacements = getValidPlacements(currentGrid, currentPiece);

        // If no valid placement, stop this branch (but we may have a partial solution)
        if (validPlacements.length === 0) {
            return;
        }

        // Try each valid placement
        for (const placement of validPlacements) {
            // Place the piece
            const newGrid = placePiece(currentGrid, currentPiece, placement.row, placement.col);

            // Clear any complete lines and track what was cleared
            const clearResult = this.clearCompleteLinesWithTracking(newGrid);

            // Record this placement
            const newPlacement = {
                piece: currentPiece,
                row: placement.row,
                col: placement.col,
                gridBeforeClear: newGrid.map(row => [...row]),
                gridAfterPlacement: clearResult.grid.map(row => [...row]),
                clearedRows: clearResult.clearedRows,
                clearedCols: clearResult.clearedCols
            };

            // Recursively place remaining pieces
            this.solveDFS(
                clearResult.grid,
                restPieces,
                [...placedPieces, newPlacement],
                depth + 1
            );
        }
    }

    // Clear complete lines with tracking what was cleared
    clearCompleteLinesWithTracking(grid) {
        let newGrid = grid.map(row => [...row]);
        const clearedRows = [];
        const clearedCols = [];

        // First, detect which rows are complete (check original grid)
        for (let r = 0; r < 8; r++) {
            if (grid[r].every(cell => cell === 1)) {
                clearedRows.push(r);
            }
        }

        // Detect which columns are complete (check original grid)
        for (let c = 0; c < 8; c++) {
            let isComplete = true;
            for (let r = 0; r < 8; r++) {
                if (grid[r][c] === 0) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) {
                clearedCols.push(c);
            }
        }

        // Now clear all detected rows
        for (const r of clearedRows) {
            newGrid[r] = newGrid[r].map(() => 0);
        }

        // Clear all detected columns
        for (const c of clearedCols) {
            for (let r = 0; r < 8; r++) {
                newGrid[r][c] = 0;
            }
        }

        return {
            grid: newGrid,
            clearedRows: clearedRows,
            clearedCols: clearedCols
        };
    }

    // Clear complete lines (rows and columns)
    clearCompleteLines(grid) {
        let newGrid = grid.map(row => [...row]);
        const rowsToClear = [];
        const colsToClear = [];

        // Detect complete rows
        for (let r = 0; r < 8; r++) {
            if (grid[r].every(cell => cell === 1)) {
                rowsToClear.push(r);
            }
        }

        // Detect complete columns
        for (let c = 0; c < 8; c++) {
            let isComplete = true;
            for (let r = 0; r < 8; r++) {
                if (grid[r][c] === 0) {
                    isComplete = false;
                    break;
                }
            }
            if (isComplete) {
                colsToClear.push(c);
            }
        }

        // Clear detected rows
        for (const r of rowsToClear) {
            newGrid[r] = newGrid[r].map(() => 0);
        }

        // Clear detected columns
        for (const c of colsToClear) {
            for (let r = 0; r < 8; r++) {
                newGrid[r][c] = 0;
            }
        }

        return newGrid;
    }

    // Generate all permutations of an array
    getPermutations(array) {
        if (array.length === 0) return [[]];
        if (array.length === 1) return [array];

        const permutations = [];
        for (let i = 0; i < array.length; i++) {
            const current = array[i];
            const remaining = array.slice(0, i).concat(array.slice(i + 1));
            const remainingPermutations = this.getPermutations(remaining);

            for (const perm of remainingPermutations) {
                permutations.push([current, ...perm]);
            }
        }

        return permutations;
    }
}

// Main solve function
function solvePuzzle(grid, pieces) {
    const solver = new BlockBlastSolver(grid, pieces);
    return solver.solve();
}
