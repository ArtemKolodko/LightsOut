$(document).ready(function() {
    game = new GameController(5);
    game.restartGame();
});

$(document).on("click", ".cell", function() {
    var x = $(this).attr("data-x");
    var y = $(this).attr("data-y");
    game.cellClicked(x, y);
});

$(document).on("click", ".restart-button", function() {
    game.restartGame();
});

$(document).on("click", ".startNextLevel", function() {
    game.startNextLevel();
});

$(document).on("click", ".allLevels ul li:not(.disabled)", function() {
   game.startLevel($(this).attr("data-level"));
});