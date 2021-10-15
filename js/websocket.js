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
    liveboard: { Socket: -1, Result: -1, Link: "https://wtapidatafeed.vps.com.vn", LinkSocket: "https://bgdatafeed.vps.com.vn", listStock: [] },
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
            $("#status-connect").text("Kết nối ổn định").css("color", "rgb(14, 203, 129)");
            socketCurrentUnRegister();
            messageRegister();
            hideDisconnectionMessageToast();
            n.resolve();
        });
        global.liveboard.Socket.on("disconnect", function () {
            global.liveboard.Result = -1;
            console.log("disconnect");
            $("#status-connect").text("Mất kết nối").css("color", "rgb(240, 185, 11)");
            showDisconnectionMessageToast();
        });
        global.liveboard.Socket.on("connect_error", function () {
            global.liveboard.Result = -2;
            console.log("connect_error");
            $("#status-connect").text("Lỗi kết nối").css("color", "rgb(240, 185, 11)");
            showDisconnectionMessageToast();
        });
        global.liveboard.Socket.on("reconnect_error", function () {
            global.liveboard.Result = -3;
            console.log("reconnect_error");
            $("#status-connect").text("Thử kết nối lại thất bại").css("color", "rgb(240, 185, 11)");
            showDisconnectionMessageToast();
        })
    }
    return n.promise()
}

function messageRegister() {
    var n = '{"action":"join","list":"' + global.liveboard.listStock + '"}';
    if (global.liveboard.Result == 1) {
        global.liveboard.Socket.emit("regs", n);
        global.liveboard.Socket.on("stock", function (res) {
            decodeBoardBaseStock("stock", res.data);
        });
        global.liveboard.Socket.on("board", function (res) {
            decodeBoardBaseStock("board", res.data);
        })
    }
}

function messageRegisterNewSymbol(symbol) {
    var n = '{"action":"join","list":"' + [symbol] + '"}';
    if (global.liveboard.Result == 1) {
        global.liveboard.Socket.emit("regs", n);
    }
}

function socketCurrentUnRegister() {
    var n = '{"action":"leave","list":"' + global.liveboard.listStock + '"}';
    global.liveboard.Socket.emit("regs", n);
}

function socketSymbolUnRegister(symbol) {
    var n = '{"action":"leave","list":"' + [symbol] + '"}';
    global.liveboard.Socket.emit("regs", n);
}