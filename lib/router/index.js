let layer = require('./layer.js');

let Router = function () {
    this.stack = [new layer('*', function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('404');
    })];
}

Router.prototype.get = function (path, fn) {
    this.stack.push(new layer(path, fn));
}

Router.prototype.handle = function (req, res) {
    for (let i = 1, len = this.stack.length; i < len; i++) {
        if (this.stack[i].match(req.url)) {
            return this.stack[i].useHandle(req, res);
        }
    }
    return this.stack[0].useHandle(req, res);
}

module.exports = Router;