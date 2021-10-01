var ws;
var _count = 0;
$(function () {
    function StartWS($reload) {
        try {
           // var _pro = window.location.protocol == "https:" ? "wss://" : "ws://";
            ws = new WebSocket('wss://prs.tvsi.com.vn/datarealtime');
            ws.onopen = function (evt) {
                console.log(new Date());
                console.log('ws connected');
                if ($reload) {
                    var _isPlasma = document.getElementById("plasma-body") != null;
                    if (!!window.checkLoadStock) {
                        checkLoadStock(); // Lay lai tab ck hien tai
                    }
                    if (!!window.initTableIndex) {
                        indexChart.initTableIndex(); // Lay gia tri chi so
                        if (_isPlasma) {
                            indexChartPlasma.initTableIndex();
                        }
                    }
                    if (!!window.initIndexChart) {
                        indexChart.initMemData();
                        indexChart.initIndexChart();; // Lay bieu do chi so
                        if (_isPlasma) {
                            indexChartPlasma.initMemData();
                            indexChartPlasma.initindexChartPlasma();
                        }
                    }
                }
            };
            ws.onmessage = function (evt) {
                var strMarketInfo = JSON.parse(LZString.decompressFromBase64(evt.data));
                var _loopCount = strMarketInfo.length;
                for (var i = 0; i < _loopCount; i++) {
                    // if (strMarketInfo[i].Code == 0) {
                    //     // Reset Client.
                    //     console.log("Reset Client");
                    //     try {
                    //         window.dateServer = new Date(strMarketInfo[i].Msg);
                    //     } catch (e) {
                    //     }
                    //     if (!!window.checkLoadStock) {
                    //         checkLoadStock(); // Lay lai tab ck hien tai
                    //     }
                    //     if (!!window.initTableIndex) {
                    //         indexChart.initTableIndex(); // Lay gia tri chi so
                    //         if (_isPlasma) {
                    //             indexChartPlasma.initTableIndex();
                    //         }
                    //     }
                    //     if (!!window.initIndexChart) {
                    //         indexChart.initMemData();
                    //         indexChart.initIndexChart();; // Lay bieu do chi so
                    //         if (_isPlasma) {
                    //             indexChartPlasma.initMemData();
                    //             indexChartPlasma.initindexChartPlasma();
                    //         }
                    //     }
                    //     continue;
                    // }
                    // if (strMarketInfo[i].Code.toString() === "2" && strMarketInfo[i].Msg !== "") {   //Cập nhật bảng index
                    //     ChangeDataMK(strMarketInfo[i].Msg);
                    //     if (document.getElementById("indexTabInfoAll") != null) {
                    //         window.ChangeIndexCboAll(strMarketInfo[i].Msg);
                    //     }
                    //     continue;
                    // }
                    // // Thông tin biểu đồ chỉ số
                    // if (strMarketInfo[i].Code.toString() === "4" && strMarketInfo[i].Msg !== "") {
                    //     try {
                    //         if (_isPlasma) {
                    //             indexChartPlasma.ChangeDataindexChartPlasma(strMarketInfo[i].Msg);
                    //         } else {
                    //             indexChart.ChangeDataIndexChart(strMarketInfo[i].Msg);
                    //         }
                    //     } catch {
                    //         indexChart.ChangeDataIndexChart(strMarketInfo[i].Msg);
                    //     }
                    //     continue;
                    // }
                    // //phái sinh
                    // if (_isDerivative) {
                    //     // Thay đổi thị trường phái sinh
                    //     if (strMarketInfo[i].Code.toString() === "5" && strMarketInfo[i].Msg !== "") {
                    //         ChangeBoardDerivative(strMarketInfo[i].Msg);
                    //         continue;
                    //     }
                    //     // Thông tin biểu đồ phái sinh
                    //     if (strMarketInfo[i].Code.toString() === "6" && strMarketInfo[i].Msg !== "") {
                    //         stockChart.ChangeStockChartData(strMarketInfo[i].Msg);
                    //         continue;
                    //     }

                    //     // Thay doi Hist Derivative
                    //     if (strMarketInfo[i].Code.toString() === "7" && strMarketInfo[i].Msg !== "") {
                    //         ChangeBoardHistDerivative(strMarketInfo[i].Msg);
                    //         continue;
                    //     }
                    // }

                    //cơ sở
                    if (strMarketInfo[i].Code.toString() === "3" && strMarketInfo[i].Msg !== "") {
                        decodeBoardBaseStock(strMarketInfo[i].Msg);
                        continue;
                    }
                    // // PO
                    // if (strMarketInfo[i].Code.toString() === "9" && strMarketInfo[i].Msg !== "") {
                    //     ChangeBoardBaseStock(strMarketInfo[i].Msg);
                    //     continue;
                    // }
                    // if (_isPTDeal) {
                    //     if (strMarketInfo[i].Code == 8 && strMarketInfo[i].Msg !== "") {
                    //         const dataTab = $("#tabGDTT").find(".cbo-li.active").attr("data-tab") || "";
                    //         dataTab !== "" && window.GetDataGDTT(dataTab);
                    //         continue;
                    //     }
                    // }
                    // if (strMarketInfo[i].Code == 10 && strMarketInfo[i].Msg !== "") {
                    //     $("#clock-date").html(strMarketInfo[i].Msg.substring(0, 10));
                    //     $("#clock-time").html(strMarketInfo[i].Msg.substring(11, 19));
                    //     $("span[data-id='clock-time']").html(strMarketInfo[i].Msg.substring(11, 19));
                    //     continue;
                    // }
                }
            };

            ws.onerror = function (evt) {
                console.log(new Date());
                console.log('ws error: ' + evt.message);
            };
            ws.onclose = function (evt) {
                console.log(new Date());
                console.log('ws disconnected');
                StartWS(true);
            };
        }
        catch (e) {
            console.log(e);
        }
    }
    function CloseCurrentWS() {
        try {
            if (ws) {
                ws.close();
            }
        } catch (e) {
            console.log(e);
        }
    }
    StartWS();
});