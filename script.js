// Initializes the application
window.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  const blockContainer = document.getElementById('blocks');
  const blockSize = 49;
  const { numBlocks, numCols } = calculateGridDimensions(blockSize);

  createBlocks(blockContainer, numBlocks, numCols);
}

// Calculates and returns the grid dimensions based on the screen size and block size
function calculateGridDimensions(blockSize) {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const numCols = Math.ceil(screenWidth / blockSize);
  const numRows = Math.ceil(screenHeight / blockSize);
  const numBlocks = numCols * numRows;

  return { numBlocks, numCols };
}

// Creates blocks and appends them to the container
function createBlocks(container, numBlocks, numCols) {
  for (let i = 0; i < numBlocks; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.dataset.index = i;
    block.addEventListener('mousemove', () =>
      highlightRandomNeighbors(block, numBlocks, numCols)
    );
    container.appendChild(block);
  }
}

// Highlights a block and a random neighbor
function highlightRandomNeighbors(block, numBlocks, numCols) {
  const index = parseInt(block.dataset.index);
  const neighbors = calculateNeighbors(index, numBlocks, numCols);

  highlightBlock(block);

  const randomNeighborIndex =
    neighbors[Math.floor(Math.random() * neighbors.length)];
  if (randomNeighborIndex) {
    highlightBlock(randomNeighborIndex);
  }
}

// Calculates valid neighbor indices for a given block index
function calculateNeighbors(index, numBlocks, numCols) {
  return [
    index - 1,
    index + 1,
    index - numCols,
    index + numCols,
    index - numCols - 1,
    index - numCols + 1,
    index + numCols - 1,
    index + numCols + 1,
  ].filter(
    (i) =>
      i >= 0 &&
      i < numBlocks &&
      Math.abs((i % numCols) - (index % numCols)) <= 1
  );
}

// Highlights a block temporarily
function highlightBlock(block) {
  block.classList.add('highlight');
  setTimeout(() => block.classList.remove('highlight'), 500);
}

// Shuffles an array and returns it
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
