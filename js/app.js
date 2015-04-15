var EMPTY = 0,
    FILLED = 1;

function GameController(size) {
    var self = this;
    this.size = size;

    this.storage = new LocalStorageManager();

    this.currentLevel = parseInt(this.storage.getMaxLevel());  // текущий уровень
    this.maxLevel = this.storage.getMaxLevel();      // максимальный достигнутый уровень

    this.field = new GameField(this.size, this.currentLevel);
    this.actuator = new HTMLActuator();
    this.timer = new Interval(function(time) {
        self.actuator.setTime(time);
    }, 1000);



};

GameController.prototype.cellClicked = function(x, y) {
    this.field.changeOnClick(x, y);
    var gameOver = this.field.isGameOver();

    if(gameOver) game.timer.stop();
    else {
        if(!game.timer.isRunning()) {
            game.timer.start();
        }
    }

    this.actuator.setTurns(this.field.turns.length);
    this.actuator.showGameOverScreen(gameOver, this.currentLevel);
};

GameController.prototype.startNextLevel = function() {
    this.currentLevel +=1;
    this.startLevel();
};

GameController.prototype.startLevel = function(level) {
    this.currentLevel = level ? parseInt(level) : this.currentLevel;
    if(this.currentLevel > this.maxLevel) {
        this.maxLevel = this.currentLevel;
        this.storage.setMaxLevel(this.maxLevel);
    }
    this.restartGame();
};

GameController.prototype.restartGame = function() {
    this.timer.stop();
    this.field.initMap(this.currentLevel);
    this.actuator.setTime(0);
    this.actuator.setTurns(0);
    this.actuator.setLevel(this.currentLevel, this.maxLevel);
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