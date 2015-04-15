$(document).ready(function() {
    game = new GameController(5);
    game.newGame();
});

$(document).on("click", ".cell", function() {
    var x = $(this).attr("data-x");
    var y = $(this).attr("data-y");
    game.cellClicked(x, y);

    if(game.timer.isRunning()) {

    } else {
        game.timer.start();
    }
});

$(document).on("click", ".restart-button", function() {
    game.newGame();
});