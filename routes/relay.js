var Relay = {
	states:{
		outletOn: false
	},
	setBoardController: function(boardController){
		Relay.board = boardController;
	},
	getCurrentState: function(req, res){
		res.send({state: Relay.states.outletOn});
	},
	swap: function(req, res){
		console.log("Switching relay state "+Relay.states.outletOn);
		if (!Relay.states.outletOn)
			Relay.board.setRelayState("on");
		else
			Relay.board.setRelayState("off");
		Relay.states.outletOn = !Relay.states.outletOn;
		res.send({state: Relay.states.outletOn});
	}
}

console.dir(Relay.states);

module.exports = Relay;