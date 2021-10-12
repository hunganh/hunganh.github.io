// var ws;
// var _count = 0;
// $(function () {
//     function StartWS($reload) {
//         try {
//            // var _pro = window.location.protocol == "https:" ? "wss://" : "ws://";
//            wss://bgdatafeed.vps.com.vn/socket.io/?EIO=3&transport=websocket&sid=jkbjkSNdB8j-gb00AATv
//             ws = new WebSocket('wss://bgdatafeed.vps.com.vn/socket.io');
//             ws.onopen = function (evt) {
//                 console.log(new Date());
//                 console.log('ws connected');
//                 if ($reload) {
//                     var _isPlasma = document.getElementById("plasma-body") != null;
//                     if (!!window.checkLoadStock) {
//                         checkLoadStock(); // Lay lai tab ck hien tai
//                     }
//                     if (!!window.initTableIndex) {
//                         indexChart.initTableIndex(); // Lay gia tri chi so
//                         if (_isPlasma) {
//                             indexChartPlasma.initTableIndex();
//                         }
//                     }
//                     if (!!window.initIndexChart) {
//                         indexChart.initMemData();
//                         indexChart.initIndexChart();; // Lay bieu do chi so
//                         if (_isPlasma) {
//                             indexChartPlasma.initMemData();
//                             indexChartPlasma.initindexChartPlasma();
//                         }
//                     }
//                 }
//             };
//             ws.onmessage = function (evt) {
//                 var strMarketInfo = JSON.parse(LZString.decompressFromBase64(evt.data));
//                 var _loopCount = strMarketInfo.length;
//                 for (var i = 0; i < _loopCount; i++) {
//                     //cơ sở
//                     if (strMarketInfo[i].Code.toString() === "3" && strMarketInfo[i].Msg !== "") {
//                         decodeBoardBaseStock(strMarketInfo[i].Msg);
//                         continue;
//                     }
//                 }
//             };

//             ws.onerror = function (evt) {
//                 console.log(new Date());
//                 console.log('ws error: ' + evt.message);
//             };
//             ws.onclose = function (evt) {
//                 console.log(new Date());
//                 console.log('ws disconnected');
//                 StartWS(true);
//             };
//         }
//         catch (e) {
//             console.log(e);
//         }
//     }
//     function CloseCurrentWS() {
//         try {
//             if (ws) {
//                 ws.close();
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     }
//     StartWS();
// });

var global = {
    version: "2.7.3",
    authenType: "M",
    warningMsg: "",
    channel: "I",
    listPermission: "",
    loadchangeTimeout: "",
    loadchangePsTimeout: "",
    loadchangeIndexTimeout: "",
    loadorderTimeout: "",
    listAccount: [],
    listShare: [],
    listStock: [],
    listStockPs: [],
    listStockAll: [],
    ListPortfolio: [],
    listDatePs: {},
    loadOne: false,
    confirmOrder: "0",
    lang: "vi-VN",
    liveboard: { Socket: -1, Result: -1, Link: "https://wtapidatafeed.vps.com.vn", LinkSocket: "https://bgdatafeed.vps.com.vn", listStock: ["FPT", "MWG", "HDC", "TCB"] },
    HostPSA: "https://psaapi.vps.com.vn", //Prod: http://103.131.76.25:8080
    liveboardps: { Socket: -1, Result: -1, Link: "" },
    decimalRound: 2,
    fsCancelTime: 5,
    conditionOrderDescriptions: {},
    isDontRemindMM: false,
    listDateSMOTP: {},
    pwdRemainDay: "103",
    notiChangePass: "0",
    hostdeposit: "https://apideposit.vps.com.vn", //Prod:https://apideposittest.vps.com.vn
    hostbond: "https://apibond.vps.com.vn", //Prod:https://apibondtest.vps.com.vn
    hostmm: "https://apimm.vps.com.vn", //Prod:https://apimmtest.vps.com.vn
    hostPaygate: "https://eweb-pg.vps.com.vn", //Prod: https://ewebtest-pg.vps.com.vn
    hostwatchlist: "https://histdatafeed.vps.com.vn", //Prod: http://10.32.79.12
    hostimg: "https://soapidatafeed.vps.com.vn/bankicon"
}

$(function () {
    function initWebsocket() {
        var n = $.Deferred();
        if (global.liveboard.Result == -1) {
            global.liveboard.Socket = io(global.liveboard.LinkSocket, {
                forceNew: !0,
                reconnection: !0,
                reconnectionDelay: 1e3,
                reconnectionAttempts: 5
            });
            global.liveboard.Socket.on("connect", function () {
                console.log("CONNECT Websocket");
                global.liveboard.Result = 1;
                $("#status-connect").text("Connected").css("color", "#50C979");
                socketCurrentUnRegister();
                messageRegister();
                n.resolve();
            });
            global.liveboard.Socket.on("disconnect", function () {
                global.liveboard.Result = -1;
                console.log("disconnect");
                $("#status-connect").text("Disconnect").css("color", "#DA5664")
            });
            global.liveboard.Socket.on("connect_error", function () {
                global.liveboard.Result = -2;
                console.log("connect_error");
                $("#status-connect").text("Disconnect").css("color", "#DA5664")
            });
            global.liveboard.Socket.on("reconnect_error", function () {
                global.liveboard.Result = -3;
                console.log("reconnect_error");
                $("#status-connect").text("Disconnect").css("color", "#DA5664")
            })
        }
        return n.promise()
    }
    function messageRegister() {
        var n = '{"action":"join","list":"' + global.liveboard.listStock + '"}';
        if (global.liveboard.Result == 1) {
            global.liveboard.Socket.emit("regs", n);
            global.liveboard.Socket.on("stock", function (res) {
                console.log("====== stocks message ==== ", res.data);
            });
            global.liveboard.Socket.on("board", function (res) {
                console.log("====== board message ==== ", res.data);
            })
        }
    }
    function socketCurrentUnRegister() {
        var n = '{"action":"leave","list":"' + global.liveboard.listStock + '"}';
        global.liveboard.Socket.emit("regs", n)
    }
    initWebsocket();
});
