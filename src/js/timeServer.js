window.timeServerJS = {
    isOpenMarketTime: false,
    StartWS : function () {
        try {
            ws = new WebSocket('wss://prs.tvsi.com.vn/datarealtime');
            ws.onopen = function (evt) {
                console.log(new Date());
                console.log('Timer WS Connected');
            };
            ws.onmessage = function (evt) {
                var strMarketInfo = JSON.parse(LZString.decompressFromBase64(evt.data));
                if (strMarketInfo && strMarketInfo.length > 0) {
                    var timeData = strMarketInfo.find(x => x.Code === 10 && x.Msg !== "");
                    if (timeData) {
                        $("#clock-date").html(timeData.Msg.substring(0, 10));
                        $("#clock-time").html(timeData.Msg.substring(11, 19));
                        var time = timeData.Msg.substring(11, 19);
                        var hours = time.split(":");
                        if (timeData.Msg.substring(11, 19) == "08:44:01") {
                            // Reset data before open time
                            window.boardsJS.loadLiveBoardData();
                        }
                        var path = window.location.pathname;
                        if (hours != null && Number(hours) >= 9 && Number(hours) <= 15 && path.indexOf("khuyen-nghi-co-phieu.html") != -1) {
                            var realtimeData = strMarketInfo.find(x => x.Code === 3 && x.Msg !== "");
                            if (realtimeData) {
                                window.timeServerJS.ProcessRealtimeData(realtimeData.Msg);
                            }
                        }
                    }
                }
            };
            ws.onerror = function (evt) {
                console.log(new Date());
                console.log('Timer WS error: ' + evt.message);
            };
            ws.onclose = function (evt) {
                console.log(new Date());
                console.log('Timer WS disconnected');
                window.timeServerJS.StartWS();
            };
        }
        catch (e) {
            console.log(e);
        }
    },

    ProcessRealtimeData: function(data) {
        try {
            const arrData = data.split(splitTag);
            var icheck_last_qtty = false;
            var lastprice = "";
            var _llength = arrData.length;
            for (let i = 0; i < _llength; i++) {
                if (arrData[i] !== "") {
                    icheck_last_qtty = false;
                    try {
                        const subData = arrData[i].split("*");
                        const tagEl0 = subData[0];
                        var _symbol = tagEl0.substr(0, tagEl0.indexOf("_"));
                        lastprice = tagEl0;
                        if (tagEl0.indexOf("_last_price") !== -1) {
                            
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    window.timeServerJS.StartWS();
});
