var filterOptionC, filterOptionC1, filterOptionC2, filterOptionC3, filterOptionA, filterOptionA1, filterOptionA2, filterOptionA3, filterOptionS, filterOptionS;
$(document).ready(function () {
    var fielsSelections = getSelectionFieldsHTML("fields-selection-options");
    $("#fields-selection").html(fielsSelections);
    filterOptionC = $("#filterOptionC").slider({
        tooltip: 'always',
        id: "filter-option-c",
        scale: 'logarithmic',
    });
    filterOptionC1 = $("#filterOptionC1").slider({
        tooltip: 'always',
        id: "filter-option-c1",
        scale: 'logarithmic'
    });
    filterOptionC2 = $("#filterOptionC2").slider({
        tooltip: 'always',
        id: "filter-option-c2",
        scale: 'logarithmic'
    });
    filterOptionC3 = $("#filterOptionC3").slider({
        tooltip: 'always',
        id: "filter-option-c3",
        scale: 'logarithmic'
    });
    //==========================//
    filterOptionA = $("#filterOptionA").slider({
        tooltip: 'always',
        id: "filter-option-a",
        scale: 'logarithmic'
    });
    filterOptionA1 = $("#filterOptionA1").slider({
        tooltip: 'always',
        id: "filter-option-a1",
        scale: 'logarithmic'
    });
    filterOptionA2 = $("#filterOptionA2").slider({
        tooltip: 'always',
        id: "filter-option-a2",
        scale: 'logarithmic'
    });
    filterOptionA3 = $("#filterOptionA3").slider({
        tooltip: 'always',
        id: "filter-option-a3",
        scale: 'logarithmic'
    });
    //==========================//    
    filterOptionS = $("#filterOptionS").slider({
        tooltip: 'always',
        id: "filter-option-s",
        scale: 'logarithmic'
    });
    //==========================//
    filterOptionL = $("#filterOptionL").slider({
        tooltip: 'always',
        id: "filter-option-l"
    });
});

var headFiltersData = `<table class="left-position table table-bordered table-striped table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>#</th>    
                                    <th>Mã CP</th>
                                </tr>          
                            </thead>
                            <tbody>`;
var filtersDataJson = null;
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

    var taFilter = { filterByKeys:[], filterByKeyAndValues: {}, compareResultOfTwoSMAs: null }
    var filterByKeys = [];
    if (breakUpperBoundMACDvsSignalDaily) {
        filterByKeys.push(breakUpperBoundMACDvsSignalDaily);
    }
    if (breakLowerBoundMACDvsSignalDaily) {
        filterByKeys.push(breakLowerBoundMACDvsSignalDaily);
    }
    taFilter.filterByKeys = filterByKeys;

    if (!rsi14DailyT0ValuesGreater && !rsi14DailyT0ValuesLess) {
        taFilter.filterByKeyAndValues = null;
    } else {       
        if (rsi14DailyT0ValuesGreater) {
            taFilter.filterByKeyAndValues[rsi14DailyT0ValuesGreater] = 70;
        }
        if (rsi14DailyT0ValuesLess) {
            taFilter.filterByKeyAndValues[rsi14DailyT0ValuesLess] = 30;
        }
    }

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
                            res += `<tr class="tr-cursor" onclick=showTickerInfor("${item}")><td>${index + 1}</td><td class="bold-text">${item}</td></tr>`;
                            index++;
                        });
                    } else {
                        res += `<tr><td colspan="2" class="bold-text">Không có mã nào thỏa tiêu chí.</td></tr>`;
                    }
                } else {
                    res += `<tr><td colspan="2" class="bold-text">Không có mã nào thỏa tiêu chí.</td></tr>`;
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