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
    var res = "";
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
        var day = $.isNumeric(item.changePercent1D) ? (item.changePercent1D * 100).toFixed(2) : "N/A";
        var week = $.isNumeric(item.changePercent1W) ? (item.changePercent1W * 100).toFixed(2) : "N/A";
        var month_1 = $.isNumeric(item.changePercent1M) ? (item.changePercent1M * 100).toFixed(2) : "N/A";
        var month_3 = $.isNumeric(item.changePercent3M) ? (item.changePercent3M * 100).toFixed(2) : "N/A";
        var month_6 = $.isNumeric(item.changePercent6M) ? (item.changePercent6M * 100).toFixed(2) : "N/A";
        var year = $.isNumeric(item.changePercent1Y) ? (item.changePercent1Y * 100).toFixed(2) : "N/A";
        var ytd = $.isNumeric(item.changePercentYTD) ? (item.changePercentYTD * 100).toFixed(2) : "N/A";
        res += `<tr>
                    <td class="text-left"><b class="top10">${item.icbName}</b></td>
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
    return res;
}

function refreshFieldsData() {
    loadFieldsData();
}

function sortTable(time, self) {
    var sortType = "desc";
    var childSpan = $(self).find("span");
    if (childSpan.hasClass("desc")) {
        sortType = "asc";
    }

    var res = headFields;
    res += processFieldsDataInput(time, sortType);
    res += `</tbody></table>`;
    $("#showFieldsData").html(res);
    initTooltips();
    removeAllSortClass();
    $("#" + time).addClass(sortType);
}

function removeAllSortClass() {
     $("span.sort").removeClass("desc");
     $("span.sort").removeClass("asc");
}