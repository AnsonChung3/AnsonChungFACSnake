const GRID_SIZE = 20;
const GRID_COUNT = 20;

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
gameCanvas.width = GRID_SIZE * GRID_COUNT;
gameCanvas.height = GRID_SIZE * GRID_COUNT;

ctx.fillStyle = '#da5151ff';
// ctx.fillRect(0, 0, 50, gameCanvas.height);

// food generation
let food = [{}]

function generateFood() {
    food[0]['x'] = Math.floor(Math.random() * GRID_COUNT);
    food[0]['y'] = Math.floor(Math.random() * GRID_COUNT);
}

function drawFood() {
    ctx.fillStyle = '#DB826E';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function testAutoFood() {
    setInterval(() => {
        generateFood();
        drawOnCanvas(1, food);
    }, 2000);
}


function drawOnCanvas(o14n, c9s) {
    // o14n => abbreviation for "object being drawn"; it should be a number; 1 for food, 2 for snake
    // c9s => coordinates, it should be an array of {x: , y: }
    fillColour = o14n === 1 ? '#DB826E' : '#da5151ff';
    c9s.forEach(coord => {
        ctx.fillStyle = fillColour;
        ctx.fillRect(coord.x * GRID_SIZE, coord.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
}
    

document.addEventListener('DOMContentLoaded', () => {
    testAutoFood();
});