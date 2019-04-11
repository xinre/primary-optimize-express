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



const  Application = function(){
    this._router = new Router();
    return '153456'
}


Application.prototype.listen = function(port, cb) {
	var self = this;

	var server = http.createServer(function(req, res) {
		self.handle(req, res);
	});

	return server.listen.apply(server, arguments);
};


Application.prototype.handle = function(req, res) {
	if(!res.send) {
		res.send = function(body) {
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end(body);
		};
	}


	var done = function finalhandler(err) {
		res.writeHead(404, {
			'Content-Type': 'text/plain'
		});

		if(err) {
			res.end('404: ' + err);	
		} else {
			var msg = 'Cannot ' + req.method + ' ' + req.url;
			res.end(msg);	
		}
	};

	var router = this._router;
	router.handle(req, res, done);
};


http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    Application.prototype[method] = function(path, fn) {
    	this._router[method].apply(this._router, arguments);
    	return this;
    };
});

function createApplication() {
	var app = new Application();
	return app;
}


exports = module.exports = createApplication;