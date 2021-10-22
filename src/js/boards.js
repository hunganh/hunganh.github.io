$(function () {
    initTooltips();
    if (global.liveboard.listStock.length > 0) {
        socketCurrentUnRegister();
    }
    loadLiveBoardData();
    $(window).resize(function() {
        setLiveBoardTableHeight();
    });
    initSymbolAutocomple("symbol-name-autocomplete");
    $("#btnAddSymbolLiveBoard").click(function(){
        var value = $('#symbol-name-autocomplete').val();
        if (value !== "") {
            if (global.liveboard.listStock.indexOf(value) === -1) {
                global.liveboard.listStock.push(value);
                getListStockOfLiveBoardData(value, true);
                messageRegisterNewSymbol(value);
            }
        }
    });
});

function loadLiveBoardData() {
    var loading = getLoadingHTML();
    $("#showLoadingLiveBoard").html(loading);
    setTimeout(() => {
        getListOfSymbols();
    }, 50);
}

function getListOfSymbols() {
    $.ajax({
        url: `${STOCK_LIVE_BOARD_URL}`,
        method: "GET",
        async: false
    }).done(function (response) {
        if (response) {
            var symbolSelectionType = $('#selectionSymbolsLiveBoard').val();
            var periodType = $("input[name='btnStatisticsPeriodLiveBoardRadio']:checked").val();
            var symbols = response[symbolSelectionType][periodType];
            if (symbols && symbols.length > 0) {
                if (symbolSelectionType !== "bothNetBuy") {
                    symbols = symbols.slice(0, 10);
                }
                global.liveboard.listStock = symbols;
                getListStockOfLiveBoardData(symbols.toString(), false);
                if (global.liveboard.Result !== 1) {
                    setTimeout(() => {
                        initWebsocket();
                    }, 30);
                } else {
                    if (global.liveboard.Socket) {
                        socketCurrentUnRegister();
                        messageRegister();
                    }
                }
            }
        } else {
            $("#stock-price-table-body").html(`<tr><td colspan="31" class="bold-text">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`);
        }
        //$("#showLoadingLiveBoard").html("");
    }).fail(function (jqXHR, textStatus, error) {
        $("#stock-price-table-body").html(`<tr><td colspan="31" class="bold-text">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`);
        $("#showLoadingLiveBoard").html("");
    });
}

function getListStockOfLiveBoardData(symbols, isAppend) {
    $.ajax({
        url: `https://bgapidatafeed.vps.com.vn/getliststockdata/${symbols}`,
        method: "GET",
        async: false
    }).done(function (response) {
        var res = "";
        if (response && response.length > 0) {
            res += processLiveBoardDataInput(response);
        } else {
            res += isAppend ? `<tr><td colspan="31" class="bold-text">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>` : "";
        }
        if (isAppend) {
            $("#stock-price-table-body tr:first").before(res);
        } else {
            $("#stock-price-table-body").html(res);
        }
        setLiveBoardTableHeight();
        fetchTechnicalAnalysisSignal(null);
        setTimeout(() => {
            initTableDnD();
        }, 200);
    }).fail(function (jqXHR, textStatus, error) {
        if (!isAppend) {
            $("#stock-price-table-body").html(`<tr><td colspan="31" class="bold-text">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`);
        }
        $("#showLoadingLiveBoard").html("");
    });
}

function initTableDnD() {
    //$("#live-board-price-table").tableDnD();
    $("#live-board-price-table").tableDnD({
        onDragClass: "dragClass"
    });
}

function fetchTechnicalAnalysisSignal(period) {
    var loading = getLoadingHTML();
    $("#showLoadingLiveBoard").html(loading);
    var body = global.liveboard.listStock.map(x => {
        let obj = {}; 
        obj["text"] = x; 
        return obj;
    });
    if (!period) {
        period = "Daily";
    }
    Promise.all([
        fetchContentByUrlWithCORSProxy(encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_STOCK_TA_RATINGS_PATH}`), "POST", body)
    ]).then((values) => {
        if (values && values.length > 0) { 
            var data = values[0].result ;    
            global.liveboard.listStock.forEach(symbol => {
                // Signal IDs
                var tbSignal = `#${symbol}_TB`;
                var gdSignal = `#${symbol}_GD`;
                var xhSignal = `#${symbol}_XH`;
                var dtSignal = `#${symbol}_DT`;
                var recommendationSignal = `#${symbol}_Recommendation`;

                // Signal Values
                var tbSignalValue = data[symbol].ratingOverviews[`Overview_DuongTB_${period}`].point_Description;
                var gdSignalValue = data[symbol].ratingOverviews[`Overview_GiaoDong_${period}`].point_Description;
                var xhSignalValue = data[symbol].ratingOverviews[`Overview_XuHuong_${period}`].point_Description;
                var dtSignalValue = data[symbol].ratingOverviews[`Overview_DongTien_${period}`].point_Description;
                var recommendationSignalValue = data[symbol].ratingOverviews[`Overview_Tong_${period}`].point_Description;

                // Set Contents & Flash colors
                var tbValueHtml = `<span class="${getSignalColorClass(tbSignalValue)} disable-select">${tbSignalValue}</span>`;
                var gdValueHtml = `<span class="${getSignalColorClass(gdSignalValue)} disable-select">${gdSignalValue}</span>`;
                var xhValueHtml = `<span class="${getSignalColorClass(xhSignalValue)} disable-select">${xhSignalValue}</span>`;
                var dtValueHtml = `<span class="${getSignalColorClass(dtSignalValue)} disable-select">${dtSignalValue}</span>`;
                var recommendationValueHtml = `<span class="${getSignalColorClass(recommendationSignalValue)} disable-select">${recommendationSignalValue}</span>`;
                setFlashHighlightSignal(tbSignal, tbSignalValue);
                $(tbSignal).html(tbValueHtml);
                setFlashHighlightSignal(gdSignal, gdSignalValue);
                $(gdSignal).html(gdValueHtml);
                setFlashHighlightSignal(xhSignal, xhSignalValue);
                $(xhSignal).html(xhValueHtml);
                setFlashHighlightSignal(dtSignal, dtSignalValue);
                $(dtSignal).html(dtValueHtml);
                setFlashHighlightSignal(recommendationSignal, recommendationSignalValue);
                $(recommendationSignal).html(recommendationValueHtml);
            });  
        }
    }).then(() => {
        $("#showLoadingLiveBoard").html("");
    }).catch((err) => {
        $("#showLoadingLiveBoard").html("");
        console.error(err);
    });
}

function changePeriodSignalLiveBoard(period) {
    fetchTechnicalAnalysisSignal(period);
}

function processLiveBoardDataInput(response) {
    var res = "";
    response.forEach(data => {
        var volAndPrice = {};
        for (let index = 1; index <= 6; index++) {
            var values = data[`g${index}`].split("|");
            volAndPrice["p"+index] = values[0];
            volAndPrice["v"+index] = values[1];
        }
        res += `<tr class="price-item stock tr-drag-cursor" id="${data.sym}_id" data-r=${data.r} data-c=${data.c} data-f=${data.f} onclick="showTickerInfor('${data.sym}')">
                    <td id="${data.sym}_symbol" class="symbol symbol-text text-left sticky-td1-left" ${getColorStyle(data.r, data.c, data.f, data.lastPrice)}>${data.sym}</td>
                    <td id="${data.sym}_r" class="text-yellow high-light-cell text-right sticky-td2-left price-width">${data.r > 0 ? data.r.toFixed(2) : ""}</td>
                    <td id="${data.sym}_c" class="text-purple high-light-cell text-right sticky-td3-left price-width">${data.c > 0 ? data.c.toFixed(2) : ""}</td>
                    <td id="${data.sym}_f" class="text-blue high-light-cell text-right sticky-td4-left price-width">${data.f > 0 ? data.f.toFixed(2) : ""}</td>
                    <td id="${data.sym}_TB" class="text-left signal-width"> &nbsp; </td>
                    <td id="${data.sym}_GD" class="text-left signal-width"> &nbsp; </td>
                    <td id="${data.sym}_XH" class="text-left signal-width"> &nbsp; </td>
                    <td id="${data.sym}_DT" class="text-left signal-width"> &nbsp; </td>
                    <td id="${data.sym}_Recommendation" class="text-left high-light-cell signal-width"> &nbsp; </td>
                    <td id="${data.sym}_price_3" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p3))}>${Number(volAndPrice.p3) > 0 ? volAndPrice.p3 : ""}</td>
                    <td id="${data.sym}_vol_3" class="text-right volume-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p3))} >${convertToVolFormat(Number(volAndPrice.v3))}</td>
                    <td id="${data.sym}_price_2" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p2))}>${Number(volAndPrice.p2) > 0 ? volAndPrice.p2 : ""}</td>
                    <td id="${data.sym}_vol_2" class="text-right volume-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p2))}>${convertToVolFormat(volAndPrice.v2)}</td>
                    <td id="${data.sym}_price_1" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p1))}>${Number(volAndPrice.p1) > 0 ? volAndPrice.p1 : ""}</td>
                    <td id="${data.sym}_vol_1" class="text-right volume-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p1))}>${convertToVolFormat(volAndPrice.v1)}</td>
                    <td class="high-light-cell text-right price-width" id="${data.sym}_lastPrice" ${getColorStyle(data.r, data.c, data.f, data.lastPrice)}>${data.lastPrice > 0 ? data.lastPrice.toFixed(2).toString() : ""}</td>
                    <td class="high-light-cell text-right volume-width" id="${data.sym}_lastVol" ${getColorStyle(data.r, data.c, data.f, data.lastPrice)}>${convertToVolFormat(data.lastVolume)}</td>
                    <td class="high-light-cell text-right percent-width" id="${data.sym}_change" ${getColorStyle(data.r, data.c, data.f, data.lastPrice)}>${data.lastPrice > 0 ? (data.lastPrice < data.r ? "-".concat(data.ot.toString()) : data.ot.toString()) : ""}</td>
                    <td class="high-light-cell text-right percent-width" id="${data.sym}_changePc" ${getColorStyle(data.r, data.c, data.f, data.lastPrice)}>${data.lastPrice > 0 ? (data.lastPrice < data.r ? "-".concat(data.changePc.toString()) : data.changePc.toString()) : ""}${data.lastPrice > 0 ? "%" : ""}</td>
                    <td id="${data.sym}_price_4" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p4))}>${Number(volAndPrice.p4) > 0 ? volAndPrice.p4 : ""}</td>
                    <td id="${data.sym}_vol_4" class="text-right volume-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p4))}>${convertToVolFormat(volAndPrice.v4)}</td>
                    <td id="${data.sym}_price_5" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p5))}>${Number(volAndPrice.p5) > 0 ? volAndPrice.p5 : ""}</td>
                    <td id="${data.sym}_vol_5"  class="text-right volume-width"${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p5))}>${convertToVolFormat(volAndPrice.v5)}</td>
                    <td id="${data.sym}_price_6" class="text-right price-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p6))}>${Number(volAndPrice.p6) > 0 ? volAndPrice.p6 : ""}</td>
                    <td id="${data.sym}_vol_6" class="text-right volume-width" ${getColorStyle(data.r, data.c, data.f, Number(volAndPrice.p6))}>${convertToVolFormat(volAndPrice.v6)}</td>
                    <td id="${data.sym}_totalVol" class="col-totalVolume text-right volume-width">${convertToVolFormat(data.lot)}</td>
                    <td class="high-light-cell col-avePrice text-right price-width" id="${data.sym}_avePrice" ${getColorStyle(data.r, data.c, data.f, data.avePrice)}>${data.avePrice > 0 ? data.avePrice.toString() : ""}</td>
                    <td class="high-light-cell col-highPrice text-right price-width" id="${data.sym}_highPrice" ${getColorStyle(data.r, data.c, data.f, data.highPrice)}>${data.highPrice > 0 ? data.highPrice.toString() : ""}</td>
                    <td class="high-light-cell col-lowPrice text-right price-width" id="${data.sym}_lowPrice" ${getColorStyle(data.r, data.c, data.f, data.lowPrice)}>${data.lowPrice > 0 ? data.lowPrice.toString() : ""}</td>
                    <td id="${data.sym}_fBVol" class="col-foreign text-right volume-width">${convertToVolFormat(data.fBVol)}</td>
                    <td id="${data.sym}_fSVol" class="col-foreign text-right volume-width">${convertToVolFormat(data.fSVolume)}</td>
                </tr>`;
    });
    return res;
}

function decodeBoardBaseStock(type, data) {
    try {
        var symbol = data.hasOwnProperty('sym') ? data.sym : data.symbol;
        var rootId = `#${symbol}_id`;
        var symbolName = `#${symbol}_symbol`;

        var lastPrice = `#${symbol}_lastPrice`;
        var lastVol = `#${symbol}_lastVol`;
        var change = `#${symbol}_change`;
        var changePc = `#${symbol}_changePc`;

        var price_6 = `#${symbol}_price_6`;
        var price_5 = `#${symbol}_price_5`;
        var price_4 = `#${symbol}_price_4`;
        var price_3 = `#${symbol}_price_3`;
        var price_2 = `#${symbol}_price_2`;
        var price_1 = `#${symbol}_price_1`;
        var vol_6 = `#${symbol}_vol_6`;
        var vol_5 = `#${symbol}_vol_5`;
        var vol_4 = `#${symbol}_vol_4`;
        var vol_3 = `#${symbol}_vol_3`;
        var vol_2 = `#${symbol}_vol_2`;
        var vol_1 = `#${symbol}_vol_1`;

        var totalVol = `#${data.sym}_totalVol`;

        var highPriceId = `#${symbol}_highPrice`;
        var avePriceId = `#${symbol}_avePrice`;
        var lowPriceId = `#${symbol}_lowPrice`;

        var fBVol = `#${symbol}_fBVol`;
        var fSVol = `#${symbol}_fSVol`;

        setLiveBoardCommonValueData(data, symbolName, lastPrice, lastVol, change, changePc, highPriceId, avePriceId, lowPriceId, totalVol, rootId);
        if (data.hasOwnProperty('side') && data.side === "B") {
            var g1 = data.g1.split("|");
            if (g1 && g1.length > 0) {
                setFlashHighlightBuySell(price_1, g1[0]);
                $(price_1).text(Number(g1[0]) > 0 || checkAtoOrAtcSession(g1[0]) ? g1[0] : "");
                setFlashHighlightBuySell(vol_1, convertToVolFormat(g1[1]));
                $(vol_1).text(convertToVolFormat(g1[1]));
                setColorOfElements(rootId, [price_1, vol_1], Number(g1[0]));
            }
            var g2 = data.g2.split("|");
            if (g2 && g2.length > 0) {
                setFlashHighlightBuySell(price_2, g2[0]);
                $(price_2).text(Number(g2[0]) > 0 || checkAtoOrAtcSession(g2[0]) ? g2[0] : "");
                setFlashHighlightBuySell(vol_2, convertToVolFormat(g2[1]));
                $(vol_2).text(convertToVolFormat(g2[1]));
                setColorOfElements(rootId, [price_2, vol_2], Number(g2[0]));
            }
            var g3 = data.g3.split("|");
            if (g3 && g3.length > 0) {
                setFlashHighlightBuySell(price_3, g3[0]);
                $(price_3).text(Number(g3[0]) > 0 || checkAtoOrAtcSession(g3[0]) ? g3[0] : "");
                setFlashHighlightBuySell(vol_3, convertToVolFormat(g3[1]));
                $(vol_3).text(convertToVolFormat(g3[1]));
                setColorOfElements(rootId, [price_3, vol_3], Number(g3[0]));
            }
        } else if (data.hasOwnProperty('side') && data.side === "S") {
            var g1 = data.g1.split("|");
            if (g1 && g1.length > 0) {
                setFlashHighlightBuySell(price_4, g1[0]);
                $(price_4).text(Number(g1[0]) > 0 || checkAtoOrAtcSession(g1[0]) ? g1[0] : "");
                setFlashHighlightBuySell(vol_4, convertToVolFormat(g1[1]));
                $(vol_4).text(convertToVolFormat(g1[1]));
                setColorOfElements(rootId, [price_4, vol_4], Number(g1[0]));
            }
            var g2 = data.g2.split("|");
            if (g2 && g2.length > 0) {
                setFlashHighlightBuySell(price_5, g2[0]);
                $(price_5).text(Number(g2[0]) > 0 || checkAtoOrAtcSession(g2[0]) ? g2[0] : "");
                setFlashHighlightBuySell(vol_5, convertToVolFormat(g2[1]));
                $(vol_5).text(convertToVolFormat(g2[1]));
                setColorOfElements(rootId, [price_5, vol_5], Number(g2[0]));
            }
            var g3 = data.g3.split("|");
            if (g3 && g3.length > 0) {
                setFlashHighlightBuySell(price_6, g3[0]);
                $(price_6).text(Number(g3[0]) > 0 || checkAtoOrAtcSession(g3[0]) ? g3[0] : "");
                setFlashHighlightBuySell(vol_6, convertToVolFormat(g3[1]));
                $(vol_6).text(convertToVolFormat(g3[1]));
                setColorOfElements(rootId, [price_6, vol_6], Number(g3[0]));
            }
        }
        if (data.hasOwnProperty('fBVol')) {
            setFlashHighlightBuySell(fBVol, data.fBVol);
            $(fBVol).text(convertToVolFormat(Number(data.fBVol)));
        }
        if (data.hasOwnProperty('fSVolume')) {
            setFlashHighlightBuySell(fSVol, data.fSVolume);
            $(fSVol).text(convertToVolFormat(Number(data.fSVolume)));
        }
    } catch (e) {
        //console.log(e);
    }
}

function setLiveBoardCommonValueData(data, symbolName, lastPrice, lastVol, change, changePc, highPriceId, avePriceId, lowPriceId, totalVol, rootId) {
    if (data.hasOwnProperty('lastPrice')) {
        setFlashHighlight(lastPrice, data.lastPrice.toFixed(2).toString());
        $(lastPrice).text(data.lastPrice > 0 ? data.lastPrice.toFixed(2).toString() : "");
        setFlashHighlight(lastVol, convertToVolFormat(data.lastVol));
        $(lastVol).text(convertToVolFormat(data.lastVol));

        var rValue = $(`${rootId}`).data("r");
        var changeValue = `${data.lastPrice < rValue ? "-" + data.change.toString() : data.change.toString()}`;
        var changeValuePercent = `${data.lastPrice < rValue ? "-" + data.changePc.toString() : data.changePc.toString()}`;
        setFlashHighlight(change, changeValue);
        $(change).text(`${changeValue}`);
        $(changePc).text(`${changeValuePercent}%`);
        setColorOfElements(rootId, [symbolName, lastPrice, lastVol, change, changePc], data.lastPrice);
    }
    if (data.hasOwnProperty('hp')) {
        setFlashHighlight(highPriceId, data.hp.toString());
        $(highPriceId).text(data.hp > 0 ? data.hp.toString() : "");
        setColorOfElements(rootId, [highPriceId], data.hp);
    }
    if (data.hasOwnProperty('ap')) {
        setFlashHighlight(avePriceId, data.ap.toString());
        $(avePriceId).text(data.ap > 0 ? data.ap.toString() : "");
        setColorOfElements(rootId, [avePriceId], data.ap);
    }
    if (data.hasOwnProperty('lp')) {
        setFlashHighlight(lowPriceId, data.lp.toString());
        $(lowPriceId).text(data.lp > 0 ? data.lp.toString() : "");
        setColorOfElements(rootId, [lowPriceId], data.lp);
    }
    if (data.hasOwnProperty('totalVol')) {
        $(totalVol).text(convertToVolFormat(data.totalVol));
    }
}

function setFlashHighlight(id, value) {
    if (value === null || value === "") return;
    var orgValue = Number($(id).text());
    var newValue = Number(value);
    $(id).removeClass('highlight-yellow highlight-green highlight-red');
    setTimeout(() => {
        var hlClass = "highlight-yellow";
        if (newValue > orgValue) {
            hlClass = "highlight-green";
        } else if (newValue < orgValue) {
            hlClass = "highlight-red";
        }
        $(id).addClass(hlClass);
    }, 20);
}

function setFlashHighlightBuySell(id, value) {
    var orgValue = Number($(id).text().replaceAll(",", "."));
    var newValue = Number(value.toString().replaceAll(",", "."));
    $(id).removeClass('highlight-yellow highlight-green highlight-red');
    setTimeout(() => {
        if (newValue === orgValue) {
            return
        } else {
            var hlClass = "highlight-yellow";
            if (newValue > orgValue) {
                hlClass = "highlight-green";
            } else if (newValue < orgValue) {
                hlClass = "highlight-red";
            }
            $(id).addClass(hlClass);
        }
    }, 20);
}

function setFlashHighlightSignal(id, value) {
    var orgValue = $(id).text().toLowerCase();
    var newValue = value.toString().toLowerCase();
    $(id).removeClass('highlight-yellow highlight-green highlight-red');
    setTimeout(() => {
        if (newValue !== orgValue) {
            var hlClass = getSignalHighlightColorClass(newValue);
            $(id).addClass(hlClass);
        }
    }, 20);
}

function getSignalHighlightColorClass(signalName) {
    if (signalName.toLowerCase().indexOf("mua") > -1) {
        return "highlight-green";
    } else if (signalName.toLowerCase().indexOf("trung") > -1) {
        return "highlight-yellow";
    } else {
        return "highlight-red";
    }
}

function getSignalColorClass(signalName) {
    if (signalName.toLowerCase().indexOf("mua") > -1) {
        return "text-lime";
    } else if (signalName.toLowerCase().indexOf("trung") > -1) {
        return "text-gray";
    } else {
        return "text-red";
    }
}

function setLiveBoardTableHeight() {
    setTimeout(() => {
        var liveboardHeight = $("#live-board-table").height();
        var height = $(window).height() - $("#myTab").height() - $("#headerFixedId").height() - liveboardHeight -  $(".footer-info").height();
        $("#live-board-table").css("max-height", parseInt(liveboardHeight + height - 70) + "px");
    }, 200);
}

function setColorOfElements(rootId, ids, value) {
    var rValue = $(`${rootId}`).data("r");
    var cValue = $(`${rootId}`).data("c");
    var fValue = $(`${rootId}`).data("f");
    if (value === "ATC" || value === "ATO") {
        processSetColorByCss(ids,"#fbac20");
    } else if (value === cValue) {
        processSetColorByCss(ids,"#e683ff");
    } else if (value === fValue) {
        processSetColorByCss(ids,"#64baff");
    } else if (value > rValue) {
        processSetColorByCss(ids,"rgb(0, 244, 176)");
    } else if (value < rValue) {
        processSetColorByCss(ids,"rgb(255, 55, 71)");
    } else if (value === rValue) {
        processSetColorByCss(ids,"#fbac20");
    } else {
        processSetColorByCss(ids,"#fbac20");
    }    
}

function getColorStyle(rValue, cValue, fValue, value) {
    var color = "";
    if (value === 0) {
        color = "#fbac20";
    } else if (value === cValue) {
        color = "#e683ff";
    } else if (value === fValue) {
        color = "#64baff";
    } else if (value > rValue) {
        color = "rgb(0, 244, 176)";
    } else if (value < rValue) {
        color = "rgb(255, 55, 71)";
    } else if (value === rValue) {
        color = "#fbac20";
    } else {
        color = "#fbac20";
    }   
    return `style="color: ${color}"`; 
}

function processSetColorByCss(ids, color) {
    ids.forEach(id => {
        $(id).css("color", color);
    });
}

function convertToVolFormat(value) {
    if (value == 0) return "";
    var valueString = new Intl.NumberFormat(numberLocale).format(value*10);
    return valueString.slice(0, valueString.length -1);
}

function checkAtoOrAtcSession(value) {
    return (value.toString().toLowerCase() === "atc" || value.toString().toLowerCase() === "ato");
}