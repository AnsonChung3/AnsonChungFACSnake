const GRID_SIZE = 20;
const GRID_COUNT = 20;

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
gameCanvas.width = GRID_SIZE * GRID_COUNT;
gameCanvas.height = GRID_SIZE * GRID_COUNT;

ctx.fillStyle = '#da5151ff';
ctx.fillRect(0, 0, 50, gameCanvas.height);

// food generation
let food = {}

function generateFood() {
    food.x = Math.floor(Math.random() * GRID_COUNT);
    food.y = Math.floor(Math.random() * GRID_COUNT);
}

function drawFood() {
    ctx.fillStyle = '#DB826E';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function testAutoFood() {
    setInterval(() => {
        generateFood();
        drawFood();
    }, 2000);
}

// document.addEventListener('DOMContentLoaded', () => {
//     testAutoFood();
// });