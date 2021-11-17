window.webSocketApp = {
    initWebsocket : function () {
        var n = $.Deferred();
        if (window.webSocketConfigs.liveboard.Result == -1) {
            window.webSocketConfigs.liveboard.Socket = io(window.webSocketConfigs.liveboard.LinkSocket, {
                forceNew: !0,
                reconnection: !0,
                reconnectionDelay: 1e3,
                reconnectionAttempts: 5
            });
            window.webSocketConfigs.liveboard.Socket.on("connect", function () {
                console.log("CONNECT Websocket");
                window.webSocketConfigs.liveboard.Result = 1;
                $("#status-connect").text("Kết nối ổn định").css("color", "#0ecb81");
                window.webSocketActions.socketCurrentUnRegister();
                window.webSocketActions.messageRegister();
                window.commonJS.hideDisconnectionMessageToast();
                n.resolve();
            });
            window.webSocketConfigs.liveboard.Socket.on("disconnect", function () {
                window.webSocketConfigs.liveboard.Result = -1;
                console.log("disconnect");
                $("#status-connect").text("Mất kết nối").css("color", "#f0b90b");
                window.commonJS.showDisconnectionMessageToast();
            });
            window.webSocketConfigs.liveboard.Socket.on("connect_error", function () {
                window.webSocketConfigs.liveboard.Result = -2;
                console.log("connect_error");
                $("#status-connect").text("Lỗi kết nối").css("color", "#f0b90b");
                window.commonJS.showDisconnectionMessageToast();
            });
            window.webSocketConfigs.liveboard.Socket.on("reconnect_error", function () {
                window.webSocketConfigs.liveboard.Result = -3;
                console.log("reconnect_error");
                $("#status-connect").text("Thử kết nối lại thất bại").css("color", "#f0b90b");
                window.commonJS.showDisconnectionMessageToast();
            })
        }
        return n.promise()
    }
}

window.webSocketActions = { 
    messageRegister : function () {
        var n = '{"action":"join","list":"' + window.webSocketConfigs.liveboard.listStock + '"}';
        if (window.webSocketConfigs.liveboard.Result == 1) {
            window.webSocketConfigs.liveboard.Socket.emit("regs", n);
            window.webSocketConfigs.liveboard.Socket.on("stock", function (res) {
                window.boardsJS.decodeBoardBaseStock("stock", res.data);
            });
            window.webSocketConfigs.liveboard.Socket.on("board", function (res) {
                window.boardsJS.decodeBoardBaseStock("board", res.data);
            })
        }
    },
    
    messageRegisterNewSymbol : function (symbol) {
        var n = '{"action":"join","list":"' + [symbol] + '"}';
        if (window.webSocketConfigs.liveboard.Result == 1) {
            window.webSocketConfigs.liveboard.Socket.emit("regs", n);
        }
    },
    
    socketCurrentUnRegister : function () {
        var n = '{"action":"leave","list":"' + window.webSocketConfigs.liveboard.listStock + '"}';
        window.webSocketConfigs.liveboard.Socket.emit("regs", n);
    },
    
    socketSymbolUnRegister : function (symbol) {
        var n = '{"action":"leave","list":"' + [symbol] + '"}';
        window.webSocketConfigs.liveboard.Socket.emit("regs", n);
    }
}
