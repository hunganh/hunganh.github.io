var filterOptionC, filterOptionC1, filterOptionC2, filterOptionC3, filterOptionA, filterOptionA1, filterOptionA2, filterOptionA3, filterOptionS, filterOptionS;
var arrFilterIds = ["filterOptionC", "filterOptionC1", "filterOptionC2", "filterOptionC3", "filterOptionA", "filterOptionA1", "filterOptionA2", "filterOptionA3", "filterOptionS", "filterOptionL"]
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
        scale: 'logarithmic'
    });
    filterOptionC.on("slide slideStop", function(slideEvt) {
        $("#filterOptionCMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionCMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC1 = $("#filterOptionC1").slider({
        tooltip: 'hide',
        id: "filter-option-c1",
        scale: 'logarithmic'
    });
    filterOptionC1.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC2 = $("#filterOptionC2").slider({
        tooltip: 'hide',
        id: "filter-option-c2",
        scale: 'logarithmic'
    });
    filterOptionC2.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionC3 = $("#filterOptionC3").slider({
        tooltip: 'hide',
        id: "filter-option-c3",
        scale: 'logarithmic'
    });
    filterOptionC3.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC3MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC3MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });
    //==========================//
    filterOptionA = $("#filterOptionA").slider({
        tooltip: 'hide',
        id: "filter-option-a",
        scale: 'logarithmic'
    });
    filterOptionA.on("slide slideStop", function(slideEvt) {
        $("#filterOptionAMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionAMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA1 = $("#filterOptionA1").slider({
        tooltip: 'hide',
        id: "filter-option-a1",
        scale: 'logarithmic'
    });
    filterOptionA1.on("slide slideStop", function(slideEvt) {
        $("#filterOptionA1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA2 = $("#filterOptionA2").slider({
        tooltip: 'hide',
        id: "filter-option-a2",
        scale: 'logarithmic'
    });
    filterOptionA2.on("slide slideStop", function(slideEvt) {
        $("#filterOptionA2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    filterOptionA3 = $("#filterOptionA3").slider({
        tooltip: 'hide',
        id: "filter-option-a3",
        scale: 'logarithmic'
    });
    filterOptionA3.on("slide slideStop", function(slideEvt) {
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

    $(".ckFilter").change(function() {
        var $input = $(this);
        var id = $input.val();
        var index = arrFilterIds.indexOf(id);
        if (index > -1) {
            arrFilterIds.splice(index, 1);
        } else {
            arrFilterIds.push(id);
        }
        if ($input.prop( "checked")) {     
            $input.closest("div").next("span").removeClass("filter-title-default");
            $input.closest("div").next("span").addClass("filter-title");
        } else {
            $input.closest("div").next("span").removeClass("filter-title");
            $input.closest("div").next("span").addClass("filter-title-default");
        }
    });

    var timeout, interval;
    $(".btn-addition").mousedown(function() {
        var $input = $(this);
        var value = $input.next(".filter-values").val().replaceAll(".","");
        var dataId = $input.attr("data-id");
        var max = $("#"+dataId).data('sliderMax');
        if ((Number(value) + 1) >  max) {
            clearTimers();
            return;
        }
        incrementValue($input.next(".filter-values"), value);
        timeout = setTimeout(function() {
            interval = setInterval(function() {
              value = $input.next(".filter-values").val().replaceAll(".","");
              max = $("#"+dataId).data('sliderMax');
              if ((Number(value) + 1) >  max) {
                clearTimers();
                return;
              }
              incrementValue($input.next(".filter-values"), value);
            }, 50);    
        }, 300);   
    });

    $(".btn-subtraction").mousedown(function() {
        var $input = $(this);
        var value = $input.prev(".filter-values").val().replaceAll(".","");
        var dataId = $input.attr("data-id");
        var min = $("#"+dataId).data('sliderMin');
        if ((Number(value) - 1) <  min) {
            clearTimers();
            return;
        }
        decrementValue($input.prev(".filter-values"), value);
        timeout = setTimeout(function() {
            interval = setInterval(function() {
                value = $input.prev(".filter-values").val().replaceAll(".","");
                min = $("#"+dataId).data('sliderMin');
                if ((Number(value) - 1) <  min) {
                    clearTimers();
                    return;
                }
                decrementValue($input.prev(".filter-values"), value);
            }, 50);    
        }, 300);   
    });

    $(".btn-addition").on("mouseup", function() {
        setValueSlider($(this));
        clearTimers();
    });
    $(".btn-subtraction").on("mouseup", function() {
        setValueSlider($(this));
        clearTimers();
    });

    function setValueSlider($input) {
        var dataId = $input.attr("data-id");
        var minValue = Number($("#"+dataId+"MinValue").val().replaceAll(".",""));
        var maxValue =  Number($("#"+dataId+"MaxValue").val().replaceAll(".",""));
        $('#'+dataId).slider('setValue',[minValue,maxValue]);
    }

    function clearTimers() {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (interval) {
            clearInterval(interval);
        }
      }

    function incrementValue($input, value) {
        $input.val(new Intl.NumberFormat('de-DE').format(Number(value) + 1));
    }

    function decrementValue($input, value) {
        $input.val(new Intl.NumberFormat('de-DE').format(Number(value) - 1));
    }
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
    // FA - Fundamental Analysis
    var faFilter = {};
    // C
    if (arrFilterIds.indexOf(filterOptionC[0].id) > -1) {
        faFilter.NetSale_Growth_MRQ = getMinMaxValue($(filterOptionC).val(), true);
    }
    if (arrFilterIds.indexOf(filterOptionC1[0].id) > -1) {
        faFilter.Profit_Growth_MRQ = getMinMaxValue($(filterOptionC1).val(), true);
    }
    if (arrFilterIds.indexOf(filterOptionC2[0].id) > -1) {
        faFilter.Profit_Growth_MRQ_2 = getMinMaxValue($(filterOptionC2).val(), true);
    }
    if (arrFilterIds.indexOf(filterOptionC3[0].id) > -1) {
        faFilter.Profit_Growth_TTM = getMinMaxValue($(filterOptionC3).val(), true);
    }
    // A
    if (arrFilterIds.indexOf(filterOptionA[0].id) > -1) {
        faFilter.Eps_TTM = getMinMaxValue($(filterOptionA).val(), false);
    }
    if (arrFilterIds.indexOf(filterOptionA1[0].id) > -1) {
        faFilter.ME_ROE = getMinMaxValue($(filterOptionA1).val(), true);
    }
    if (arrFilterIds.indexOf(filterOptionA2[0].id) > -1) {
        faFilter.NetSale_Growth_Avg_3Y = getMinMaxValue($(filterOptionA2).val(), true);
    }
    if (arrFilterIds.indexOf(filterOptionA3[0].id) > -1) {
        faFilter.Profit_Growth_Avg_3Y = getMinMaxValue($(filterOptionA3).val(), true);
    }

    // S
    if (arrFilterIds.indexOf(filterOptionS[0].id) > -1) {
        faFilter.AvgVol3M = getMinMaxValue($(filterOptionS).val(), false);
    }

    // L
    if (arrFilterIds.indexOf(filterOptionL[0].id) > -1) {
        faFilter.RS52W = getMinMaxValue($(filterOptionL).val(), false);
    }

    // TA - Technical Analysis
    var breakUpperBoundMACDvsSignalDaily = $('#btnFilterMACDUpOption:checked').val();
    var breakLowerBoundMACDvsSignalDaily = $('#btnFilterMACDDownOption:checked').val();
    var rsi14DailyT0ValuesGreater = $('#btnFilterRSIOverBuyOption:checked').val();
    var rsi14DailyT0ValuesLess = $('#btnFilterRSIOverSellOption:checked').val();
    var breakUpperBoundUpperBandsDaily = $('#btnFilterBollingerUpperBandOption:checked').val();
    var breakLowerBoundLowerBandsDaily = $('#btnFilterBollingerLowerBandOption:checked').val();
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
                faFilter: faFilter,
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
            $("#showFiltersData").html(res);
        }).fail(function (jqXHR, textStatus, error) {
            $("#showFiltersData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

function getTickerCode(codes) {
    var selfBusinessChecked = $('#btnFilterSelfBusinessOption:checked').val();
    var foreignChecked = $('#btnFilterForeignOption:checked').val();
    var periodType = $("input[name='btnFiltersPeriodRadio']:checked").val();
    if (!selfBusinessChecked && !foreignChecked) return codes;
    if (selfBusinessChecked) {
        var selfBusinessData = summaryDataJson.selfBusiness[periodType][actionSummaryDefault];
        var selfBusinessCodes = selfBusinessData.map(x => x.ticker);
        codes = codes.filter(x => selfBusinessCodes.indexOf(x) !== -1);
    }
    if (foreignChecked) {
        var foreignData = summaryDataJson.foreign[periodType][actionSummaryDefault];
        var foreignCodes = foreignData.map(x => x.ticker);
        codes = codes.filter(x => foreignCodes.indexOf(x) !== -1);
    }
    return codes;
}


