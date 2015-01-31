var Temperature = {
	setBoardController: function(boardController){
		Temperature.board = boardController;
	},
	getTemperature: function(req, res){
		var temp = Temperature.board.getTemperature();
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