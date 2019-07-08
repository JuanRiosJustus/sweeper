const grid = [];
let isRunning = false;
let gameOver = false;
let shouldUpdate = false;
const cellSpacing = 30;
const cellSize = APPLICATION_WIDTH * ( 2.0 / 100.0 );


function setup() {
    createCanvas(APPLICATION_WIDTH, APPLICATION_HEIGHT);
    frameRate(APPLICATION_FRAMERATE);

    // continue making new columns until we hit the right edge of the window
    for (let x = 0; (x * cellSpacing) < APPLICATION_WIDTH - cellSize; x++) {
        let row = [];
        // continue making new rows until we hit the bottom edge of the window
        for (let y = 0; (y * cellSpacing) < APPLICATION_HEIGHT - cellSize; y++) {

            let xCoord = (x * cellSpacing) + 7;
            let yCoord = (y * cellSpacing) + 5;
            let c = new Cell(xCoord, yCoord, cellSize, cellSize, 200, x, y);
            row.push(c);
        }
        grid.push(row);
    }
    initView();
    checkountSurroundingNodes();
}

function initView() {
    background(120, 120, 220);
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let cell = grid[x][y];
            fill(color(200, 200, 255));
            rect(cell.x, cell.y, cell.width, cell.height);
            if (cell.view) {
                if (cell.isBomb) {
                    fill(color(200, 200, 255));
                    rect(cell.x, cell.y, cell.width, cell.height);
                    ellipse(cell.x + 12, cell.y + 13, cell.width, cell.height);
                } else {
                    textSize(22);
                    fill(color(225, 225, 255));
                    rect(cell.x, cell.y, cell.width, cell.height);
                    fill(color(0, 0, 0));
                    text(cell.neighbors, cell.x + 5, cell.y + 20);
                }
            }
        }
    }
}

function checkountSurroundingNodes() {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) { 
            // check the surrounding nodes if theyre bombs
            let amt = 0;
            for (let x = col - 1; x <= col + 1; x++) {
                for (let y = row - 1; y <= row + 1; y++) {
                    if (x < 0 || x > grid.length - 1) { continue; }
                    if (y < 0 || y > grid[x].length - 1) { continue; }
                    if (x == col && y == row) { continue; }
                    if (grid[x][y].isBomb) { amt++; }
                }
            } 
            grid[col][row].setNeighbors(amt);
        }
    }
}

function findNode(x, y) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            let c = grid[col][row];
            if (x >= c.x && x <= c.x + c.width && y >= c.y && y <= c.y + c.height) {
                return c;
            }
        }
    }
    return null;
}

// run loop
function draw() {
    if (!shouldUpdate) { return; }
    background(120, 120, 220);
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            let cell = grid[x][y];
            fill(color(200, 200, 255));
            rect(cell.x, cell.y, cell.width, cell.height);
            if (cell.view) {
                if (cell.isBomb) {
                    fill(color(200, 200, 255));
                    rect(cell.x, cell.y, cell.width, cell.height);
                    ellipse(cell.x + 12, cell.y + 13, cell.width, cell.height);
                } else {
                    textSize(22);
                    fill(color(225, 225, 255));
                    rect(cell.x, cell.y, cell.width, cell.height);
                    fill(color(0, 0, 0));
                    text(cell.neighbors, cell.x + 5, cell.y + 20);
                }
            }
        }
    }
    shouldUpdate = false;
}

function freeviews(col, row) {
    for (let x = col - 2; x <= col + 2; x++) {
        for (let y = row - 2; y <= row + 2; y++) {
            if (x >= 0 || x < grid.length) { continue; }
            if (y >= 0 || y < grid[x].length) { continue; }
            if (x == col && y == row) { continue; }
            if (grid[x][y].isBomb) { continue; }
            grid[x][y].view = true;
            let c = grid[x][y];
            console.log('[' + c.gridX + ',' + c.gridY + '] was set to view' );
        }
    } 
}


function mouseClicked(event) {
    if (!isRunning && !gameOver) {
        let node = findNode(event.x, event.y);
        if (!node) { return; }
        node.view = true;
        node.isBomb = false;
        freeviews(node.gridX, node.gridY);
        isRunning = true;
        shouldUpdate = true;
        return;
    }

    if (isRunning && !gameOver) {
        let node = findNode(event.x, event.y);
        if (!node) { return; }
        node.view = true;
        if (node.isBomb) {
            gameOver = true;
        }
        shouldUpdate = true;
    }
}