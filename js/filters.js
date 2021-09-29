$(document).ready(function () {
    $("#filterOptionC").slider({
        tooltip: 'always',
        id: "filter-option-c"
    });
    $("#filterOptionC1").slider({
        tooltip: 'always',
        id: "filter-option-c1"
    });
    $("#filterOptionC2").slider({
        tooltip: 'always',
        id: "filter-option-c2"
    });
    $("#filterOptionC3").slider({
        tooltip: 'always',
        id: "filter-option-c3"
    });
    //==========================//
    $("#filterOptionA").slider({
        tooltip: 'always',
        id: "filter-option-a"
    });
    $("#filterOptionA1").slider({
        tooltip: 'always',
        id: "filter-option-a1"
    });
    $("#filterOptionA2").slider({
        tooltip: 'always',
        id: "filter-option-a2"
    });
    $("#filterOptionA3").slider({
        tooltip: 'always',
        id: "filter-option-a3"
    });
    //==========================//
    $("#filterOptionL").slider({
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
function filterData() {
    return;
    var loadingHTML = getLoadingHTML();
    var data = { "faFilter": { "Eps_TTM": { "min": 3000, "max": 35658 }, "RS52W": { "min": 70, "max": 99 }, "NetSale_Growth_MRQ": { "min": 0.1, "max": 801 }, "NetSale_Growth_Avg_3Y": { "min": 0.08, "max": 883 }, "Profit_Growth_MRQ": { "min": 0.25, "max": 154044 }, "Profit_Growth_MRQ_2": { "min": 0.15, "max": 2106 }, "Profit_Growth_TTM": { "min": 0.25, "max": 307 }, "Profit_Growth_Avg_3Y": { "min": 0.18, "max": 102 }, "ME_ROE": { "min": 0.15, "max": 22 } }, "taFilter": null, "booleanFilter": { "AvailableForFASearching": true }, "pageNumber": 1, "pageSize": 10000, "exchanges": ["HSX", "HNX", "UPCOM"], "icbCodes": null, "sortColumn": "Symbol", "isDesc": false };
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
                var index = 0;
                response.result.items.forEach(item => {
                    res += `<tr class="tr-cursor" onclick=showTickerInfor("${item}")><td>${index + 1}</td><td class="bold-text">${item}</td></tr>`;
                    index++;
                });
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