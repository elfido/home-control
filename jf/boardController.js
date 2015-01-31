var jf = require("johnny-five"),
	board = new jf.Board(),
	relay = null,
	temperatureSensor = null,
	tempData = null;

board.on("ready", function(){
	relay = new jf.Relay(13);

	temperatureSensor = new jf.Temperature({
	    controller: "TMP36",
	    pin: "A0"
	  });

	  temperatureSensor.on("data", function(err, data) {
		//console.log(data.celsius + "°C", data.fahrenheit + "°F");
		if (JF.relayState != "off"){
			//Adjusting temperature if relay is on
			data.fahrenheit-=7;
		}
		tempData = data;
	  });
});

var JF = {
	setRelayState: function(state){
		if (state == "on"){
			this.relayState = "on";
			relay.off();
		} else{
			this.relayState = "off";
			relay.on();
		}
	},
	getTemperature: function(){
		console.log(this.relayState);
		var _temperature = (tempData === null) ? 0 : tempData.fahrenheit;
		return( _temperature );
	}
};

module.exports = JF;