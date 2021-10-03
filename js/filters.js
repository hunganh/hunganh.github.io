var filterOptionC, filterOptionC1, filterOptionC2, filterOptionC3, filterOptionA, filterOptionA1, filterOptionA2, filterOptionA3, filterOptionS, filterOptionS;
var headFiltersData = `<table class="left-position table table-bordered table-striped table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>    
                                    <th>Mã CP</th>
                                    <th>Tên Doanh Nghiệp</th>
                                    <th>Sàn CK</th>
                                </tr>          
                            </thead>
                            <tbody>`;
var filtersDataJson = null;
$(document).ready(function () {
    var fielsSelections = getSelectionFieldsHTML("fields-selection-options");
    $("#fields-selection").html(fielsSelections);
    filterOptionC = $("#filterOptionC").slider({
        tooltip: 'hide',
        id: "filter-option-c",
        scale: 'logarithmic',
    });
    filterOptionC.on("slide", function(slideEvt) {
        $("#filterOptionCMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionCMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC1 = $("#filterOptionC1").slider({
        tooltip: 'hide',
        id: "filter-option-c1",
        scale: 'logarithmic'
    });
    filterOptionC1.on("slide", function(slideEvt) {
        $("#filterOptionC1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC2 = $("#filterOptionC2").slider({
        tooltip: 'hide',
        id: "filter-option-c2",
        scale: 'logarithmic'
    });
    filterOptionC2.on("slide", function(slideEvt) {
        $("#filterOptionC2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC3 = $("#filterOptionC3").slider({
        tooltip: 'hide',
        id: "filter-option-c3",
        scale: 'logarithmic'
    });
    filterOptionC3.on("slide", function(slideEvt) {
        $("#filterOptionC3MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC3MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });
    //==========================//
    filterOptionA = $("#filterOptionA").slider({
        tooltip: 'hide',
        id: "filter-option-a",
        scale: 'logarithmic'
    });
    filterOptionA.on("slide", function(slideEvt) {
        $("#filterOptionAMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionAMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA1 = $("#filterOptionA1").slider({
        tooltip: 'hide',
        id: "filter-option-a1",
        scale: 'logarithmic'
    });
    filterOptionA1.on("slide", function(slideEvt) {
        $("#filterOptionA1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA2 = $("#filterOptionA2").slider({
        tooltip: 'hide',
        id: "filter-option-a2",
        scale: 'logarithmic'
    });
    filterOptionA2.on("slide", function(slideEvt) {
        $("#filterOptionA2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA3 = $("#filterOptionA3").slider({
        tooltip: 'hide',
        id: "filter-option-a3",
        scale: 'logarithmic'
    });
    filterOptionA3.on("slide", function(slideEvt) {
        $("#filterOptionA3MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA3MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    //==========================//    
    filterOptionS = $("#filterOptionS").slider({
        tooltip: 'hide',
        id: "filter-option-s",
        scale: 'logarithmic'
    });
    filterOptionS.on("slide", function(slideEvt) {
        $("#filterOptionSMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionSMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    //==========================//
    filterOptionL = $("#filterOptionL").slider({
        tooltip: 'hide',
        id: "filter-option-l"
    });
    filterOptionL.on("slide", function(slideEvt) {
        $("#filterOptionLMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionLMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });
});

function getMinMaxValue(values, isDivide) {
    if (!values) return {};
    var items = values.split(",").map(x => Number(x));
    if (isDivide) {
        return { min: items[0] !== null ? items[0]/100: 0, max: items[1] !== null ? items[1]/100: 0 };
    } else {
        return { min: items[0] !== null ? items[0]: 0, max: items[1] !== null ? items[1]: 0 };
    }
}

function filterData() {
    var loadingHTML = getLoadingHTML();
    // Basic
    var exchanges = [];
    var hsx = $('#btnFilterHSXOption:checked').val();
    var hnx = $('#btnFilterHNXOption:checked').val();
    var upcom = $('#btnFilterUPCOption:checked').val();
    if (hsx) {
        exchanges.push(hsx);
    }
    if (hnx) {
        exchanges.push(hnx);
    }
    if (upcom) {
        exchanges.push(upcom);
    }

    var fielSelection = $('#fields-selection-options').val();
    // FA
    var netSaleGrowthMRQ = getMinMaxValue($(filterOptionC).val(), true);
    var profitGrowthMRQ = getMinMaxValue($(filterOptionC1).val(), true);
    var profitGrowthMRQ2 = getMinMaxValue($(filterOptionC2).val(), true);
    var profitGrowthTTM = getMinMaxValue($(filterOptionC3).val(), true);
    var epsTTM = getMinMaxValue($(filterOptionA).val(), false);
    var roe = getMinMaxValue($(filterOptionA1).val(), true);
    var netSaleGrowthAvg3Y = getMinMaxValue($(filterOptionA2).val(), true);
    var profitGrowthAvg3Y = getMinMaxValue($(filterOptionA3).val(), true);
    var avgVol3M = getMinMaxValue($(filterOptionS).val(), false);
    var rs52W = getMinMaxValue($(filterOptionL).val(), false);

    // TA
    var breakUpperBoundMACDvsSignalDaily = $('#btnFilterMACDUpOption:checked').val();
    var breakLowerBoundMACDvsSignalDaily = $('#btnFilterMACDDownOption:checked').val();
    var rsi14DailyT0ValuesGreater = $('#btnFilterRSIOverBuyOption:checked').val();
    var rsi14DailyT0ValuesLess = $('#btnFilterRSIOverSellOption:checked').val();
    var breakUpperBoundUpperBandsDaily = $('#btnFilterBollingerUpperBandOption:checked').val();
    var breakLowerBoundLowerBandsDaily = $('#btnFilterBollingerLowerBandOption:checked').val();

    var taFilter = { filterByKeys:[], filterByKeyAndValues: {}, compareResultOfTwoSMAs: null }
    var filterByKeys = [];
    if (breakUpperBoundMACDvsSignalDaily) {
        filterByKeys.push(breakUpperBoundMACDvsSignalDaily);
    }
    if (breakLowerBoundMACDvsSignalDaily) {
        filterByKeys.push(breakLowerBoundMACDvsSignalDaily);
    }
    if (rsi14DailyT0ValuesGreater) {
        filterByKeys.push(rsi14DailyT0ValuesGreater);
    }
    if (rsi14DailyT0ValuesLess) {
        filterByKeys.push(rsi14DailyT0ValuesLess);
    }
    if (breakUpperBoundUpperBandsDaily) {
        filterByKeys.push(breakUpperBoundUpperBandsDaily);
    }
    if (breakLowerBoundLowerBandsDaily) {
        filterByKeys.push(breakLowerBoundLowerBandsDaily);
    }
    taFilter.filterByKeys = filterByKeys;

    var booleanFilter = { 
        AvailableForFASearching: true,
        Has5ConsecutiveTradingDays: true,
        Has10ConsecutiveTradingDays: true 
    }
    var btnFilterOverTop = $('#btnFilterOverTop:checked').val();
    if (btnFilterOverTop) {
        booleanFilter[btnFilterOverTop] = true;
    }
    var data = {
                faFilter: {
                    AvgVol3M: avgVol3M,
                    Eps_TTM: epsTTM,
                    ME_ROE: roe,
                    RS52W: rs52W,
                    NetSale_Growth_MRQ: netSaleGrowthMRQ,
                    NetSale_Growth_Avg_3Y: netSaleGrowthAvg3Y,
                    Profit_Growth_MRQ: profitGrowthMRQ,
                    Profit_Growth_MRQ_2: profitGrowthMRQ2,
                    Profit_Growth_TTM: profitGrowthTTM,
                    Profit_Growth_Avg_3Y: profitGrowthAvg3Y                
                },
                taFilter: taFilter,
                booleanFilter: booleanFilter,
                pageNumber: 1,
                pageSize: 10000,
                exchanges: exchanges,
                icbCodes: (fielSelection !== "null" ? [fielSelection] : null),
                sortColumn: "Symbol",
                isDesc: false,
                };
    $("#showFiltersData").html(`</br>${loadingHTML}`);
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_STOCK_FILTERS_PATH}`);
        var res = headFiltersData;
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
                    var tickerCodes = getTickerCode(response.result.items);
                    if (tickerCodes.length > 0) {
                        var index = 0;
                        tickerCodes.forEach(item => {
                            var stockInfo = stockData.find(x => x.symbol === item);
                            res += `<tr class="tr-cursor" onclick=showTickerInfor("${item}")>
                                        <td>${index + 1}</td>
                                        <td class="bold-text">${item}</td>
                                        <td class="text-left">${stockInfo !== null ? stockInfo.name : ""}</td>
                                        <td>${stockInfo !== null ? stockInfo.exchange : ""}</td>
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
                res += `<tr><td>Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
            }
            res += `</tbody></table>`;
            $("#showFiltersData").html(res);
        }).fail(function (jqXHR, textStatus, error) {
            $("#showFiltersData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

function getTickerCode(codes) {
    var selfBusinessChecked = $('#btnFilterSelfBusinessOption:checked').val();
    var foreignChecked = $('#btnFilterForeignOption:checked').val();
    if (!selfBusinessChecked && !foreignChecked) return codes;
    if (selfBusinessChecked) {
        var selfBusinessData = summaryDataJson.selfBusiness["yearToDate"][actionSummaryDefault];
        var selfBusinessCodes = selfBusinessData.map(x => x.ticker);
        codes = codes.filter(x => selfBusinessCodes.indexOf(x) !== -1);
    }
    if (foreignChecked) {
        var foreignData = summaryDataJson.foreign["yearToDate"][actionSummaryDefault];
        var foreignCodes = foreignData.map(x => x.ticker);
        codes = codes.filter(x => foreignCodes.indexOf(x) !== -1);
    }
    return codes;
}
