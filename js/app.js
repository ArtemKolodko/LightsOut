var EMPTY = 0,
    FILLED = 1;

function GameController(size) {
    var self = this;
    this.size = size;
    this.field = new GameField(this.size);
    this.actuator = new HTMLActuator();
    this.timer = new Interval(function(time) {
        self.actuator.setTime(time);
    }, 1000);
};

GameController.prototype.cellClicked = function(x, y) {
    this.field.changeOnClick(x, y);
    this.actuator.setTurns(this.field.turns.length);
    this.actuator.showGameOverScreen(this.field.isGameOver());
};

GameController.prototype.newGame = function() {
    this.timer.stop();
    this.field.initMap();
    this.actuator.setTime(0);
    this.actuator.setTurns(0);
    this.actuator.showGameOverScreen(this.field.isGameOver());
};

GameController.prototype.cheat = function(cheat) {
    var self = this;
    if(cheat == "win") {
        this.field.forEachCell(function(x, y, cell) {
            self.field.map[x][y] = EMPTY;
        })
        this.field.drawBoard();
    }

    this.actuator.showGameOverScreen(this.field.isGameOver());
};