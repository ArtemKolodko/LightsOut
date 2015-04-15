function GameField(size, level) {
    this.size = size;
    this.map = [];
    this.turns = [];

    this.currentLevel = levels[level];

    this.cache = {
        wrapper: $(".gameField")
    };
};

GameField.prototype.generateLevel = function(depth) {
    var x, y;

    this.clearMap();

    while(depth > 0) {
        x = Math.floor((Math.random() * 5));
        y = Math.floor((Math.random() * 5));
        console.log("generated point ", x, y);
        this.addPoint(x, y);
        depth--;
    }

    this.drawBoard();

    console.log(this.turns, JSON.stringify(this.turns));

};

GameField.prototype.clearMap = function() {
    this.turns = [];

    for(var i=0; i < this.size; i++) {
        this.map[i] = [];
        for(var j=0; j < this.size; j++) {
            this.map[i][j] = EMPTY;
        }
    }
};

GameField.prototype.initMap = function(level) {
    this.currentLevel = levels[level];
    this.clearMap();

    var turns = JSON.parse(this.currentLevel.map);

    console.log("-- field: load level", level, ", turns: ", turns);

    for(var i=0; i < turns.length; i++) {
        this.addPoint(turns[i].x, turns[i].y);
    }

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
    if(this.isGameOver()) return;
    this.addPoint(x, y);
    this.turns.push({x: x, y: y});
};

GameField.prototype.addPoint = function(x, y) {
    var self = this;
    var neighbors = this.findNeighborCells(x, y);
    neighbors.forEach(function(ncell) {
        self.map[ncell.x][ncell.y]^=1;
    });
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
            var cellClass = self.map[cellIndex][lineIndex] == EMPTY ? "cell" : "cell cell_filled";
            self.cache.wrapper.append("<div class='"+cellClass+"' data-x="+cellIndex+" data-y="+lineIndex+"></div>")
        })
        self.cache.wrapper.append("</div>");
    })
};