function HTMLActuator() {
    this.cache = {
        time: $(".header .time"),
        turns: $(".header .turnsNumber")
    };
};

HTMLActuator.prototype.setTime = function(seconds) {
    var time = seconds.toString().toHHMMSS();
    this.cache.time.html(time);
};

HTMLActuator.prototype.setTurns = function(turns) {
    this.cache.turns.html(turns);
};

HTMLActuator.prototype.showGameOverScreen = function(gameOver) {
    $(".gameOver").toggle(gameOver);
};