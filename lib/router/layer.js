function layer(path, fn) {
    this.path = path;
    this.method = fn.name;
    this.handle = fn;
}

layer.prototype.match = function (path) {
    if (path === this.path) {
        return true;
    }
    return false;
}

layer.prototype.useHandle = function (req, res) {
    if (this.handle) {
        this.handle(req, res);
    }
}

module.exports = layer;