window.chartsJS = {
    technicalAnalysics : function () {
        $("#accordionTAChart").find(".collapse").collapse('hide');
        $("#showTechnicalAnalysisContent").css("height", "200px");
        var loadingHTML = window.commonJS.getLoadingHTML();
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
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbUpSMA20, candleStickType));
        }
        var climbUpSMA50 = $('#btnFilterSMA50UpChartOption:checked').val();
        if (climbUpSMA50) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbUpSMA50, candleStickType));
        }
        var climbUpSMA200 = $('#btnFilterSMA200UpChartOption:checked').val();
        if (climbUpSMA200) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbUpSMA200, candleStickType));
        }
        var climbDownSMA20 = $('#btnFilterSMA20DownChartOption:checked').val();
        if (climbDownSMA20) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbDownSMA20, candleStickType));
        }
        var climbDownSMA50 = $('#btnFilterSMA50DownChartOption:checked').val();
        if (climbDownSMA50) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbDownSMA50, candleStickType));
        }
        var climbDownSMA200 = $('#btnFilterSMA200DownChartOption:checked').val();
        if (climbDownSMA200) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(climbDownSMA200, candleStickType));
        }
        var breakUpperBoundSMA20vsSMA50 = $('#btnFilterSMA20UpSMA50ChartOption:checked').val();
        if (breakUpperBoundSMA20vsSMA50) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundSMA20vsSMA50, candleStickType));
        }
        var breakUpperBoundSMA50vsSMA200 = $('#btnFilterSMA50UpSMA200ChartOption:checked').val();
        if (breakUpperBoundSMA50vsSMA200) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundSMA50vsSMA200, candleStickType));
        }
        var breakLowerBoundSMA20vsSMA50 = $('#btnFilterSMA20DownSMA50ChartOption:checked').val();
        if (breakLowerBoundSMA20vsSMA50) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundSMA20vsSMA50, candleStickType));
        }
        var breakLowerBoundSMA50vsSMA200 = $('#btnFilterSMA50DownSMA200ChartOption:checked').val();
        if (breakLowerBoundSMA50vsSMA200) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundSMA50vsSMA200, candleStickType));
        }
        var sMA20vsSMA50 = $('#btnFilterSMA20CompareSMA50ChartOption:checked').val();
        if (sMA20vsSMA50) {
            compareResultOfTwoSMAs[window.commonJS.getValueByCandleStickType(sMA20vsSMA50, candleStickType)] = $( "select#btnFilterSMA20CompareSMA50ChartSelection option:checked" ).val();;
        }
        var sMA50vsSMA200 = $('#btnFilterSMA50CompareSMA200ChartOption:checked').val();
        if (sMA50vsSMA200) {
            compareResultOfTwoSMAs[window.commonJS.getValueByCandleStickType(sMA50vsSMA200, candleStickType)] = $( "select#btnFilterSMA50CompareSMA200ChartSelection option:checked" ).val();;
        }
        if (compareResultOfTwoSMAs !== null) {
            taFilter.compareResultOfTwoSMAs = compareResultOfTwoSMAs;
        }
    
        // ICHIMOKU
        var breakUpperBoundTenkan = $('#btnFilterTenkanUpChartOption:checked').val();
        if (breakUpperBoundTenkan) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundTenkan, candleStickType));
        }
        var breakUpperBoundKijun = $('#btnFilterKijunUpChartOption:checked').val();
        if (breakUpperBoundKijun) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundKijun, candleStickType));
        }
        var breakUpperBoundCloud = $('#btnFilterCloudUpChartOption:checked').val();
        if (breakUpperBoundCloud) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundCloud, candleStickType));
        }
        var breakLowerBoundTenkan = $('#btnFilterTenkanDownChartOption:checked').val();
        if (breakLowerBoundTenkan) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundTenkan, candleStickType));
        }
        var breakLowerBoundKijun = $('#btnFilterKijunDownChartOption:checked').val();
        if (breakLowerBoundKijun) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundKijun, candleStickType));
        }
        var breakLowerBoundCloud = $('#btnFilterCloudDownChartOption:checked').val();
        if (breakLowerBoundCloud) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundCloud, candleStickType));
        }
    
        // MACD
        var breakUpperBoundMACDvsSignal = $('#btnFilterMACDUpChartOption:checked').val();
        if (breakUpperBoundMACDvsSignal) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundMACDvsSignal, candleStickType));
        }
        var breakLowerBoundMACDvsSignal = $('#btnFilterMACDDownChartOption:checked').val();
        if (breakLowerBoundMACDvsSignal) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundMACDvsSignal, candleStickType));
        }
    
        // RSI
        var rsi14T0ValuesGreater = $('#btnFilterRSIOverBuyChartOption:checked').val();
        if (rsi14T0ValuesGreater) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(rsi14T0ValuesGreater, candleStickType));
        }
        var rsi14T0ValuesLess = $('#btnFilterRSIOverSellChartOption:checked').val();
        if (rsi14T0ValuesLess) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(rsi14T0ValuesLess, candleStickType));
        }
        var rSI14T0Values = $('#btnFilterRSIRangeValueChartOption:checked').val();
        if (rSI14T0Values) {
            var optionValue = $( "select#btnFilterRSIRangeValueChartOptionSelection option:checked" ).val();
            var key = optionValue.slice(0,optionValue.length - 3);
            var value = optionValue.slice(optionValue.length - 2);
            taFilter.filterByKeyAndValues[window.commonJS.getValueByCandleStickType(key, candleStickType)] = parseInt(value);
        }
    
        // Bollinger Band
        var breakUpperBoundUpperBands = $('#btnFilterBollingerUpperBandChartOption:checked').val();
        var breakLowerBoundLowerBands = $('#btnFilterBollingerLowerBandChartOption:checked').val();
        if (breakUpperBoundUpperBands) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakUpperBoundUpperBands, candleStickType));
        }
        if (breakLowerBoundLowerBands) {
            filterByKeys.push(window.commonJS.getValueByCandleStickType(breakLowerBoundLowerBands, candleStickType));
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
            var URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V2_URL}${window.apiUrlDefined.FIALDA_STOCK_FILTERS_PATH}`);
            var res = headTAData;
            $.ajax({
                url: `${window.apiUrlDefined.CORS_PROXY_URL}/${URL}`,
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
                                var stockInfo = window.stockData.find(x => x.symbol === item);
                                res += `<tr class="tr-cursor" onclick=window.chartsJS.generateChartIframe("${item}")>
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
                window.chartsJS.setTATableHeight();
            }).fail(function (jqXHR, textStatus, error) {
                $("#showTechnicalAnalysisContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
            });
        }, 100);
    },
    
    setTATableHeight : function () {
        setTimeout(() => {
            var height = $(window).height() - $("#accordionTAChart").height() - 100;
            $("#showTechnicalAnalysisContent").css("height", parseInt(height) + "px");
        }, 200);
    },
      
    generateChartIframe : function (symbol) {
        $(".chartContainer").html(`</br>${window.commonJS.getLoadingHTML()}`);
        setTimeout(() => {
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
}

document.addEventListener("DOMContentLoaded", function(e) { 
    window.chartsJS.generateChartIframe("VNINDEX");
    var chartFielsSelections = window.commonJS.getSelectionFieldsHTML("chart-fields-selection-options");
    $("#chart-fields-selection").html(chartFielsSelections);
    $(window).resize(function() {
        $("#ifrTACharts").css("height", parseInt($(window).height()-50) + "px");
        window.chartsJS.setTATableHeight();
    });
    $("#accordionTAChart").click(function() {
        window.chartsJS.setTATableHeight();
    });
});