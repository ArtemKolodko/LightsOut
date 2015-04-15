function LocalStorageManager() {
    this.maxLevelKey     = "maxLevel";
    this.storage = window.localStorage;
}

// Best score getters/setters
LocalStorageManager.prototype.getMaxLevel = function () {
    return this.storage.getItem(this.maxLevelKey) || 0;
};

LocalStorageManager.prototype.setMaxLevel = function (level) {
    this.storage.setItem(this.maxLevelKey, level);
};