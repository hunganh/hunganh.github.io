/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/websocket.js":
/*!*****************************!*\
  !*** ./src/js/websocket.js ***!
  \*****************************/
/***/ (() => {

eval("window.webSocketApp = {\r\n    initWebsocket : function () {\r\n        var n = $.Deferred();\r\n        if (window.webSocketConfigs.liveboard.Result == -1) {\r\n            window.webSocketConfigs.liveboard.Socket = io(window.webSocketConfigs.liveboard.LinkSocket, {\r\n                transports:['websocket', 'polling'],\r\n                forceNew: !0,\r\n                reconnection: !0,\r\n                reconnectionDelay: 1e3,\r\n                reconnectionAttempts: 5\r\n            });\r\n            window.webSocketConfigs.liveboard.Socket.on(\"connect\", function () {\r\n                console.log(\"CONNECT Websocket\");\r\n                window.webSocketConfigs.liveboard.Result = 1;\r\n                $(\"#status-connect\").text(\"Kết nối ổn định\").css(\"color\", \"#0ecb81\");\r\n                window.webSocketActions.socketCurrentUnRegister();\r\n                window.webSocketActions.messageRegister();\r\n                window.commonJS.hideDisconnectionMessageToast();\r\n                n.resolve();\r\n            });\r\n            window.webSocketConfigs.liveboard.Socket.on(\"disconnect\", function () {\r\n                window.webSocketConfigs.liveboard.Result = -1;\r\n                console.log(\"disconnect\");\r\n                $(\"#status-connect\").text(\"Mất kết nối\").css(\"color\", \"#f0b90b\");\r\n                //window.commonJS.showDisconnectionMessageToast();\r\n            });\r\n            window.webSocketConfigs.liveboard.Socket.on(\"connect_error\", function () {\r\n                window.webSocketConfigs.liveboard.Result = -2;\r\n                console.log(\"connect_error\");\r\n                $(\"#status-connect\").text(\"Lỗi kết nối\").css(\"color\", \"#f0b90b\");\r\n                //window.commonJS.showDisconnectionMessageToast();\r\n            });\r\n            window.webSocketConfigs.liveboard.Socket.on(\"reconnect_error\", function () {\r\n                window.webSocketConfigs.liveboard.Result = -3;\r\n                console.log(\"reconnect_error\");\r\n                $(\"#status-connect\").text(\"Thử kết nối lại thất bại\").css(\"color\", \"#f0b90b\");\r\n                //window.commonJS.showDisconnectionMessageToast();\r\n            })\r\n        }\r\n        return n.promise()\r\n    }\r\n}\r\n\r\nwindow.webSocketActions = { \r\n    messageRegister : function () {\r\n        var n = '{\"action\":\"join\",\"list\":\"' + window.webSocketConfigs.liveboard.listStock + '\"}';\r\n        if (window.webSocketConfigs.liveboard.Result == 1) {\r\n            window.webSocketConfigs.liveboard.Socket.emit(\"regs\", n);\r\n            window.webSocketConfigs.liveboard.Socket.on(\"stock\", function (res) {\r\n                window.boardsJS.decodeBoardBaseStock(\"stock\", res.data);\r\n            });\r\n            window.webSocketConfigs.liveboard.Socket.on(\"board\", function (res) {\r\n                window.boardsJS.decodeBoardBaseStock(\"board\", res.data);\r\n            })\r\n        }\r\n    },\r\n    \r\n    messageRegisterNewSymbol : function (symbol) {\r\n        var n = '{\"action\":\"join\",\"list\":\"' + [symbol] + '\"}';\r\n        if (window.webSocketConfigs.liveboard.Result == 1) {\r\n            window.webSocketConfigs.liveboard.Socket.emit(\"regs\", n);\r\n        }\r\n    },\r\n    \r\n    socketCurrentUnRegister : function () {\r\n        var n = '{\"action\":\"leave\",\"list\":\"' + window.webSocketConfigs.liveboard.listStock + '\"}';\r\n        window.webSocketConfigs.liveboard.Socket.emit(\"regs\", n);\r\n    },\r\n    \r\n    socketSymbolUnRegister : function (symbol) {\r\n        var n = '{\"action\":\"leave\",\"list\":\"' + [symbol] + '\"}';\r\n        window.webSocketConfigs.liveboard.Socket.emit(\"regs\", n);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/websocket.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/websocket.js"]();
/******/ 	
/******/ })()
;