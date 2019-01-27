let Layer = require('./layer');

let Route = function (path) {
    this.path = path;
    this.stack = [];
    this.methods = {};
}

Route.prototype._handles_method = function (method) {
    let name = method.toLowerCase();
    return Boolean(this.methods[name]);
}

Route.prototype.get = function (fn) {
    let layer = new Layer('/', fn);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);
    return this;
}

Route.prototype.dispatch = function (req, res) {
    method = req.method.toLowerCase();
    for (let i = 0, len = this.stack.length; i < len; i++) {
        if (method === this.stack[i].method) {
            return this.stack[i].useHandle(req, res);
        }
    }
}

module.exports = Route;