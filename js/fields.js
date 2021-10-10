var sortFieldDefault = "changePercent1D";
var sortFieldType = "desc";
var headFields = `<table class="left-position table table-bordered table-striped table-hover">
                    <thead class="table-light">
                        <tr>
                            <th rowspan="2">Ngành</th>
                            <th rowspan="2">EPS</th>
                            <th rowspan="2">P/E</th>
                            <th rowspan="2">P/S</th>
                            <th rowspan="2">P/B</th>
                            <th rowspan="2">ROA</th>
                            <th rowspan="2">ROE</th>
                            <th colspan="7">% Tăng/Giảm</th>
                        </tr>  
                        <tr id="sort-column">
                            <th class="tr-cursor" onclick="sortTable('changePercent1D', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 ngày">1 ngày <span id="changePercent1D" class="sort desc"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercent1W', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tuần">1 tuần <span id="changePercent1W" class="sort"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercent1M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 tháng">1 tháng <span id="changePercent1M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercent3M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 3 tháng">3 tháng <span id="changePercent3M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercent6M', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 6 tháng">6 tháng <span id="changePercent6M" class="sort"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercent1Y', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu theo 1 năm">1 năm <span id="changePercent1Y" class="sort"></span></th>
                            <th class="tr-cursor" onclick="sortTable('changePercentYTD', this)" data-bs-toggle="tooltip" data-bs-placement="top" title="Sort dữ liệu từ đầu năm đến nay">YTD <span id="changePercentYTD" class="sort"></span></th>
                        </tr>             
                    </thead>
                    <tbody>`;
var fieldsDataJson = null;
function loadFieldsData() {
    sortFieldDefault = "changePercent1D";
    var loadingHTML = getLoadingHTML();
    $("#showFieldsData").html(`</br>${loadingHTML}`);
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_FIELDS_REPORT_PATH}`);
        var res = headFields;
        $.ajax({
            url: `${CORS_PROXY_URL}/${URL}`,
            async: false,
            dataType: "json"
        }).done(function (response) {
            if (response && response.result) {
                fieldsDataJson = response;
                res += processFieldsDataInput("changePercent1D", "desc");
            } else {
                res += `<tr><td colspan="12">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
            }
            res += `</tbody></table>`;
            $("#showFieldsData").html(res);
            initTooltips();
        }).fail(function (jqXHR, textStatus, error) {
            $("#showFieldsData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

function processFieldsDataInput (sortField, sortType) {
    sortFieldDefault = sortField;
    var res = "";
    if (fieldsDataJson) {
        fieldsDataJson.result.sort(function (a, b) {
            var c = a[sortField] !== null ? a[sortField] : 0;
            var d = b[sortField] !== null ? b[sortField] : 0;
            if (sortType === "desc") {
                return d - c;
            }
            return c-d;
        });
        fieldsDataJson.result.forEach(item => {
            var eps = $.isNumeric(item.eps_TTM) ? new Intl.NumberFormat().format((item.eps_TTM).toFixed(0)) : "N/A";
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
            res += `<tr class="tr-cursor" action="collapsed" onclick="showDetailField('${item.icbName}', '${item.icbCode}', this)">
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
}

function refreshFieldsData() {
    loadFieldsData();
}

function sortTable(time, self) {
    sortFieldType = "desc";
    var childSpan = $(self).find("span");
    if (childSpan.hasClass("desc")) {
        sortFieldType = "asc";
    }

    var res = headFields;
    res += processFieldsDataInput(time, sortFieldType);
    res += `</tbody></table>`;
    $("#showFieldsData").html(res);
    initTooltips();
    removeAllSortClass();
    $("#" + time).addClass(sortFieldType);
}

function removeAllSortClass() {
     $("span.sort").removeClass("desc");
     $("span.sort").removeClass("asc");
}

function showDetailField(icbName, icbCode, self) {
    var contents = `<tr class="append-field-data"><td colspan="14">${getLoadingHTML()}</td></tr>`;
    var action = $(self).attr("action");
    var tdFirstChild = $(self).find("td:eq(0) span");
    $(".append-field-data").remove();
    resetFieldExpendIcon();
    $(self).after(contents);
    if (action === "collapsed") {
        tdFirstChild.removeClass("arrow-right");
        tdFirstChild.addClass("desc");
        $(self).attr("action", "expanded");
        var symbols = stockData.filter(x => x.icbCode === icbCode);
        // get realtime data
        var body = symbols.map(x => { let obj = {}; obj["symbol"] = x.symbol; return obj });
        $.ajax({
            url: `${STOCK_INFOR_DATA_OF_FIELD_URL}`,
            method: "POST",
            data: JSON.stringify(body),
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        }).done(function (response) {
            if (response && response.length > 0) {
                response =  response.sort(function (a, b) {
                    var c = a[sortFieldDefault] !== null ? a[sortFieldDefault] : 0;
                    var d = b[sortFieldDefault] !== null ? b[sortFieldDefault] : 0;
                    if (sortFieldType === "desc") {
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
                        contents += `<tr class="append-field-data tr-cursor" onclick="showTickerInfor('${item.symbol}')" style="background-color: #f0f8ffb0;">
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
}

function refreshFielDetailData(icbCode) {

}

function resetFieldExpendIcon() {
    $(".filter-sort").find("span:eq(0)").removeClass("desc");
    $(".filter-sort").find("span:eq(0)").addClass("arrow-right");
}

function processFielDetailData(icbCode) {
    $("#detailModalContent").html(`</br>${getLoadingHTML()}`);
    var contents = `<table class="table table-bordered table-responsive">
                            <thead class="table-light">
                                <tr><th>#</th><th>Mã</th><th>Tên Doanh Nghiệp</th><th>1 Tuần</th><th>2 Tuần</th><th>1 Tháng</th><th>3 Tháng</th><th>6 Tháng</th><th>YTD</th><th>1 Năm</th><th>3 Năm</th></tr>              
                            </thead>
                            <tbody>`;
    setTimeout(() => {
        var symbols = stockData.filter(x => x.icbCode === icbCode);
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
        // var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_STOCK_INFO_PATH}`);
        // $.ajax({
        //     url: `${CORS_PROXY_URL}/${URL}`,
        //     method: "POST",
        //     data: JSON.stringify([{ symbol: code }]),
        //     headers: {
        //         "content-type": "application/json;charset=UTF-8"
        //     }
        // }).done(function (response) {
        //     if (response && response.result) {
        //         var item = response.result[code] !== null ? response.result[code].RealtimeStatistic : null;
        //         if (item) {
        //             var day = $.isNumeric(response.result[code].PriceInfo.priceChangePercent) ? `${(response.result[code].PriceInfo.priceChangePercent * 100).toFixed(2)}` : "0";
        //             var week = $.isNumeric(item.changePercent1W) ? (item.changePercent1W * 100).toFixed(2) : "N/A";
        //             var week_2 = $.isNumeric(item.changePercent2W) ? (item.changePercent2W * 100).toFixed(2) : "N/A";
        //             var month_1 = $.isNumeric(item.changePercent1M) ? (item.changePercent1M * 100).toFixed(2) : "N/A";
        //             var month_3 = $.isNumeric(item.changePercent3M) ? (item.changePercent3M * 100).toFixed(2) : "N/A";
        //             var month_6 = $.isNumeric(item.changePercent6M) ? (item.changePercent6M * 100).toFixed(2) : "N/A";
        //             var ytd = $.isNumeric(item.changePercentYTD) ? (item.changePercentYTD * 100).toFixed(2) : "N/A";
        //             var year = $.isNumeric(item.changePercent52W) ? (item.changePercent52W * 100).toFixed(2) : "N/A";
        //             var year_3 = $.isNumeric(item.changePercent3Yr) ? (item.changePercent3Yr * 100).toFixed(2) : "N/A";
        //             contents += `<tr>
        //                             <td class="${day > 0 ? 'up' : day < 0 ? 'down' : 'reference'} bold">${day}%</td>
        //                             <td class="${week > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week}%</td>
        //                             <td class="${week_2 > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week_2}%</td>
        //                             <td class="${month_1 > 0 ? 'up' : month_1 < 0 ? 'down' : 'reference'} bold">${month_1}%</td>
        //                             <td class="${month_3 > 0 ? 'up' : month_3 < 0 ? 'down' : 'reference'} bold">${month_3}%</td>
        //                             <td class="${month_6 > 0 ? 'up' : month_6 < 0 ? 'down' : 'reference'} bold">${month_6}%</td>
        //                             <td class="${ytd > 0 ? 'up' : ytd < 0 ? 'down' : 'reference'} bold">${ytd}%</td>
        //                             <td class="${year > 0 ? 'up' : year < 0 ? 'down' : 'reference'} bold">${year}%</td>
        //                             <td class="${year_3 > 0 ? 'up' : year_3 < 0 ? 'down' : 'reference'} bold">${year_3}%</td>
        //                         </tr>`;
        //         } else {
        //             contents += `<tr><td colspan="9">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
        //         }
        //     } else {
        //         contents += `<tr><td colspan="9">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
        //     }
        //     contents += `<tbody></table>`;
        //     $("#volatilityContent").html(contents);
        //     initTooltips();
        // }).fail(function (jqXHR, textStatus, error) {
        //     $("#volatilityContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        // });
    }, 100);
}
