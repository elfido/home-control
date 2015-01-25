var IndexControl = can.Control.extend({
	opt: {
		defaultJobTimer: 10000
	},
	toTimeZone: function(zone) {
		return moment().add(2, 'hours').toDate();
	},
	updateMexTime: function(){
		var time = this.toTimeZone("America/Los_Angeles"),
			selDate = '.mexico-date',
			selTime = '.mexico-time';
		time = moment(time).format('MM/DD/YYYY HH:mm').split(' ');
		$(selDate).html(time[0]);
		$(selTime).html(time[1]);
	},
	updateExchangeInfo: function(){
		$.ajax({
			url: '/fido/api/exchange',
			success: function(data){
				var sel = '.exchange-rate',
					info = data.query.results.rate[1];
				$(sel).html(parseFloat(info.Rate).toPrecision(4));
			}
		});
	},
	startJobs: function(){
		setInterval(this.updateMexTime.bind(this), this.opt.defaultJobTimer);
		setInterval(this.updateExchangeInfo.bind(this), (60000*60));
	},
	initUI: function(){
		this.updateMexTime();
		this.updateExchangeInfo();
	},
	init: function(){
		this.initUI();
		this.startJobs();
	}
});

var indexControl = new IndexControl('.container-fluid');