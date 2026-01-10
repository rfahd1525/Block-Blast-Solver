// Main Application Logic

// Global state
let currentGrid = Array(8).fill(null).map(() => Array(8).fill(0));
let selectedPieces = [];
let currentSolution = null;
let currentStepIndex = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeGrid('game-grid');
    initializeGrid('game-grid-screenshot');
    initializePieceSelector();
    initializePieceSelectorForScreenshot();
    initializeButtons();
    initializeUpload();
});

// Tab switching
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const inputSections = document.querySelectorAll('.input-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active section
            inputSections.forEach(section => section.classList.remove('active'));
            document.getElementById(`${targetTab}-input`).classList.add('active');
        });
    });
}

// Initialize the 8x8 grid
function initializeGrid(gridId) {
    const gridElement = document.getElementById(gridId);
    gridElement.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener('click', function() {
                toggleCell(this, gridId);
            });

            gridElement.appendChild(cell);
        }
    }
}

// Toggle cell filled/empty state
function toggleCell(cellElement, gridId) {
    const row = parseInt(cellElement.dataset.row);
    const col = parseInt(cellElement.dataset.col);

    cellElement.classList.toggle('filled');
    currentGrid[row][col] = cellElement.classList.contains('filled') ? 1 : 0;
}

// Update grid display from grid array
function updateGridDisplay(gridId, grid) {
    const gridElement = document.getElementById(gridId);
    const cells = gridElement.querySelectorAll('.grid-cell');

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (grid[row][col] === 1) {
            cell.classList.add('filled');
        } else {
            cell.classList.remove('filled');
        }
    });
}

// Clear grid
function clearGrid(gridId) {
    currentGrid = Array(8).fill(null).map(() => Array(8).fill(0));
    updateGridDisplay(gridId, currentGrid);
}

// Initialize piece selector
function initializePieceSelector() {
    const piecesContainer = document.getElementById('all-pieces');
    piecesContainer.innerHTML = '';

    BLOCK_KEYS.forEach(key => {
        const block = BLOCKS[key];
        const pieceContainer = createPieceElement(key, block);
        piecesContainer.appendChild(pieceContainer);
    });
}

// Initialize piece selector for screenshot mode
function initializePieceSelectorForScreenshot() {
    const piecesContainer = document.getElementById('all-pieces-screenshot');
    piecesContainer.innerHTML = '';

    BLOCK_KEYS.forEach(key => {
        const block = BLOCKS[key];
        const pieceContainer = createPieceElement(key, block);
        piecesContainer.appendChild(pieceContainer);
    });
}

// Create a piece element for selection
function createPieceElement(key, block) {
    const container = document.createElement('div');
    container.className = 'piece-container';
    container.dataset.pieceKey = key;

    // Piece name
    const name = document.createElement('div');
    name.className = 'piece-name';
    name.textContent = block.name;
    container.appendChild(name);

    // Piece preview
    const preview = createPiecePreview(block);
    container.appendChild(preview);

    // Click handler
    container.addEventListener('click', function() {
        togglePieceSelection(key, block, this);
    });

    return container;
}

// Create piece preview grid
function createPiecePreview(block) {
    const preview = document.createElement('div');
    preview.className = 'piece-preview';

    const shape = block.shape;
    const height = shape.length;
    const width = shape[0].length;

    preview.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    preview.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const cell = document.createElement('div');
            cell.className = 'piece-preview-cell';

            if (shape[r][c] === 1) {
                cell.classList.add('filled');
                cell.style.backgroundColor = block.color;
            }

            preview.appendChild(cell);
        }
    }

    return preview;
}

// Toggle piece selection
function togglePieceSelection(key, block, containerElement) {
    const pieceData = { key, ...block };

    // Allow selecting up to 3 pieces (duplicates allowed)
    if (selectedPieces.length < 3) {
        selectedPieces.push(pieceData);
        updateSelectedPiecesDisplay();
    } else {
        alert('You can only select 3 pieces. Click on a selected piece to remove it.');
    }
}

// Update the selected pieces display
function updateSelectedPiecesDisplay() {
    const containers = [
        document.getElementById('selected-pieces'),
        document.getElementById('selected-pieces-screenshot')
    ];

    containers.forEach(container => {
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < 3; i++) {
            if (i < selectedPieces.length) {
                const piece = selectedPieces[i];
                const slot = document.createElement('div');
                slot.className = 'selected-piece-slot';
                slot.style.cursor = 'pointer';
                slot.title = 'Click to remove';

                // Add click handler to remove this specific piece
                slot.addEventListener('click', () => {
                    selectedPieces.splice(i, 1);
                    updateSelectedPiecesDisplay();
                });

                const name = document.createElement('div');
                name.className = 'piece-name';
                name.textContent = piece.name;
                slot.appendChild(name);

                const preview = createPiecePreview(piece);
                slot.appendChild(preview);

                container.appendChild(slot);
            } else {
                const emptySlot = document.createElement('div');
                emptySlot.className = 'empty-slot';
                emptySlot.textContent = `Slot ${i + 1}`;
                container.appendChild(emptySlot);
            }
        }
    });
}

// Initialize buttons
function initializeButtons() {
    // Clear grid buttons
    document.getElementById('clear-grid').addEventListener('click', () => {
        clearGrid('game-grid');
    });

    document.getElementById('clear-grid-screenshot').addEventListener('click', () => {
        clearGrid('game-grid-screenshot');
    });

    // Clear pieces buttons
    document.getElementById('clear-pieces').addEventListener('click', () => {
        clearPiecesSelection();
    });

    document.getElementById('clear-pieces-screenshot').addEventListener('click', () => {
        clearPiecesSelection();
    });

    // Solve buttons
    document.getElementById('solve-button').addEventListener('click', () => {
        solvePuzzleHandler();
    });

    document.getElementById('solve-button-screenshot').addEventListener('click', () => {
        solvePuzzleHandler();
    });

    // Solution navigation
    document.getElementById('close-solution').addEventListener('click', () => {
        closeSolution();
    });

    document.getElementById('prev-step').addEventListener('click', () => {
        navigateStep(-1);
    });

    document.getElementById('next-step').addEventListener('click', () => {
        navigateStep(1);
    });

    // Continue from final state
    document.getElementById('continue-button').addEventListener('click', () => {
        continueFromFinalState();
    });
}

// Clear pieces selection
function clearPiecesSelection() {
    selectedPieces = [];

    // Remove selected class from all pieces
    document.querySelectorAll('.piece-container').forEach(container => {
        container.classList.remove('selected');
    });

    updateSelectedPiecesDisplay();
}

// Solve puzzle handler
function solvePuzzleHandler() {
    // Validate input
    if (selectedPieces.length === 0) {
        alert('Please select at least 1 piece.');
        return;
    }

    // Show loading state
    const solveButton = event.target.closest('button');
    const originalText = solveButton.innerHTML;
    solveButton.innerHTML = '<span class="icon">⏳</span> Solving...';
    solveButton.disabled = true;

    // Run solver in a timeout to allow UI to update
    setTimeout(() => {
        try {
            const result = solvePuzzle(currentGrid, selectedPieces);

            solveButton.innerHTML = originalText;
            solveButton.disabled = false;

            if (result.success) {
                currentSolution = result.solution;
                currentStepIndex = 0;
                displaySolution(result);
            } else {
                alert(result.message || 'No solution found. Try different pieces or grid configuration.');
            }
        } catch (error) {
            console.error('Solver error:', error);
            solveButton.innerHTML = originalText;
            solveButton.disabled = false;
            alert('An error occurred while solving. Please check your input and try again.');
        }
    }, 100);
}

// Display the solution
function displaySolution(result) {
    const solutionSection = document.getElementById('solution-section');
    const resultDiv = document.getElementById('solution-result');
    const stepsDiv = document.getElementById('solution-steps');

    // Show solution section
    solutionSection.classList.remove('hidden');

    // Display result summary
    const { solution, score } = result;
    const { scoreData, placements } = solution;

    resultDiv.className = 'solution-result';
    resultDiv.innerHTML = `
        <h3>Solution Found</h3>
        <p><strong>Total Score:</strong> ${scoreData.score}</p>
        <p><strong>Lines Cleared:</strong> ${scoreData.totalClears} (${scoreData.clearedRows.length} rows, ${scoreData.clearedCols.length} columns)</p>
        <p><strong>Pieces Placed:</strong> ${placements.length}</p>
    `;

    // Display steps
    stepsDiv.innerHTML = '';
    placements.forEach((placement, index) => {
        const step = createStepElement(placement, index);
        stepsDiv.appendChild(step);
    });

    // Update step counter
    updateStepCounter();

    // Highlight first step
    highlightStep(0);

    // Scroll to solution
    solutionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create a step element
function createStepElement(placement, index) {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'solution-step';
    stepDiv.dataset.stepIndex = index;

    // Step header
    const header = document.createElement('div');
    header.className = 'step-header';

    const title = document.createElement('div');
    title.className = 'step-title';
    title.textContent = `Step ${index + 1}: Place ${placement.piece.name}`;

    const info = document.createElement('div');
    info.className = 'step-info';

    let infoText = `Position: Row ${placement.row + 1}, Column ${placement.col + 1}`;

    // Add cleared lines info
    const totalClears = (placement.clearedRows?.length || 0) + (placement.clearedCols?.length || 0);
    if (totalClears > 0) {
        infoText += ` | Cleared ${totalClears} line${totalClears > 1 ? 's' : ''}`;
        if (placement.clearedRows?.length > 0) {
            infoText += ` (${placement.clearedRows.length} row${placement.clearedRows.length > 1 ? 's' : ''})`;
        }
        if (placement.clearedCols?.length > 0) {
            infoText += ` (${placement.clearedCols.length} col${placement.clearedCols.length > 1 ? 's' : ''})`;
        }
    }

    info.textContent = infoText;

    header.appendChild(title);
    header.appendChild(info);
    stepDiv.appendChild(header);

    // Step grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'step-grid';

    const grid = createStepGrid(placement);
    gridContainer.appendChild(grid);
    stepDiv.appendChild(gridContainer);

    return stepDiv;
}

// Create grid for a step
function createStepGrid(placement) {
    const gridElement = document.createElement('div');
    gridElement.className = 'game-grid';

    // Use gridBeforeClear to show the state right after placement, before line clearing
    const grid = placement.gridBeforeClear || placement.gridAfterPlacement;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';

            const isNewlyPlaced = isPartOfPlacement(row, col, placement);

            if (grid[row][col] === 1) {
                cell.classList.add('filled');

                // Make newly placed piece MUCH brighter and more visible
                if (isNewlyPlaced) {
                    cell.classList.add('placement');
                    // Use a brighter, highlighted version of the piece color
                    const brightColor = getBrighterColor(placement.piece.color);
                    cell.style.backgroundColor = brightColor;
                    cell.style.boxShadow = '0 0 10px ' + brightColor + ', inset 0 0 10px rgba(255,255,255,0.5)';
                    cell.style.border = '2px solid #FFD700';
                    cell.style.transform = 'scale(1.05)';
                    cell.style.zIndex = '10';
                }
            }

            gridElement.appendChild(cell);
        }
    }

    return gridElement;
}

// Helper function to get a brighter version of a color
function getBrighterColor(color) {
    // Convert hex to RGB, make it brighter, and return
    const hex = color.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    // Increase brightness by 30%
    r = Math.min(255, Math.floor(r * 1.3));
    g = Math.min(255, Math.floor(g * 1.3));
    b = Math.min(255, Math.floor(b * 1.3));

    return `rgb(${r}, ${g}, ${b})`;
}

// Check if cell is part of the current placement
function isPartOfPlacement(row, col, placement) {
    const shape = placement.piece.shape;
    const startRow = placement.row;
    const startCol = placement.col;

    const relativeRow = row - startRow;
    const relativeCol = col - startCol;

    if (relativeRow >= 0 && relativeRow < shape.length &&
        relativeCol >= 0 && relativeCol < shape[0].length) {
        return shape[relativeRow][relativeCol] === 1;
    }

    return false;
}

// Navigate between steps
function navigateStep(direction) {
    if (!currentSolution) return;

    const newIndex = currentStepIndex + direction;
    const maxIndex = currentSolution.placements.length - 1;

    if (newIndex < 0 || newIndex > maxIndex) return;

    currentStepIndex = newIndex;
    highlightStep(currentStepIndex);
    updateStepCounter();
}

// Highlight a specific step
function highlightStep(index) {
    const steps = document.querySelectorAll('.solution-step');
    steps.forEach((step, i) => {
        if (i === index) {
            step.classList.add('active');
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            step.classList.remove('active');
        }
    });

    // Update button states
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');

    prevButton.disabled = index === 0;
    nextButton.disabled = index === currentSolution.placements.length - 1;
}

// Update step counter
function updateStepCounter() {
    if (!currentSolution) return;

    const counter = document.getElementById('step-counter');
    counter.textContent = `Step ${currentStepIndex + 1} of ${currentSolution.placements.length}`;
}

// Close solution
function closeSolution() {
    const solutionSection = document.getElementById('solution-section');
    solutionSection.classList.add('hidden');
    currentSolution = null;
    currentStepIndex = 0;
}

// Continue from final state - use the final grid as starting point for next solve
function continueFromFinalState() {
    if (!currentSolution || !currentSolution.finalGrid) {
        alert('No solution available to continue from.');
        return;
    }

    // Update the current grid with the final state
    currentGrid = currentSolution.finalGrid.map(row => [...row]);

    // Update the grid display
    updateGridDisplay('game-grid', currentGrid);

    // Clear the selected pieces so user can pick new ones
    clearPiecesSelection();

    // Close the solution
    closeSolution();

    // Switch to manual input tab
    document.querySelector('.tab-button[data-tab="manual"]').click();

    // Scroll to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show a message
    alert('Grid updated with the final state! Now select 3 new pieces and solve again.');
}

// Store current screenshot for reprocessing
let currentScreenshotImage = null;
let screenshotCanvas = null;
let screenshotCtx = null;
let detectedGridBounds = null;

// Initialize upload functionality
function initializeUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('screenshot-file');
    const browseButton = document.getElementById('browse-button');
    const previewContainer = document.getElementById('preview-container');
    screenshotCanvas = document.getElementById('screenshot-canvas');
    screenshotCtx = screenshotCanvas.getContext('2d');
    const removeButton = document.getElementById('remove-screenshot');
    const adjustmentSection = document.getElementById('screenshot-adjustment');
    const solveSection = document.getElementById('solve-screenshot-section');

    // Browse button
    browseButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    // Remove screenshot
    removeButton.addEventListener('click', () => {
        fileInput.value = '';
        currentScreenshotImage = null;
        uploadArea.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        adjustmentSection.classList.add('hidden');
        solveSection.classList.add('hidden');
    });

    // Handle file upload
    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                currentScreenshotImage = img;
                uploadArea.classList.add('hidden');
                previewContainer.classList.remove('hidden');

                // Draw on canvas
                drawScreenshot();

                // Auto-detect grid
                processScreenshot();

                adjustmentSection.classList.remove('hidden');
                solveSection.classList.remove('hidden');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Draw screenshot on canvas with overlays
function drawScreenshot() {
    if (!currentScreenshotImage || !screenshotCanvas) return;

    screenshotCanvas.width = currentScreenshotImage.width;
    screenshotCanvas.height = currentScreenshotImage.height;

    // Draw the image
    screenshotCtx.drawImage(currentScreenshotImage, 0, 0);

    // Draw detected grid bounds
    if (detectedGridBounds) {
        screenshotCtx.strokeStyle = '#00FF00';
        screenshotCtx.fillStyle = '#00FF00';
        screenshotCtx.lineWidth = 4;
        screenshotCtx.setLineDash([10, 5]);

        screenshotCtx.strokeRect(
            detectedGridBounds.x,
            detectedGridBounds.y,
            detectedGridBounds.width,
            detectedGridBounds.height
        );

        screenshotCtx.setLineDash([]);
        screenshotCtx.font = 'bold 24px Arial';
        screenshotCtx.fillText(
            'Detected Grid',
            detectedGridBounds.x + 10,
            detectedGridBounds.y + 30
        );

        const corners = [
            { x: detectedGridBounds.x, y: detectedGridBounds.y },
            { x: detectedGridBounds.x + detectedGridBounds.width, y: detectedGridBounds.y },
            { x: detectedGridBounds.x + detectedGridBounds.width, y: detectedGridBounds.y + detectedGridBounds.height },
            { x: detectedGridBounds.x, y: detectedGridBounds.y + detectedGridBounds.height }
        ];

        corners.forEach(corner => {
            screenshotCtx.beginPath();
            screenshotCtx.arc(corner.x, corner.y, 6, 0, Math.PI * 2);
            screenshotCtx.fill();
        });
    }
}


// Extract grid from image data (improved algorithm - used by manual corners mode)
function extractGridFromImageData(imageData, width, height) {
    const data = imageData.data;
    const grid = Array(8).fill(null).map(() => Array(8).fill(0));

    const cellWidth = width / 8;
    const cellHeight = height / 8;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            let totalBrightness = 0;
            let totalSaturation = 0;
            let sampleCount = 0;

            const startX = Math.floor(col * cellWidth + cellWidth * 0.2);
            const endX = Math.floor(col * cellWidth + cellWidth * 0.8);
            const startY = Math.floor(row * cellHeight + cellHeight * 0.2);
            const endY = Math.floor(row * cellHeight + cellHeight * 0.8);

            for (let y = startY; y < endY; y += 2) {
                for (let x = startX; x < endX; x += 2) {
                    const pixelIndex = (y * width + x) * 4;
                    const r = data[pixelIndex];
                    const g = data[pixelIndex + 1];
                    const b = data[pixelIndex + 2];

                    const brightness = (r + g + b) / 3;
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    const saturation = max === 0 ? 0 : (max - min) / max;

                    totalBrightness += brightness;
                    totalSaturation += saturation;
                    sampleCount++;
                }
            }

            const avgBrightness = totalBrightness / sampleCount;
            const avgSaturation = totalSaturation / sampleCount;

            const isFilled = avgBrightness > 120 || avgSaturation > 0.35;
            if (isFilled) {
                grid[row][col] = 1;
            }
        }
    }

    return grid;
}

// Process screenshot to detect grid and pieces (auto mode)
function processScreenshot() {
    try {
        if (!currentScreenshotImage) return;

        // Create a canvas to analyze the whole image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = currentScreenshotImage.width;
        canvas.height = currentScreenshotImage.height;
        ctx.drawImage(currentScreenshotImage, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Try to automatically find the grid boundaries
        const gridBounds = findGridBoundaries(imageData, canvas.width, canvas.height);

        if (gridBounds) {
            // Store for visualization
            detectedGridBounds = gridBounds;

            // Redraw with detection overlay
            drawScreenshot();

            // Extract grid region and normalize it like manual corners does
            const regionCanvas = document.createElement('canvas');
            const regionCtx = regionCanvas.getContext('2d');
            const normalizedSize = 400;

            regionCanvas.width = normalizedSize;
            regionCanvas.height = normalizedSize;

            // Draw the detected grid region, normalized to 400x400
            regionCtx.drawImage(
                currentScreenshotImage,
                gridBounds.x,
                gridBounds.y,
                gridBounds.width,
                gridBounds.height,
                0,
                0,
                normalizedSize,
                normalizedSize
            );

            // Extract grid from normalized image (same as manual corners)
            const normalizedImageData = regionCtx.getImageData(0, 0, normalizedSize, normalizedSize);
            const grid = extractGridFromImageData(normalizedImageData, normalizedSize, normalizedSize);

            // Update the grid
            currentGrid = grid;
            updateGridDisplay('game-grid-screenshot', currentGrid);

            drawScreenshot();
            alert('Grid detected! Check the green outline. If incorrect, manually adjust the cells. Now select your 3 pieces below.');
        } else {
            detectedGridBounds = null;
            drawScreenshot();
            alert('Could not auto-detect grid boundaries. Please manually click the cells to set up your grid.');
        }
    } catch (error) {
        detectedGridBounds = null;
        drawScreenshot();
        alert('Auto-detection failed. Please manually click the cells to set up your grid.');
    }
}













// Find grid boundaries using edge-based detection (looking for grid lines)
function findGridBoundaries(imageData, width, height) {
    const data = imageData.data;

    // Convert to grayscale and find edges
    const gray = new Uint8Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            gray[y * width + x] = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
        }
    }

    // Find vertical and horizontal line projections
    const verticalProjection = new Float32Array(width);
    const horizontalProjection = new Float32Array(height);

    // Calculate vertical projection (sum of edges in each column)
    for (let x = 1; x < width - 1; x++) {
        let edgeSum = 0;
        for (let y = 0; y < height; y++) {
            const idx = y * width + x;
            const gradient = Math.abs(gray[idx - 1] - gray[idx + 1]);
            edgeSum += gradient;
        }
        verticalProjection[x] = edgeSum;
    }

    // Calculate horizontal projection (sum of edges in each row)
    for (let y = 1; y < height - 1; y++) {
        let edgeSum = 0;
        for (let x = 0; x < width; x++) {
            const gradient = Math.abs(gray[(y - 1) * width + x] - gray[(y + 1) * width + x]);
            edgeSum += gradient;
        }
        horizontalProjection[y] = edgeSum;
    }

    // Find the densest region (most edges = grid area)
    const minSize = Math.floor(Math.min(width, height) * 0.25);
    const maxSize = Math.floor(Math.min(width, height) * 0.95);
    const step = Math.max(5, Math.floor(Math.min(width, height) * 0.01));

    let bestRegion = null;
    let bestScore = 0;

    for (let size = minSize; size <= maxSize; size += step) {
        for (let startY = 0; startY + size <= height; startY += step) {
            for (let startX = 0; startX + size <= width; startX += step) {
                // Must be roughly square
                const endX = startX + size;
                const endY = startY + size;

                // Calculate edge density in this region
                let vEdges = 0;
                let hEdges = 0;

                for (let x = startX; x < endX; x++) {
                    vEdges += verticalProjection[x] || 0;
                }

                for (let y = startY; y < endY; y++) {
                    hEdges += horizontalProjection[y] || 0;
                }

                const avgEdges = (vEdges + hEdges) / (2 * size);

                // Check for regular grid pattern by looking for periodic peaks
                const cellSize = size / 8;
                let gridScore = 0;

                // Check for 9 vertical lines (including borders)
                for (let i = 0; i <= 8; i++) {
                    const expectedX = Math.floor(startX + i * cellSize);
                    if (expectedX >= 0 && expectedX < width) {
                        // Check if there's a peak near this position
                        let maxNearby = 0;
                        for (let dx = -3; dx <= 3; dx++) {
                            const checkX = expectedX + dx;
                            if (checkX >= 0 && checkX < width) {
                                maxNearby = Math.max(maxNearby, verticalProjection[checkX]);
                            }
                        }
                        gridScore += maxNearby;
                    }
                }

                // Check for 9 horizontal lines (including borders)
                for (let i = 0; i <= 8; i++) {
                    const expectedY = Math.floor(startY + i * cellSize);
                    if (expectedY >= 0 && expectedY < height) {
                        let maxNearby = 0;
                        for (let dy = -3; dy <= 3; dy++) {
                            const checkY = expectedY + dy;
                            if (checkY >= 0 && checkY < height) {
                                maxNearby = Math.max(maxNearby, horizontalProjection[checkY]);
                            }
                        }
                        gridScore += maxNearby;
                    }
                }

                // Prefer centered regions
                const centerX = startX + size / 2;
                const centerY = startY + size / 2;
                const distFromCenter = Math.sqrt(
                    Math.pow(centerX - width / 2, 2) +
                    Math.pow(centerY - height / 2, 2)
                );
                const maxDist = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                const centerBonus = 1 - (distFromCenter / maxDist) * 0.2;

                const totalScore = avgEdges * gridScore * centerBonus;

                if (totalScore > bestScore) {
                    bestScore = totalScore;
                    bestRegion = {
                        x: startX,
                        y: startY,
                        width: size,
                        height: size,
                        score: totalScore,
                        edgeDensity: avgEdges,
                        gridScore: gridScore
                    };
                }
            }
        }
    }

    if (!bestRegion || bestScore === 0) {
        return null;
    }

    return {
        x: bestRegion.x,
        y: bestRegion.y,
        width: bestRegion.width,
        height: bestRegion.height
    };
}

