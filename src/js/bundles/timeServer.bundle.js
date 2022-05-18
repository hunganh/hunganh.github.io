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

/***/ "./src/js/timeServer.js":
/*!******************************!*\
  !*** ./src/js/timeServer.js ***!
  \******************************/
/***/ (() => {

eval("window.timeServerJS = {\r\n    isOpenMarketTime: false,\r\n    StartWS : function () {\r\n        try {\r\n            ws = new WebSocket('wss://prs.tvsi.com.vn/datarealtime');\r\n            ws.onopen = function (evt) {\r\n                console.log(new Date());\r\n                console.log('Timer WS Connected');\r\n            };\r\n            ws.onmessage = function (evt) {\r\n                var strMarketInfo = JSON.parse(LZString.decompressFromBase64(evt.data));\r\n                if (strMarketInfo && strMarketInfo.length > 0) {\r\n                    var timeData = strMarketInfo.find(x => x.Code === 10 && x.Msg !== \"\");\r\n                    if (timeData) {\r\n                        $(\"#clock-date\").html(timeData.Msg.substring(0, 10));\r\n                        $(\"#clock-time\").html(timeData.Msg.substring(11, 19));\r\n                        var time = timeData.Msg.substring(11, 19);\r\n                        var hours = time.split(\":\");\r\n                        if (timeData.Msg.substring(11, 19) == \"08:44:01\") {\r\n                            // Reset data before open time\r\n                            window.boardsJS.loadLiveBoardData();\r\n                        }\r\n                        var path = window.location.pathname;\r\n                        if (hours != null && Number(hours) >= 9 && Number(hours) <= 15 && path.indexOf(\"khuyen-nghi-co-phieu.html\") != -1) {\r\n                            var realtimeData = strMarketInfo.find(x => x.Code === 3 && x.Msg !== \"\");\r\n                            if (realtimeData) {\r\n                                window.timeServerJS.ProcessRealtimeData(realtimeData.Msg);\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            };\r\n            ws.onerror = function (evt) {\r\n                console.log(new Date());\r\n                console.log('Timer WS error: ' + evt.message);\r\n            };\r\n            ws.onclose = function (evt) {\r\n                console.log(new Date());\r\n                console.log('Timer WS disconnected');\r\n                window.timeServerJS.StartWS();\r\n            };\r\n        }\r\n        catch (e) {\r\n            console.log(e);\r\n        }\r\n    },\r\n\r\n    ProcessRealtimeData: function(data) {\r\n        try {\r\n            const arrData = data.split(splitTag);\r\n            var icheck_last_qtty = false;\r\n            var lastprice = \"\";\r\n            var _llength = arrData.length;\r\n            for (let i = 0; i < _llength; i++) {\r\n                if (arrData[i] !== \"\") {\r\n                    icheck_last_qtty = false;\r\n                    try {\r\n                        const subData = arrData[i].split(\"*\");\r\n                        const tagEl0 = subData[0];\r\n                        var _symbol = tagEl0.substr(0, tagEl0.indexOf(\"_\"));\r\n                        lastprice = tagEl0;\r\n                        if (tagEl0.indexOf(\"_last_price\") !== -1) {\r\n                            \r\n                        }\r\n                    } catch (e) {\r\n                        console.log(e);\r\n                    }\r\n                }\r\n            }\r\n        } catch (e) {\r\n            console.log(e);\r\n        }\r\n    }\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function(e) {\r\n    window.timeServerJS.StartWS();\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/timeServer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/timeServer.js"]();
/******/ 	
/******/ })()
;