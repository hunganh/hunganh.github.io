var realtime = {};
realtime.fnInitSocket = function(){
    if(_socket == null || _socket == 'undefined'){
        _socket = io(cfg.socketLink);
        _socket.on("connect", function(dt){
            console.info("CONNECTED TRADING VIEW REALTIME");
            realtime.fnChangeSymbol("");
        });
    } else {
		console.log('reconnect');
		_socket.connect();
    }

    // CÆ¡ sá»Ÿ
    _socket.on("stock", function(zdata){
        var rs = zdata;
        try {
            rs = JSON.parse(zdata);
        } catch (error) { }
        
        if(rs.hasOwnProperty('t')){
            realtime.updateRealtime(rs);
        }
    });

    // PhĂ¡i sinh
    _socket.on("stockps", function(zdata){
        var rs = zdata;
        try {
            rs = JSON.parse(zdata);
        } catch (error) { }

        if(rs.hasOwnProperty('t')){
            realtime.updateRealtime(rs);
        }
    });
}

realtime.fnChangeSymbol= function(sym){
    if(sym == cfg.symChart) return false;

    if(sym !="") {
        var msg = JSON.stringify({action: "leave",list: "CHART."+ cfg.symChart});
        _socket.emit('regs', msg);
        console.info("Chart leave: ",msg);
        cfg.symChart = sym;
    }

    msg =  JSON.stringify({action: "join",list: "CHART."+ cfg.symChart}) ;
    _socket.emit('regs', msg);
    console.info("Chart join: ",msg);
}

//42["stockps",{"t":1615357783,"c":1171.5,"o":1170.7,"h":1171.7,"l":1170.7,"v":478,"s":"VN30F2103"}]
realtime.updateRealtime =function(bar){
    var obj = dtfeed._dataPulseProvider._subscribers;
    const sub = obj[Object.keys(obj)[0]];
    if (!sub) { return }
    var lastBar = {}
    try{
        lastBar = lastBarVPS[sub.symbolInfo.name];
    } catch(er) { console.log('Err:',er); }
    
	var lastBarSec = !lastBar || !lastBar.time ? 0 : lastBar.time / 1000;
	
    var rounded = 0; var roundedDay = 0;
    let resolution = sub.resolution
    if (resolution.includes('D')) {
        resolution = 1440;  // 1 day in minutes === 1440
   } else if (resolution.includes('W')) {
        resolution = 10080; // 1 week in minutes === 10080
   }
    var coeff = resolution * 60 // 1 phĂºt
    rounded = Math.floor(bar.t / coeff) * coeff;
    if($.isNumeric( sub.resolution)) {
        roundedDay = rounded;
    } else {    //resolution = 1D, W, M, Y
        var d = new Date(bar.t * 1000);
        d.setHours(0,0,0,0);
        roundedDay = d.getTime()/ 1000;
    }

    
	let _lastBar;
	if (roundedDay > lastBarSec) {	// create new
        
		_lastBar = {
			time: rounded * 1000,
			open: bar.o,
			high: bar.h,
			low: bar.l,
			close: bar.c,
			volume: bar.v
		}
        //console.log('1',new Date(rounded*1000),new Date(lastBarSec*1000),_lastBar, lastBar)
	} else {	// update lastbar
		if (bar.c < lastBar.low) {
			lastBar.low = bar.c
		} else if (bar.c > lastBar.high) {
			lastBar.high = bar.c
        }
        
        _lastBar = {
			time: rounded * 1000,
			open: lastBar.open,
			high: lastBar.high,
			low: lastBar.low,
			close: bar.c,
			volume: lastBar.volume + bar.lv
		}
        //console.log('2',new Date(rounded*1000),new Date(lastBarSec*1000),_lastBar, lastBar)
	}
	
     sub.listener(_lastBar);
     lastBarVPS[sub.symbolInfo.name] = _lastBar; 
}