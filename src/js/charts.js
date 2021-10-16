$(document).ready(function(){
    generateChartIframe("VNINDEX");
    var chartFielsSelections = getSelectionFieldsHTML("chart-fields-selection-options");
    $("#chart-fields-selection").html(chartFielsSelections);
    $(window).resize(function() {
        $("#ifrTACharts").css("height", parseInt($(window).height()-50) + "px");
        setTATableHeight();
    });
});

function technicalAnalysics() {
    $("#accordionTAChart").find(".collapse").collapse('hide');
    $("#showTechnicalAnalysisContent").css("height", "200px");
    var loadingHTML = getLoadingHTML();
    // Exchange & Fields
    var exchanges = [];
    var hsx = $('#btnFilterHSXChartOption:checked').val();
    var hnx = $('#btnFilterHNXChartOption:checked').val();
    var upcom = $('#btnFilterUPCChartOption:checked').val();
    if (hsx) {
        exchanges.push(hsx);
    }
    if (hnx) {
        exchanges.push(hnx);
    }
    if (upcom) {
        exchanges.push(upcom);
    }

    var fielSelection = $('#chart-fields-selection-options').val();
    var icbCodes = (fielSelection !== "null" ? [fielSelection] : null);

    // Candle Stick
    var candleStickType = $("input[name='btnCandleStickTAOption']:checked").val();
    

    // TA - Technical Analysis
    var taFilter = { filterByKeys:[], filterByKeyAndValues: {}, compareResultOfTwoSMAs: null };
    var filterByKeys = [];
    var compareResultOfTwoSMAs = {};
    var booleanFilter = { 
        AvailableForFASearching: true,
        Has5ConsecutiveTradingDays: true,
        Has10ConsecutiveTradingDays: true 
    };
    // SMA
    var climbUpSMA20 = $('#btnFilterSMA20UpChartOption:checked').val();
    if (climbUpSMA20) {
        filterByKeys.push(getValueByCandleStickType(climbUpSMA20, candleStickType));
    }
    var climbUpSMA50 = $('#btnFilterSMA50UpChartOption:checked').val();
    if (climbUpSMA50) {
        filterByKeys.push(getValueByCandleStickType(climbUpSMA50, candleStickType));
    }
    var climbUpSMA200 = $('#btnFilterSMA200UpChartOption:checked').val();
    if (climbUpSMA200) {
        filterByKeys.push(getValueByCandleStickType(climbUpSMA200, candleStickType));
    }
    var climbDownSMA20 = $('#btnFilterSMA20DownChartOption:checked').val();
    if (climbDownSMA20) {
        filterByKeys.push(getValueByCandleStickType(climbDownSMA20, candleStickType));
    }
    var climbDownSMA50 = $('#btnFilterSMA50DownChartOption:checked').val();
    if (climbDownSMA50) {
        filterByKeys.push(getValueByCandleStickType(climbDownSMA50, candleStickType));
    }
    var climbDownSMA200 = $('#btnFilterSMA200DownChartOption:checked').val();
    if (climbDownSMA200) {
        filterByKeys.push(getValueByCandleStickType(climbDownSMA200, candleStickType));
    }
    var breakUpperBoundSMA20vsSMA50 = $('#btnFilterSMA20UpSMA50ChartOption:checked').val();
    if (breakUpperBoundSMA20vsSMA50) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundSMA20vsSMA50, candleStickType));
    }
    var breakUpperBoundSMA50vsSMA200 = $('#btnFilterSMA50UpSMA200ChartOption:checked').val();
    if (breakUpperBoundSMA50vsSMA200) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundSMA50vsSMA200, candleStickType));
    }
    var breakLowerBoundSMA20vsSMA50 = $('#btnFilterSMA20DownSMA50ChartOption:checked').val();
    if (breakLowerBoundSMA20vsSMA50) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundSMA20vsSMA50, candleStickType));
    }
    var breakLowerBoundSMA50vsSMA200 = $('#btnFilterSMA50DownSMA200ChartOption:checked').val();
    if (breakLowerBoundSMA50vsSMA200) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundSMA50vsSMA200, candleStickType));
    }
    var sMA20vsSMA50 = $('#btnFilterSMA20CompareSMA50ChartOption:checked').val();
    if (sMA20vsSMA50) {
        compareResultOfTwoSMAs[getValueByCandleStickType(sMA20vsSMA50, candleStickType)] = $( "select#btnFilterSMA20CompareSMA50ChartSelection option:checked" ).val();;
    }
    var sMA50vsSMA200 = $('#btnFilterSMA50CompareSMA200ChartOption:checked').val();
    if (sMA50vsSMA200) {
        compareResultOfTwoSMAs[getValueByCandleStickType(sMA50vsSMA200, candleStickType)] = $( "select#btnFilterSMA50CompareSMA200ChartSelection option:checked" ).val();;
    }
    if (compareResultOfTwoSMAs !== null) {
        taFilter.compareResultOfTwoSMAs = compareResultOfTwoSMAs;
    }

    // ICHIMOKU
    var breakUpperBoundTenkan = $('#btnFilterTenkanUpChartOption:checked').val();
    if (breakUpperBoundTenkan) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundTenkan, candleStickType));
    }
    var breakUpperBoundKijun = $('#btnFilterKijunUpChartOption:checked').val();
    if (breakUpperBoundKijun) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundKijun, candleStickType));
    }
    var breakUpperBoundCloud = $('#btnFilterCloudUpChartOption:checked').val();
    if (breakUpperBoundCloud) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundCloud, candleStickType));
    }
    var breakLowerBoundTenkan = $('#btnFilterTenkanDownChartOption:checked').val();
    if (breakLowerBoundTenkan) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundTenkan, candleStickType));
    }
    var breakLowerBoundKijun = $('#btnFilterKijunDownChartOption:checked').val();
    if (breakLowerBoundKijun) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundKijun, candleStickType));
    }
    var breakLowerBoundCloud = $('#btnFilterCloudDownChartOption:checked').val();
    if (breakLowerBoundCloud) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundCloud, candleStickType));
    }

    // MACD
    var breakUpperBoundMACDvsSignal = $('#btnFilterMACDUpChartOption:checked').val();
    if (breakUpperBoundMACDvsSignal) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundMACDvsSignal, candleStickType));
    }
    var breakLowerBoundMACDvsSignal = $('#btnFilterMACDDownChartOption:checked').val();
    if (breakLowerBoundMACDvsSignal) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundMACDvsSignal, candleStickType));
    }

    // RSI
    var rsi14T0ValuesGreater = $('#btnFilterRSIOverBuyChartOption:checked').val();
    if (rsi14T0ValuesGreater) {
        filterByKeys.push(getValueByCandleStickType(rsi14T0ValuesGreater, candleStickType));
    }
    var rsi14T0ValuesLess = $('#btnFilterRSIOverSellChartOption:checked').val();
    if (rsi14T0ValuesLess) {
        filterByKeys.push(getValueByCandleStickType(rsi14T0ValuesLess, candleStickType));
    }
    var rSI14T0Values = $('#btnFilterRSIRangeValueChartOption:checked').val();
    if (rSI14T0Values) {
        var optionValue = $( "select#btnFilterRSIRangeValueChartOptionSelection option:checked" ).val();
        var key = optionValue.slice(0,optionValue.length - 3);
        var value = optionValue.slice(optionValue.length - 2);
        taFilter.filterByKeyAndValues[getValueByCandleStickType(key, candleStickType)] = parseInt(value);
    }

    // Bollinger Band
    var breakUpperBoundUpperBands = $('#btnFilterBollingerUpperBandChartOption:checked').val();
    var breakLowerBoundLowerBands = $('#btnFilterBollingerLowerBandChartOption:checked').val();
    if (breakUpperBoundUpperBands) {
        filterByKeys.push(getValueByCandleStickType(breakUpperBoundUpperBands, candleStickType));
    }
    if (breakLowerBoundLowerBands) {
        filterByKeys.push(getValueByCandleStickType(breakLowerBoundLowerBands, candleStickType));
    }
    
    taFilter.filterByKeys = filterByKeys;

    // Other
    var btnChartOverTop = $('#btnChartOverTop:checked').val();
    if (btnChartOverTop) {
        booleanFilter[btnChartOverTop] = true;
    }

    // Data Object
    var data = {
                faFilter: null,
                taFilter: taFilter,
                booleanFilter: booleanFilter,
                pageNumber: 1,
                pageSize: 10000,
                exchanges: exchanges,
                icbCodes: icbCodes,
                sortColumn: "Symbol",
                isDesc: false,
                };
     var headTAData = `<table class="table table-bordered table-striped table-hover fixTableHead">
                <thead class="table-light">
                    <tr>
                        <th>#</th> 
                        <th>Mã</th>
                        <th>Tên Doanh Nghiệp</th>
                        <th>Sàn</th>
                    </tr>          
                </thead>
                <tbody>`;
    $("#showTechnicalAnalysisContent").html(`</br>${loadingHTML}`);
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_STOCK_FILTERS_PATH}`);
        var res = headTAData;
        $.ajax({
            url: `${CORS_PROXY_URL}/${URL}`,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "content-type": "application/json;charset=UTF-8" // Or add this line
            }
        }).done(function (response) {
            if (response && response.result) {
                if (response.result.items.length > 0) {
                    var tickerCodes = response.result.items;
                    if (tickerCodes.length > 0) {
                        var index = 0;
                        tickerCodes.forEach(item => {
                            var stockInfo = stockData.find(x => x.symbol === item);
                            res += `<tr class="tr-cursor" onclick=generateChartIframe("${item}")>
                                        <td>${index + 1}</td>
                                        <td class="bold-text">${item}</td>
                                        <td class="text-left">${stockInfo && stockInfo.name !== undefined ? stockInfo.name : ""}</td>
                                        <td>${stockInfo && stockInfo.exchange !== undefined ? stockInfo.exchange : ""}</td>
                                    </tr>`;
                            index++;
                        });
                    } else {
                        res += `<tr><td colspan="4" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>`;
                    }
                } else {
                    res += `<tr><td colspan="4" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>`;
                }
            } else {
                res += `<tr><td colspan="4">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
            }
            res += `</tbody></table>`;
            $("#showTechnicalAnalysisContent").html(res);
            // var width = (parseInt($("#accordionTAChart").width())) + "px";
            // $("#showTechnicalAnalysisContent").css("width", width);
            setTATableHeight();
        }).fail(function (jqXHR, textStatus, error) {
            $("#showTechnicalAnalysisContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

$("#accordionTAChart").click(function() {
    setTATableHeight();
});

function setTATableHeight() {
    setTimeout(() => {
        var height = $(window).height() - $("#accordionTAChart").height() - 100;
        $("#showTechnicalAnalysisContent").css("height", parseInt(height) + "px");
    }, 200);
}


// function showTAChart(symbol) {
//     var scr = `https://chart.vps.com.vn/tv/?symbol=${symbol.toUpperCase()}&allowFullscreen=true&resolution=1D&lang=vi&u=375126&s=c8935171-138f-42fb-85bf-d8913e722b14&theme=Light&logo=none" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height: 93vh;`;
//     $('#ifrTACharts').attr('src', scr);
// }


function generateChartIframe(symbol) {
    $(".chartContainer").html(`</br>${getLoadingHTML()}`);
    setTimeout(() => {
        // var charts = `<iframe id="ifrTACharts" src="${CHART_URL_V1}?symbol=${symbol}&allowFullscreen=true&resolution=1D&lang=vi" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height: 93vh;"></iframe>`;
        var candleStickType = $("input[name='btnCandleStickTAOption']:checked").val();
        var type = "";
        if (candleStickType === "_15m") {
            type = "15";
        }
        else if (candleStickType === "Hourly") {
            type = "60";
        }
        else if (candleStickType === "Daily") {
            type = "1D";
        }
        else if (candleStickType === "Weekly") {
            type = "1W";
        }
        var height = $(window).height() - 50;
        var charts = `<iframe id="ifrTACharts" src="tv-chart.html?symbol=${symbol}&allowFullscreen=true&resolution=${type}&lang=vi" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen="" style="display: block; width: 100%; height:${height}px"></iframe>`;
        
        $(".chartContainer").html(charts);
    }, 500);
}