window.filtersJS = {
    setValueSlider : function ($input) {
        var dataId = $input.attr("data-id");
        var minValue = Number($("#"+dataId+"MinValue").val().replaceAll(".",""));
        var maxValue =  Number($("#"+dataId+"MaxValue").val().replaceAll(".",""));
        $('#'+dataId).slider('setValue',[minValue,maxValue]);
    },

    clearTimers : function () {
        if (window.variablesJS.timeout) {
            clearTimeout(window.variablesJS.timeout);
        }
        if (window.variablesJS.interval) {
            clearInterval(window.variablesJS.interval);
        }
    },

    incrementValue : function ($input, value) {
        $input.val(new Intl.NumberFormat('de-DE').format(Number(value) + 1));
    },

    decrementValue : function ($input, value) {
        $input.val(new Intl.NumberFormat('de-DE').format(Number(value) - 1));
    },

    getMinMaxValue : function (values, isDivide) {
        if (!values) return {};
        var items = values.split(",").map(x => Number(x));
        if (isDivide) {
            return { min: items[0] !== null ? items[0]/100: 0, max: items[1] !== null ? items[1]/100: 0 };
        } else {
            return { min: items[0] !== null ? items[0]: 0, max: items[1] !== null ? items[1]: 0 };
        }
    },
    
    filterData : function () {
        var loadingHTML = window.commonJS.getLoadingHTML();
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
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionC[0].id) > -1) {
            faFilter.NetSale_Growth_MRQ = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionC).val(), true);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionC1[0].id) > -1) {
            faFilter.Profit_Growth_MRQ = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionC1).val(), true);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionC2[0].id) > -1) {
            faFilter.Profit_Growth_MRQ_2 = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionC2).val(), true);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionC3[0].id) > -1) {
            faFilter.Profit_Growth_TTM = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionC3).val(), true);
        }
        // A
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionA[0].id) > -1) {
            faFilter.Eps_TTM = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionA).val(), false);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionA1[0].id) > -1) {
            faFilter.ME_ROE = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionA1).val(), true);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionA2[0].id) > -1) {
            faFilter.NetSale_Growth_Avg_3Y = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionA2).val(), true);
        }
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionA3[0].id) > -1) {
            faFilter.Profit_Growth_Avg_3Y = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionA3).val(), true);
        }
    
        // S
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionS[0].id) > -1) {
            faFilter.AvgVol3M = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionS).val(), false);
        }
    
        // L
        if (window.variablesJS.arrFilterIds.indexOf(window.variablesJS.filterOptionL[0].id) > -1) {
            faFilter.RS52W = window.filtersJS.getMinMaxValue($(window.variablesJS.filterOptionL).val(), false);
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
            var res = window.variablesJS.headFiltersData;
            $.ajax({
                url: `${window.apiUrlDefined.STOCK_FILTERS_URL}`,
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    "content-type": "application/json;charset=UTF-8" // Or add this line
                }
            }).done(function (response) {
                if (response && response.length > 0) {
                    var codes = response.map(x => x.symbol);
                    codes = window.filtersJS.getTickerCode(codes);
                    if (codes.length > 0) {
                        window.variablesJS.filtersDataJson = response.filter(x => codes.indexOf(x.symbol) > -1);
                    } else {
                        window.variablesJS.filtersDataJson = [];
                    }
                    res += window.filtersJS.processFiltersDataInput("changePercent1D", "desc");
                } else {
                    res += `<tr><td colspan="12" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>`;
                }
                res += `</tbody></table>`;
                $("#showFiltersData").html(res);
                window.commonJS.initTooltips();
            }).fail(function (jqXHR, textStatus, error) {
                $("#showFiltersData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
            });
        }, 100);
    },
    
    processFiltersDataInput : function (sortField, sortType) {
        window.variablesJS.sortFiltersDefault = sortField;
        var res = "";
        if (window.variablesJS.filtersDataJson && window.variablesJS.filtersDataJson.length > 0) {
            window.variablesJS.filtersDataJson.sort(function (a, b) {
                var c = a[sortField] !== null ? a[sortField] : 0;
                var d = b[sortField] !== null ? b[sortField] : 0;
                if (sortType === "desc") {
                    return d - c;
                }
                return c-d;
            });
            index = 0;
            window.variablesJS.filtersDataJson.forEach(item => {     
                var day = item.changePercent1D !== -99999999999 ? `${(item.changePercent1D).toFixed(2)}` : "0";
                var week = item.changePercent1W !== -99999999999 ? (item.changePercent1W).toFixed(2) : "N/A";
                var month_1 = item.changePercent1M !== -99999999999 ? (item.changePercent1M).toFixed(2) : "N/A";
                var month_3 = item.changePercent3M !== -99999999999 ? (item.changePercent3M).toFixed(2) : "N/A";
                var month_6 = item.changePercent6M !== -99999999999 ? (item.changePercent6M).toFixed(2) : "N/A";
                var ytd = item.changePercentYTD !== -99999999999 ? (item.changePercentYTD).toFixed(2) : "N/A";
                var year = item.changePercent1Y !== -99999999999 ? (item.changePercent1Y).toFixed(2) : "N/A";
                var year_3 = item.changePercent3Yr !== -99999999999 ? (item.changePercent3Yr).toFixed(2) : "N/A";
                res += `<tr class="tr-cursor" onclick=window.commonJS.showTickerInfor("${item.symbol}")>
                            <td>${index + 1}</td>
                            <td class="bold-text">${item.symbol}</td>
                            <td class="text-left">${item.name}</td>
                            <td>${item.exchange}</td>
                            <td class="${day > 0 ? 'up' : day < 0 ? 'down' : 'reference'} bold">${day}%</td>
                            <td class="${week > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week}%</td>
                            <td class="${month_1 > 0 ? 'up' : month_1 < 0 ? 'down' : 'reference'} bold">${month_1}%</td>
                            <td class="${month_3 > 0 ? 'up' : month_3 < 0 ? 'down' : 'reference'} bold">${month_3}%</td>
                            <td class="${month_6 > 0 ? 'up' : month_6 < 0 ? 'down' : 'reference'} bold">${month_6}%</td>
                            <td class="${ytd > 0 ? 'up' : ytd < 0 ? 'down' : 'reference'} bold">${ytd}%</td>
                            <td class="${year > 0 ? 'up' : year < 0 ? 'down' : 'reference'} bold">${year}%</td>
                            <td class="${year_3 > 0 ? 'up' : year_3 < 0 ? 'down' : 'reference'} bold">${year_3}%</td>
                        </tr>`;
                index ++;
            });
        } else {
            res += `<tr><td colspan="12" class="bold-text">Không có mã nào thỏa mãn tiêu chí.</td></tr>`;
        }
        return res;
    },
    
    sortFiltersTable : function (time, self) {
        window.variablesJS.sortFiltersType = "desc";
        var childSpan = $(self).find("span");
        if (childSpan.hasClass("desc")) {
            window.variablesJS.sortFiltersType = "asc";
        }
    
        var res = window.variablesJS.headFiltersData;
        res += processFiltersDataInput(time, window.variablesJS.sortFiltersType);
        res += `</tbody></table>`;
        $("#showFiltersData").html(res);
        window.commonJS.initTooltips();
        window.filtersJS.removeAllSortClass();
        $("#" + time).addClass(window.variablesJS.sortFiltersType);
    },
    
    getTickerCode : function (codes) {
        var selfBusinessChecked = $('#btnFilterSelfBusinessOption:checked').val();
        var foreignChecked = $('#btnFilterForeignOption:checked').val();
        var periodType = $("input[name='btnFiltersPeriodRadio']:checked").val();
        if (!selfBusinessChecked && !foreignChecked) return codes;
        if (selfBusinessChecked) {
            var selfBusinessData = window.variablesJS.summaryDataJson.selfBusiness[periodType][variablesJS.actionSummaryDefault];
            var selfBusinessCodes = selfBusinessData.map(x => x.ticker);
            codes = codes.filter(x => selfBusinessCodes.indexOf(x) !== -1);
        }
        if (foreignChecked) {
            var foreignData = window.variablesJS.summaryDataJson.foreign[periodType][variablesJS.actionSummaryDefault];
            var foreignCodes = foreignData.map(x => x.ticker);
            codes = codes.filter(x => foreignCodes.indexOf(x) !== -1);
        }
        return codes;
    }
}



document.addEventListener("DOMContentLoaded", function(e) { 
    window.variablesJS.fielsSelections = window.commonJS.getSelectionFieldsHTML("fields-selection-options");
    $("#fields-selection").html(window.variablesJS.fielsSelections);
    window.variablesJS.filterOptionC = $("#filterOptionC").slider({
        tooltip: 'hide',
        id: "filter-option-c",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionC.on("slide slideStop", function(slideEvt) {
        $("#filterOptionCMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionCMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionC1 = $("#filterOptionC1").slider({
        tooltip: 'hide',
        id: "filter-option-c1",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionC1.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionC2 = $("#filterOptionC2").slider({
        tooltip: 'hide',
        id: "filter-option-c2",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionC2.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionC3 = $("#filterOptionC3").slider({
        tooltip: 'hide',
        id: "filter-option-c3",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionC3.on("slide slideStop", function(slideEvt) {
        $("#filterOptionC3MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionC3MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });
    //==========================//
    window.variablesJS.filterOptionA = $("#filterOptionA").slider({
        tooltip: 'hide',
        id: "filter-option-a",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionA.on("slide slideStop", function(slideEvt) {
        $("#filterOptionAMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionAMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionA1 = $("#filterOptionA1").slider({
        tooltip: 'hide',
        id: "filter-option-a1",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionA1.on("slide slideStop", function(slideEvt) {
        $("#filterOptionA1MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA1MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionA2 = $("#filterOptionA2").slider({
        tooltip: 'hide',
        id: "filter-option-a2",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionA2.on("slide slideStop", function(slideEvt) {
        $("#filterOptionA2MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA2MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    window.variablesJS.filterOptionA3 = $("#filterOptionA3").slider({
        tooltip: 'hide',
        id: "filter-option-a3",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionA3.on("slide slideStop", function(slideEvt) {
        $("#filterOptionA3MinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionA3MaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    //==========================//    
    window.variablesJS.filterOptionS = $("#filterOptionS").slider({
        tooltip: 'hide',
        id: "filter-option-s",
        scale: 'logarithmic'
    });
    window.variablesJS.filterOptionS.on("slide", function(slideEvt) {
        $("#filterOptionSMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionSMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    //==========================//
    window.variablesJS.filterOptionL = $("#filterOptionL").slider({
        tooltip: 'hide',
        id: "filter-option-l"
    });
    window.variablesJS.filterOptionL.on("slide", function(slideEvt) {
        $("#filterOptionLMinValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[0]));
        $("#filterOptionLMaxValue").val(new Intl.NumberFormat('de-DE').format(slideEvt.value[1]));
    });

    $(".ckFilter").change(function() {
        var $input = $(this);
        var id = $input.val();
        var index = window.variablesJS.arrFilterIds.indexOf(id);
        if (index > -1) {
            window.variablesJS.arrFilterIds.splice(index, 1);
        } else {
            window.variablesJS.arrFilterIds.push(id);
        }
        if ($input.prop( "checked")) {     
            $input.closest("div").next("span").removeClass("filter-title-default");
            $input.closest("div").next("span").addClass("filter-title");
        } else {
            $input.closest("div").next("span").removeClass("filter-title");
            $input.closest("div").next("span").addClass("filter-title-default");
        }
    });

    $(".btn-addition").mousedown(function() {
        var $input = $(this);
        var value = $input.next(".filter-values").val().replaceAll(".","");
        var dataId = $input.attr("data-id");
        var max = $("#"+dataId).data('sliderMax');
        if ((Number(value) + 1) >  max) {
            window.filtersJS.clearTimers();
            return;
        }
        window.filtersJS.incrementValue($input.next(".filter-values"), value);
        window.variablesJS.timeout = setTimeout(function() {
            window.variablesJS.interval = setInterval(function() {
              value = $input.next(".filter-values").val().replaceAll(".","");
              max = $("#"+dataId).data('sliderMax');
              if ((Number(value) + 1) >  max) {
                window.filtersJS.clearTimers();
                return;
              }
              window.filtersJS.incrementValue($input.next(".filter-values"), value);
            }, 50);    
        }, 300);   
    });

    $(".btn-subtraction").mousedown(function() {
        var $input = $(this);
        var value = $input.prev(".filter-values").val().replaceAll(".","");
        var dataId = $input.attr("data-id");
        var min = $("#"+dataId).data('sliderMin');
        if ((Number(value) - 1) <  min) {
            window.filtersJS.clearTimers();
            return;
        }
        window.filtersJS.decrementValue($input.prev(".filter-values"), value);
        window.variablesJS.timeout = setTimeout(function() {
            window.variablesJS.interval = setInterval(function() {
                value = $input.prev(".filter-values").val().replaceAll(".","");
                min = $("#"+dataId).data('sliderMin');
                if ((Number(value) - 1) <  min) {
                    window.filtersJS.clearTimers();
                    return;
                }
                window.filtersJS.decrementValue($input.prev(".filter-values"), value);
            }, 50);    
        }, 300);   
    });

    $(".btn-addition").on("mouseup", function() {
        window.filtersJS.setValueSlider($(this));
        window.filtersJS.clearTimers();
    });
    $(".btn-subtraction").on("mouseup", function() {
        window.filtersJS.setValueSlider($(this));
        window.filtersJS.clearTimers();
    });
});


