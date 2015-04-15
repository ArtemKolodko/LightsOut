String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
};

function Interval(fn, time) {
    var timer = false;
    var whenStarts = null;
    this.start = function () {
        if (!this.isRunning()) {
            whenStarts = new Date();
            timer = setInterval(function() {
                var secs = Math.round((new Date() - whenStarts) / 1000);
                fn(secs);
            }, time);
        }
    };
    this.stop = function () {
        clearInterval(timer);
        timer = false;
    };
    this.isRunning = function () {
        return timer !== false;
    };
};