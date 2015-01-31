var express = require('express'),
	swig = require('swig'),
	config_package = require("./package.json"),
	morgan = require('morgan'), //logger
	bodyParser = require('body-parser'),
	temperature = require('./routes/temperature'),
	relay = require('./routes/relay')
	currency = require('./routes/currency'),
	boardController = require('./jf/boardController'),
	app = express(),
	configuration = {
		server: {
			port: 3000
		}
	};

var views = [
		{path: "/", html: "index"}
	];

var homeCenter = {
	initAPI: function(){
		//start routes here
		var api = "/fido/api";
		app.get(api+'/temperature', temperature.getTemperature);

		app.put(api+'/outlet/:outletId', relay.swap);

		app.get(api+'/exchange', currency.getPesoExchange);
	},
	initViews: function(){
		console.log("Starting UI");
		var _this = this;
		for (var i=0; i<views.length; i++){
			var view = views[i];
			app.get(view.path, function (req, res) {
				res.render(this.html, {} );
			}.bind(view));
		}
	},
	expressSetup: function(){
		morgan(':remote-addr :method :url');
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.engine('html', swig.renderFile);
		app.set('view engine', 'html');
		app.set('views', __dirname + '/views');
		app.set('view cache', false);
		swig.setDefaults({ cache: false });
		app.use(express.static(__dirname+'/public'));
	},
	initHome: function(){
		temperature.setBoardController(boardController);
		relay.setBoardController(boardController);
	},
	init: function(){
		this.expressSetup();
		this.initHome();
		this.initAPI();
		this.initViews();
		app.listen(configuration.server.port);
		console.log('Application started on port ' + configuration.server.port);
	}
};

homeCenter.init();