function GameField(size) {
    this.size = size;
    this.map = [];
    this.turns = [];

    this.cache = {
        wrapper: $(".gameField")
    };
};

GameField.prototype.initMap = function() {
    var filledNumber = Math.round(Math.random()*5 +3);
    var filledCells = [];

    for(var i=0; i < this.size; i++) {
        this.map[i] = [];
        for(var j=0; j < this.size; j++) {
            this.map[i][j] = EMPTY;
        }
    }

    while(filledNumber > 0) {
        this.map[Math.floor((Math.random() * 5))][Math.floor((Math.random() * 5))] = FILLED;
        filledNumber--;
    }

    this.turns = [];
    this.drawBoard();
};

GameField.prototype.forEachCell = function(callback) {
    var self = this;
    this.map.forEach(function(line, lineIndex) {
        line.forEach(function(cell, cellIndex) {
            if(callback) callback(lineIndex, cellIndex, self.map[lineIndex][cellIndex]);
        });
    })
};

GameField.prototype.findNeighborCells = function(x, y) {
    var neighbors = [];
    neighbors.push({x: x, y: y}); // push same dot
    this.forEachCell(function(nx, ny, nvalue) {
        if( (nx == x && Math.abs(ny - y) == 1) || (ny == y && Math.abs(nx - x) == 1) ) {
            neighbors.push({x: nx, y: ny});
        }
    });
    return neighbors;
};

GameField.prototype.changeOnClick = function(x, y) {
    var self = this;

    if(this.isGameOver()) return;

    var neighbors = this.findNeighborCells(x, y);
    neighbors.forEach(function(ncell) {
        self.map[ncell.x][ncell.y]^=1;
    });
    this.turns.push({x: x, y: y});
    this.drawBoard();
};

GameField.prototype.isGameOver = function() {
    var gameOver = true;
    this.forEachCell(function(x, y, cell) {
        if(cell === FILLED) gameOver = false;
    });
    return gameOver;
};

GameField.prototype.drawBoard = function() {
    var self = this;
    this.cache.wrapper.empty();
    this.map.forEach(function(line, lineIndex) {
        self.cache.wrapper.append("<div class='row'>");
        line.forEach(function(cell, cellIndex) {
            var cellClass = self.map[lineIndex][cellIndex] == EMPTY ? "cell" : "cell cell_filled";
            self.cache.wrapper.append("<div class='"+cellClass+"' data-x="+lineIndex+" data-y="+cellIndex+"></div>")
        })
        self.cache.wrapper.append("</div>");
    })
};