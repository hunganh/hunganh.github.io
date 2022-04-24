window.fieldsJS = {
    loadFieldsData : function () {
        window.variablesJS.sortFieldDefault = "changePercent1D";
        var loadingHTML = window.commonJS.getLoadingHTML();
        $("#showFieldsData").html(`</br>${loadingHTML}`);
        setTimeout(() => {
            var URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V1_URL}${window.apiUrlDefined.FIALDA_GET_FIELDS_REPORT_PATH}`);
            var res = window.variablesJS.headFields;
            $.ajax({
                url: `${window.apiUrlDefined.CORS_PROXY_URL}/${URL}`,
                async: false,
                dataType: "json"
            }).done(function (response) {
                if (response && response.result) {
                    window.variablesJS.fieldsDataJson = response;
                    res += window.fieldsJS.processFieldsDataInput("changePercent1D", "desc");
                } else {
                    res += `<tr><td colspan="12">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
                }
                res += `</tbody></table>`;
                $("#showFieldsData").html(res);
                window.commonJS.initTooltips();
            }).fail(function (jqXHR, textStatus, error) {
                $("#showFieldsData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
            });
        }, 100);
    },
    
    processFieldsDataInput : function (sortField, sortType) {
        window.variablesJS.sortFieldDefault = sortField;
        var res = "";
        if (window.variablesJS.fieldsDataJson) {
            window.variablesJS.fieldsDataJson.result.sort(function (a, b) {
                var c = a[sortField] !== null ? a[sortField] : 0;
                var d = b[sortField] !== null ? b[sortField] : 0;
                if (sortType === "desc") {
                    return d - c;
                }
                return c-d;
            });
            window.variablesJS.fieldsDataJson.result.forEach(item => {
                var eps = $.isNumeric(item.eps_ttm) ? new Intl.NumberFormat(window.variablesJS.numberLocale).format((item.eps_ttm).toFixed(0)) : "N/A";
                var pe = $.isNumeric(item.pe) ? (item.pe).toFixed(2) : "N/A";
                var ps = $.isNumeric(item.ps) ? (item.ps).toFixed(2) : "N/A";
                var pb = $.isNumeric(item.pb) ? (item.pb).toFixed(2) : "N/A";
                var roa = $.isNumeric(item.mE_ROA) ? `${(item.mE_ROA * 100).toFixed(2)}%` : "N/A";
                var roe = $.isNumeric(item.mE_ROE) ? `${(item.mE_ROE * 100).toFixed(2)}%` : "N/A";
                var day = $.isNumeric(item.changePercent1D) ? (item.changePercent1D * 100).toFixed(2) : "0";
                var week = $.isNumeric(item.changePercent1W) ? (item.changePercent1W * 100).toFixed(2) : "N/A";
                var month_1 = $.isNumeric(item.changePercent1M) ? (item.changePercent1M * 100).toFixed(2) : "N/A";
                var month_3 = $.isNumeric(item.changePercent3M) ? (item.changePercent3M * 100).toFixed(2) : "N/A";
                var month_6 = $.isNumeric(item.changePercent6M) ? (item.changePercent6M * 100).toFixed(2) : "N/A";
                var year = $.isNumeric(item.changePercent1Y) ? (item.changePercent1Y * 100).toFixed(2) : "N/A";
                var ytd = $.isNumeric(item.changePercentYTD) ? (item.changePercentYTD * 100).toFixed(2) : "N/A";
                res += `<tr class="tr-cursor" action="collapsed" onclick="window.fieldsJS.showDetailField('${item.icbName}', '${item.icbCode}', this)">
                            <td class="text-left filter-sort"><b class="top10">${item.icbName}</b> &nbsp; <span class="sort arrow-right"></span></td>
                            <td class="top10">${eps}</td>
                            <td class="top10">${pe}</td>
                            <td class="top10">${ps}</td>
                            <td class="top10">${pb}</td>
                            <td class="top10">${roa}</td>
                            <td class="top10">${roe}</td>
                            <td class="${day > 0 ? 'up' : day < 0 ? 'down' : 'reference'} bold">${day}%</td>
                            <td class="${week > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week}%</td>
                            <td class="${month_1 > 0 ? 'up' : month_1 < 0 ? 'down' : 'reference'} bold">${month_1}%</td>
                            <td class="${month_3 > 0 ? 'up' : month_3 < 0 ? 'down' : 'reference'} bold">${month_3}%</td>
                            <td class="${month_6 > 0 ? 'up' : month_6 < 0 ? 'down' : 'reference'} bold">${month_6}%</td>
                            <td class="${year > 0 ? 'up' : year < 0 ? 'down' : 'reference'} bold">${year}%</td>
                            <td class="${ytd > 0 ? 'up' : ytd < 0 ? 'down' : 'reference'} bold">${ytd}%</td>
                        </tr>`;
            });
        } else {
            res += `<tr><td colspan="12">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
        }
        return res;
    },
    
    refreshFieldsData : function () {
        window.fieldsJS.loadFieldsData();
    },
    
    sortTable : function (time, self) {
        window.variablesJS.sortFieldType = "desc";
        var childSpan = $(self).find("span");
        if (childSpan.hasClass("desc")) {
            window.variablesJS.sortFieldType = "asc";
        }
    
        var res = window.variablesJS.headFields;
        res += window.fieldsJS.processFieldsDataInput(time, window.variablesJS.sortFieldType);
        res += `</tbody></table>`;
        $("#showFieldsData").html(res);
        window.commonJS.initTooltips();
        window.fieldsJS.removeAllSortClass();
        $("#" + time).addClass(window.variablesJS.sortFieldType);
    },
    
    removeAllSortClass : function () {
         $("span.sort").removeClass("desc");
         $("span.sort").removeClass("asc");
    },
    
    showDetailField : function (icbName, icbCode, self) {
        var contents = `<tr class="append-field-data"><td colspan="14">${window.commonJS.getLoadingHTML()}</td></tr>`;
        var action = $(self).attr("action");
        var tdFirstChild = $(self).find("td:eq(0) span");
        $(".append-field-data").remove();
        window.fieldsJS.resetFieldExpendIcon();
        $(self).after(contents);
        if (action === "collapsed") {
            tdFirstChild.removeClass("arrow-right");
            tdFirstChild.addClass("desc");
            $(self).attr("action", "expanded");
            var symbols = window.stockData.filter(x => x.icbCode === icbCode);
            // get realtime data
            var body = symbols.map(x => { let obj = {}; obj["symbol"] = x.symbol; return obj });
            $.ajax({
                url: `${window.apiUrlDefined.STOCK_INFOR_DATA_OF_FIELD_URL}`,
                method: "POST",
                data: JSON.stringify(body),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            }).done(function (response) {
                if (response && response.length > 0) {
                    response =  response.sort(function (a, b) {
                        var c = a[window.variablesJS.sortFieldDefault] !== null ? a[window.variablesJS.sortFieldDefault] : 0;
                        var d = b[window.variablesJS.sortFieldDefault] !== null ? b[window.variablesJS.sortFieldDefault] : 0;
                        if (window.variablesJS.sortFieldType === "desc") {
                            return d - c;
                        }
                        return c-d;
                    });
                    contents = "";
                    for (let i = 0; i < response.length; i++) {
                        var item = response[i] !== null ? response[i] : null;
                        if (item) {
                            var day = item.changePercent1D !== -99999999999 ? `${(item.changePercent1D).toFixed(2)}` : "0";
                            var week = item.changePercent1W !== -99999999999 ? (item.changePercent1W).toFixed(2) : "N/A";
                            var month_1 = item.changePercent1M !== -99999999999 ? (item.changePercent1M).toFixed(2) : "N/A";
                            var month_3 = item.changePercent3M !== -99999999999 ? (item.changePercent3M).toFixed(2) : "N/A";
                            var month_6 = item.changePercent6M !== -99999999999 ? (item.changePercent6M).toFixed(2) : "N/A";
                            var ytd = item.changePercentYTD !== -99999999999 ? (item.changePercentYTD).toFixed(2) : "N/A";
                            var year = item.changePercent1Y !== -99999999999 ? (item.changePercent1Y).toFixed(2) : "N/A";
                            contents += `<tr class="append-field-data tr-cursor" onclick="window.commonJS.showTickerInfor('${item.symbol}')" style="background-color: #f0f8ffb0;">
                                            <td class="bold-text">${item.symbol}</td>
                                            <td colspan="6" class="text-left">${item.name}</td>
                                            <td class="${day > 0 ? 'up' : day < 0 ? 'down' : 'reference'} bold">${day}%</td>
                                            <td class="${week > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week}%</td>
                                            <td class="${month_1 > 0 ? 'up' : month_1 < 0 ? 'down' : 'reference'} bold">${month_1}%</td>
                                            <td class="${month_3 > 0 ? 'up' : month_3 < 0 ? 'down' : 'reference'} bold">${month_3}%</td>
                                            <td class="${month_6 > 0 ? 'up' : month_6 < 0 ? 'down' : 'reference'} bold">${month_6}%</td>
                                            <td class="${year > 0 ? 'up' : year < 0 ? 'down' : 'reference'} bold">${year}%</td>
                                            <td class="${ytd > 0 ? 'up' : ytd < 0 ? 'down' : 'reference'} bold">${ytd}%</td>
                                        </tr>`;
                        }                
                    }
                    $(".append-field-data").remove();
                    $(self).after(contents);
                } else {
                    $(".append-field-data").remove();
                }
            }).fail(function (jqXHR, textStatus, error) {
                $(".append-field-data").remove();
            });
    
        } else {
            $(".append-field-data").remove();
            tdFirstChild.removeClass("desc");
            tdFirstChild.addClass("arrow-right");
            $(self).attr("action", "collapsed");
        }
        self.scrollIntoView(true);
    },
    
    resetFieldExpendIcon : function () {
        $(".filter-sort").find("span:eq(0)").removeClass("desc");
        $(".filter-sort").find("span:eq(0)").addClass("arrow-right");
    },
    
    processFielDetailData : function (icbCode) {
        $("#detailModalContent").html(`</br>${window.commonJS.getLoadingHTML()}`);
        var contents = `<table class="table table-bordered table-responsive">
                                <thead class="table-light">
                                    <tr><th>#</th><th>Mã</th><th>Tên Doanh Nghiệp</th><th>1 Tuần</th><th>2 Tuần</th><th>1 Tháng</th><th>3 Tháng</th><th>6 Tháng</th><th>YTD</th><th>1 Năm</th><th>3 Năm</th></tr>              
                                </thead>
                                <tbody>`;
        setTimeout(() => {
            var symbols = window.stockData.filter(x => x.icbCode === icbCode);
            if (symbols && symbols.length > 0) {
                for (let index = 0; index < symbols.length; index++) {
                    contents += `<tr>
                                    <td>${index + 1}</td>                
                                    <td class="top10 bold">${symbols[index].symbol}</td>
                                    <td class="text-left">${symbols[index].name}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>`;
                    
                }
            } else {
                contents += `<tr><td colspan="11">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
            }
            contents += `<tbody></table>`;
            $("#detailModalContent").html(contents);
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", function(e) { 
    window.fieldsJS.refreshFieldsData();
});

