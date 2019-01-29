const http = require('http');
let Router = require('./router');

// const hostname = '127.0.0.1';
// const port = 3003;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n')
// });

// server.listen(port, () => {
//     console.log(`Server running at http://:${port}/`);
// });


function createApplication() {
    return {
        _router: new Router(),
        // get: function (path, fn) {
        //     return this._router.get(path, fn);
        // },
        listen: function (port, cb) {
            // let mythis = this;
            let server = http.createServer((req, res) => {
                // if (!res.send) {
                //     res.send = function (body) {
                //         res.writeHead(200, {
                //             'Content-Type': 'text/plain'
                //         });
                //         res.end(body);
                //     };
                // }
                // this._router.handle(req, res);
                this.handle(req, res);
            });
            return server.listen.apply(server, arguments);
        },
        handle: function (req, res) {
            if (!res.send) {
                res.send = function (body) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(body);
                };
            }

            let done = function finalhandler(err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                if (err) {
                    res.end('404: ' + err)
                } else {
                    let msg = 'cannot' + req.method + ' ' + req.url;
                    res.end(msg);
                }
            }

            this._router.handle(req, res, done);
        }
    }
}

http.METHODS.forEach(function (method) {
    method = method.toLowerCase();
    createApplication().prototype[method] = function (path, fn) {
        return this._router[method].apply(this._router, arguments);
    }
});

module.exports = createApplication;