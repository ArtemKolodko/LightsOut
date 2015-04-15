function HTMLActuator() {
    this.cache = {
        time: $(".header .time"),
        turns: $(".header .turnsNumber"),
        level: $(".header .level .levelNumber"),
        allLevels: $(".header .level .allLevels ul li")
    };
};

HTMLActuator.prototype.setTime = function(seconds) {
    var time = seconds.toString().toHHMMSS();
    this.cache.time.html(time);
};

HTMLActuator.prototype.setTurns = function(turns) {
    this.cache.turns.html(turns);
};

HTMLActuator.prototype.setLevel = function(level, maxLevel) {
    this.cache.level.html(parseInt(level)+1);
    this.cache.allLevels.each(function(e){
        var itemLevel = parseInt($(this).attr("data-level"));
        if(itemLevel <= maxLevel) {
            $(this).removeClass("disabled");
        }
        $(this).toggleClass("current", level == itemLevel)
    });
};

HTMLActuator.prototype.showGameOverScreen = function(gameOver, currentLevel) {
    $(".gameOverComplete").toggle(gameOver && currentLevel == levels.length-1);
    $(".gameOver").toggle(gameOver && currentLevel != levels.length-1);
};