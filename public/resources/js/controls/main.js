//Global namespace
Fido = {};

var MainControl = can.Control.extend({
	opt: {
		defaultJobTimer: 10000
	},
	updateTemperature: function(){
		var sel = ".temperature";
		$.ajax({
			url: '/fido/api/temperature',
			method: 'get',
			success: function(data){
				var cel = Math.floor((data.temperature - 32) / 1.8);
				$(sel).html(data.temperature + '&deg F | ' + cel + '&deg C');
			}
		});
	},
	startJobs: function(){
		setInterval(this.updateTemperature, this.opt.defaultJobTimer);
	},
	initUI: function(){
		this.updateTemperature();
	},
	init: function(){
		this.initUI();
		this.startJobs();
	}
});

var mainControl = new MainControl('body');