let Layer = require('./layer.js');
let Route = require('./route.js');

let Router = function () {
    this.stack = [new Layer('*', function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404');
    })];
}

Router.prototype.get = function (path, fn) {
    // this.stack.push(new layer(path, fn));
    let route = this.route(path);
    route.get(fn);
}

Router.prototype.handle = function (req, res) {
    let method = req.method;
    for (let i = 1, len = this.stack.length; i < len; i++) {
        if (this.stack[i].match(req.url) && this.stack[i].route && this.stack[i].route._handles_method(method)) {
            return this.stack[i].useHandle(req, res);
        }
    }
    return this.stack[0].useHandle(req, res);
}

Router.prototype.route = function route(path) {
    let route = new Route(path);
    let layer = new Layer(path, function (req, res) {
        route.dispatch(req, res)
    })
    layer.route = route;
    this.stack.push(layer);
    return route;
}

module.exports = Router;