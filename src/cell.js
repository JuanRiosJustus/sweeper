class Cell {
    constructor(x, y, w, h, c, x2, y2) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = c;
        this.isBomb = ( Math.random() > .6 ? true : false );
        this.gridX = x2;
        this.gridY = y2;
        this.view = false;
    }

    setNeighbors(x) {
        this.neighbors = x;
    }
}