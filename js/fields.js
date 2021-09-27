function loadFieldsData() {
    var loadingHTML = getLoadingHTML();
    $("#showFieldsData").html(`</br>${loadingHTML}`);
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_FIELDS_REPORT_PATH}`);
        var res = `<table class="table table-bordered table-striped table-hover">
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
                            <tr>
                                <th>1 ngày</th>
                                <th>1 tuần</th>
                                <th>1 tháng</th>
                                <th>3 tháng</th>
                                <th>6 tháng</th>
                                <th>1 năm</th>
                                <th>YTD</th>
                            </tr>             
                        </thead>
                    <tbody>`;
        $.ajax({
            url: `${CORS_PROXY_URL}/${URL}`,
            async: false,
            dataType: "json"
        }).done(function (response) {
            if (response && response.result) {
                response.result.forEach(item => {
                    var eps = item.eps_TTM ? new Intl.NumberFormat().format((item.eps_TTM).toFixed(0)) : "N/A";
                    var pe = item.pe ? (item.pe).toFixed(2) : "N/A";
                    var ps = item.ps ? (item.ps).toFixed(2) : "N/A";
                    var pb = item.pb ? (item.pb).toFixed(2) : "N/A";
                    var roa = item.mE_ROA ? `${(item.mE_ROA * 100).toFixed(2)}%` : "N/A";
                    var roe = item.mE_ROE ? `${(item.mE_ROE * 100).toFixed(2)}%` : "N/A";
                    var day = item.changePercent1D ? (item.changePercent1D * 100).toFixed(2) : "N/A";
                    var week = item.changePercent1W ? (item.changePercent1W * 100).toFixed(2) : "N/A";
                    var month_1 = item.changePercent1M ? (item.changePercent1M * 100).toFixed(2) : "N/A";
                    var month_3 = item.changePercent3M ? (item.changePercent3M * 100).toFixed(2) : "N/A";
                    var month_6 = item.changePercent6M ? (item.changePercent6M * 100).toFixed(2) : "N/A";
                    var year = item.changePercent1Y ? (item.changePercent1Y * 100).toFixed(2) : "N/A";
                    var ytd = item.changePercentYTD ? (item.changePercentYTD * 100).toFixed(2) : "N/A";
                    res += `<tr>
                                <td class="text-left"><b class="top10">${item.icbName}</b></td>
                                <td class="bold top10">${eps}</td>
                                <td class="bold top10">${pe}</td>
                                <td class="bold top10">${ps}</td>
                                <td class="bold top10">${pb}</td>
                                <td class="bold top10">${roa}</td>
                                <td class="bold top10">${roe}</td>
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
            res += `</tbody></table>`;
            $("#showFieldsData").html(res);
        }).fail(function (jqXHR, textStatus, error) {
            $("#showFieldsData").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}