var IndexControl = can.Control.extend({
	opt: {
		defaultJobTimer: 10000
	},
	switchLight: function(element){
		var currentState = $(element).data('state'),
			onClass = "btn-primary",
			offClass = "btn-default";
		if (typeof currentState == "undefined" || currentState == false){
			$(element).html("On");
			$(element).removeClass( offClass );
			$(element).addClass( onClass );
		} else{
			$(element).html("Off");
			$(element).removeClass( onClass );
			$(element).addClass( offClass );
		}
		$(element).data('state',!currentState);
	},
	".light-switch click": function(element, event){
		event.preventDefault();
		var _this = this;
		$.ajax({
			method: "put",
			url: "/fido/api/outlet/1",
			success: function(data){
				_this.switchLight(element);
			},
			error: function(error){
				console.dir(error)
			}
		});
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