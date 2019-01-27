let Layer = require('./layer');

let Route = function (path) {
    this.path = path;
    this.stack = [];
    this.method = {};
}

Route.protoyype._handles_method = function (method) {
    let name = method.toLowerCase();
    return Boolean(this.methods[name]);
}

Route.prototype.get = function (fn) {
    let layer = new Layer('/', fn);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);
}