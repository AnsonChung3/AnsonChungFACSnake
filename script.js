const GRID_SIZE = 20;
const GRID_COUNT = 20;

const gameCanvas = document.getElementById('gamegameCanvas');
const ctx = gameCanvas.getContext('2d');
gameCanvas.width = GRID_SIZE * GRID_COUNT;
gameCanvas.height = GRID_SIZE * GRID_COUNT;

ctx.fillStyle = '#da5151ff';
ctx.fillRect(0, 0, 50, gameCanvas.height);