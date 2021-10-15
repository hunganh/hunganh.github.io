$(function () {
    function StartWS() {
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
                        // $("span[data-id='clock-time']").html(strMarketInfo[i].Msg.substring(11, 19));
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
                StartWS();
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    StartWS();
});