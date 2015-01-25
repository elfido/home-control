var restClient = require('node-rest-client').Client,
	client = new restClient();

var Currency = {
	getPesoExchange: function(req, res){
		var service = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDEUR%22%2C%20%22USDMXN%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
		var request = client.get(service, function(data, response){
			res.send(data);
	    });
	    
	    request.on('error', function(error){
	      res.send(error);
	      console.log('Error updating temperature')
	    });
	}
}

module.exports = Currency;