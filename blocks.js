// All Block Blast pieces
// Each piece is represented as a 2D array where 1 = filled, 0 = empty

const BLOCKS = {
    // Single block
    SINGLE: {
        name: "Single",
        color: "#FF6B6B",
        shape: [[1]]
    },

    // Domino pieces
    DOMINO_H: {
        name: "Domino H",
        color: "#4ECDC4",
        shape: [[1, 1]]
    },
    DOMINO_V: {
        name: "Domino V",
        color: "#45B7D1",
        shape: [[1], [1]]
    },

    // Diagonal 2-block pieces
    DIAG2_TL_BR: {
        name: "Diagonal 2 ↘",
        color: "#F39C12",
        shape: [
            [1, 0],
            [0, 1]
        ]
    },
    DIAG2_TR_BL: {
        name: "Diagonal 2 ↙",
        color: "#E67E22",
        shape: [
            [0, 1],
            [1, 0]
        ]
    },

    // Triomino straight pieces
    TRIO_H: {
        name: "Trio H",
        color: "#96CEB4",
        shape: [[1, 1, 1]]
    },
    TRIO_V: {
        name: "Trio V",
        color: "#88D8B0",
        shape: [[1], [1], [1]]
    },

    // Diagonal 3-block pieces
    DIAG3_TL_BR: {
        name: "Diagonal 3 ↘",
        color: "#9B59B6",
        shape: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    },
    DIAG3_TR_BL: {
        name: "Diagonal 3 ↙",
        color: "#8E44AD",
        shape: [
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0]
        ]
    },

    // Triomino L-shapes
    TRIO_L1: {
        name: "Trio L1",
        color: "#FFEAA7",
        shape: [
            [1, 0],
            [1, 1]
        ]
    },
    TRIO_L2: {
        name: "Trio L2",
        color: "#FDCB6E",
        shape: [
            [1, 1],
            [1, 0]
        ]
    },
    TRIO_L3: {
        name: "Trio L3",
        color: "#F8B500",
        shape: [
            [0, 1],
            [1, 1]
        ]
    },
    TRIO_L4: {
        name: "Trio L4",
        color: "#FAB95B",
        shape: [
            [1, 1],
            [0, 1]
        ]
    },

    // Standard Tetris I-piece (4 blocks straight)
    I_H: {
        name: "I-piece H",
        color: "#74B9FF",
        shape: [[1, 1, 1, 1]]
    },
    I_V: {
        name: "I-piece V",
        color: "#0984E3",
        shape: [[1], [1], [1], [1]]
    },

    // 5-block straight pieces
    I5_H: {
        name: "I5-piece H",
        color: "#5DADE2",
        shape: [[1, 1, 1, 1, 1]]
    },
    I5_V: {
        name: "I5-piece V",
        color: "#3498DB",
        shape: [[1], [1], [1], [1], [1]]
    },

    // O-piece (2×2 square)
    O: {
        name: "O-piece",
        color: "#FD79A8",
        shape: [
            [1, 1],
            [1, 1]
        ]
    },

    // T-pieces (4 variations for rotations)
    T_UP: {
        name: "T-piece Up",
        color: "#A29BFE",
        shape: [
            [1, 1, 1],
            [0, 1, 0]
        ]
    },
    T_DOWN: {
        name: "T-piece Down",
        color: "#6C5CE7",
        shape: [
            [0, 1, 0],
            [1, 1, 1]
        ]
    },
    T_LEFT: {
        name: "T-piece Left",
        color: "#A29BFE",
        shape: [
            [1, 0],
            [1, 1],
            [1, 0]
        ]
    },
    T_RIGHT: {
        name: "T-piece Right",
        color: "#6C5CE7",
        shape: [
            [0, 1],
            [1, 1],
            [0, 1]
        ]
    },

    // S-piece (zigzag right)
    S_H: {
        name: "S-piece H",
        color: "#55EFC4",
        shape: [
            [0, 1, 1],
            [1, 1, 0]
        ]
    },
    S_V: {
        name: "S-piece V",
        color: "#00B894",
        shape: [
            [1, 0],
            [1, 1],
            [0, 1]
        ]
    },

    // Z-piece (zigzag left)
    Z_H: {
        name: "Z-piece H",
        color: "#FF7675",
        shape: [
            [1, 1, 0],
            [0, 1, 1]
        ]
    },
    Z_V: {
        name: "Z-piece V",
        color: "#D63031",
        shape: [
            [0, 1],
            [1, 1],
            [1, 0]
        ]
    },

    // L-pieces (L-shape facing right, 4 rotations)
    L_1: {
        name: "L-piece 1",
        color: "#FDA7DF",
        shape: [
            [1, 0],
            [1, 0],
            [1, 1]
        ]
    },
    L_2: {
        name: "L-piece 2",
        color: "#E84393",
        shape: [
            [1, 1, 1],
            [1, 0, 0]
        ]
    },
    L_3: {
        name: "L-piece 3",
        color: "#FDA7DF",
        shape: [
            [1, 1],
            [0, 1],
            [0, 1]
        ]
    },
    L_4: {
        name: "L-piece 4",
        color: "#E84393",
        shape: [
            [0, 0, 1],
            [1, 1, 1]
        ]
    },

    // J-pieces (L-shape facing left, 4 rotations)
    J_1: {
        name: "J-piece 1",
        color: "#A8E6CF",
        shape: [
            [0, 1],
            [0, 1],
            [1, 1]
        ]
    },
    J_2: {
        name: "J-piece 2",
        color: "#3DBE8D",
        shape: [
            [1, 0, 0],
            [1, 1, 1]
        ]
    },
    J_3: {
        name: "J-piece 3",
        color: "#A8E6CF",
        shape: [
            [1, 1],
            [1, 0],
            [1, 0]
        ]
    },
    J_4: {
        name: "J-piece 4",
        color: "#3DBE8D",
        shape: [
            [1, 1, 1],
            [0, 0, 1]
        ]
    },

    // Additional larger pieces
    RECT_2x3_H: {
        name: "Rectangle 2×3 H",
        color: "#FFB8D1",
        shape: [
            [1, 1, 1],
            [1, 1, 1]
        ]
    },
    RECT_2x3_V: {
        name: "Rectangle 2×3 V",
        color: "#FF85A1",
        shape: [
            [1, 1],
            [1, 1],
            [1, 1]
        ]
    },

    // 3×3 square
    SQUARE_3x3: {
        name: "Square 3×3",
        color: "#B8E986",
        shape: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    }
};

// Get all block keys for easy iteration
const BLOCK_KEYS = Object.keys(BLOCKS);

// Helper function to get block dimensions
function getBlockDimensions(shape) {
    const height = shape.length;
    const width = shape[0].length;
    return { width, height };
}

// Helper function to check if a piece can be placed at a position on the grid
function canPlacePiece(grid, piece, row, col) {
    const shape = piece.shape;
    const pieceHeight = shape.length;
    const pieceWidth = shape[0].length;

    // Check if piece goes out of bounds
    if (row + pieceHeight > 8 || col + pieceWidth > 8) {
        return false;
    }

    // Check if all positions are free
    for (let r = 0; r < pieceHeight; r++) {
        for (let c = 0; c < pieceWidth; c++) {
            if (shape[r][c] === 1 && grid[row + r][col + c] === 1) {
                return false;
            }
        }
    }

    return true;
}

// Helper function to place a piece on the grid
function placePiece(grid, piece, row, col) {
    const shape = piece.shape;
    const newGrid = grid.map(row => [...row]);

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[0].length; c++) {
            if (shape[r][c] === 1) {
                newGrid[row + r][col + c] = 1;
            }
        }
    }

    return newGrid;
}

// Helper function to count cleared lines and calculate score
function calculateScore(grid, placedPieces) {
    let score = 0;
    const allClearedRows = new Set();
    const allClearedCols = new Set();

    // Aggregate all cleared rows and columns from each placement
    for (const placement of placedPieces) {
        if (placement.clearedRows) {
            placement.clearedRows.forEach(row => allClearedRows.add(row));
        }
        if (placement.clearedCols) {
            placement.clearedCols.forEach(col => allClearedCols.add(col));
        }
    }

    // Calculate score based on cleared lines
    const totalClears = allClearedRows.size + allClearedCols.size;
    score += totalClears * 10;

    // Add points for each piece placed
    score += placedPieces.length * 5;

    return {
        score,
        clearedRows: Array.from(allClearedRows),
        clearedCols: Array.from(allClearedCols),
        totalClears: totalClears
    };
}

// Get all valid placements for a piece on the grid
function getValidPlacements(grid, piece) {
    const placements = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (canPlacePiece(grid, piece, row, col)) {
                placements.push({ row, col });
            }
        }
    }

    return placements;
}
