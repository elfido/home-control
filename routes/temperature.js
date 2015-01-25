var Temperature = {
	getTemperature: function(req, res){
		var temp = (typeof this.temperature!="undefined") ? this.temperature : 0;
		res.send({temperature: Math.floor(temp)});
	},
	setTemperature: function(req, res){
		console.log("Receiving data");
		console.dir(req.params);
		this.temperature = req.params.temperature;
		res.send({});
	}
}

module.exports = Temperature;