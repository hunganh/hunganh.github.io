$(document).on("contextmenu", function (e) {        
    e.preventDefault();
});

$(document).keydown(function (event) {
    // Prevent F12
    if (event.keyCode == 123) {
        return false;
    }
    else if (event.ctrlKey && event.shiftKey && event.keyCode == 73)
    // Prevent Ctrl+Shift+I
    {
        return false;
    }
    else if (event.ctrlKey && event.keyCode == 83)
    // Prevent Ctrl+S
    {
        return false;
    }
});

document.addEventListener("DOMContentLoaded", function(e) { 
    $(".filter-title,.filter-title-default").click(function () {
        var $input = $(this);
        var prevElement = $input.prev().find("input");
        if (prevElement.prop("checked")) {
            prevElement.prop("checked", false).change();
        } else {
            prevElement.prop("checked", true).change();
        }
    });

    $(document).on("click", ".popover .close", function () {
        $(this).parents(".popover").popover('hide');
    });

    $(document).on("click", ".nav-link", function () {
        $('.popover').popover('hide');
    });

    $(document).on("click", ".popover .close", function () {
        $(this).parents(".popover").popover('hide');
    });

    $(document).on("click", ".nav-link", function () {
        $('.popover').popover('hide');
    });
});

window.commonJS = {
    fetchContentByUrl :  function (url) {
        return new Promise((resolve, reject) => {
            window.fetch(url,
                {
                    method: 'GET'
                }
            ).then((response) => {
                if (response.status === 200) {
                    resolve(response.json());
                }
            }, (err) => {
                reject(err);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    
    fetchContentByUrlWithCORSProxy :  function (url, method, body) {
        return new Promise((resolve, reject) => {
            if (method === "GET") {
                fetch(`${window.apiUrlDefined.CORS_PROXY_URL}/${url}`)
                    .then(response => {
                        if (response.ok) return resolve(response.json())
                        throw new Error('Network response was not ok.')
                    }, err => {
                        reject(err);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                fetch(`${window.apiUrlDefined.CORS_PROXY_URL}/${url}`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                    .then(response => {
                        if (response.ok) return resolve(response.json())
                        throw new Error('Network response was not ok.')
                    }, err => {
                        reject(err);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    },
    
    getDateInput :  function (date) {
        const dateInput = new Date(date);
        var dateInputStr = `${dateInput.getFullYear()}_${("0" + (dateInput.getMonth() + 1)).slice(-2)}_${("0" + dateInput.getDate()).slice(-2)}`;
        return dateInputStr;
    },
    
    checkUrlExists :  function (fileName) {
        var http = new XMLHttpRequest();
        http.open('HEAD', getRequestUrl(fileName), false);
        http.send();
        if (http.status != 404)
            return true;
        else
            return false;
    },
    
    getFirstItemData :  function (date) {
        var res = null;
        var url = window.commonJS.getUrlPreviousElementByDate(date);
        if (url === "") return res;
        $.ajax({
            url: url,
            async: false,
            dataType: "json"
        }).done(function (result) {
            if (result && result.items.length > 0) {
                res = result.items[0];
            }
        });
        return res;
    },
    
    addCell :  function (tr, cellData) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = cellData;
    },
    
    getPositionIcon :  function (prvPosition, currentPosition) {
        var iconString = "<span class='reference'> &#8722;</span>";
        if (currentPosition < prvPosition) {
            iconString = "<span class='up'> &#8593;(" + Number(prvPosition + 1) + ")</span>";
        } else if (currentPosition > prvPosition) {
            iconString = "<span class='down'> &#8595;(" + Number(prvPosition + 1) + ")</span>";
        }
        return iconString;
    },
    
    getColumnName :  function () {
        if (window.variablesJS.typeDefault === "selfBusiness") {
            return window.variablesJS.TOTAL_NET_BUY_TRADE_VALUE;
        } else {
            return window.variablesJS.FOREIGN_NET_BUY_VALUE;
        }
    },
    
    getVolumeColumnName :  function () {
        if (window.variablesJS.typeDefault === "selfBusiness") {
            return window.variablesJS.TOTAL_NET_BUY_TRADE_VOLUME;
        } else {
            return "";
        }
    },
    
    getVolatilityValue :  function (data) {
        if (window.variablesJS.typeDefault === "selfBusiness") {
            return Intl.NumberFormat(window.variablesJS.numberLocale).format(data["totalBuyTradeValue"] - data["totalSellTradeValue"]);
        } else {
            return Intl.NumberFormat(window.variablesJS.numberLocale).format(data["foreignBuyValue"] - data["foreignSellValue"]);
        }
    },
    
    getNetTradeValueColumn :  function () {
        if (window.variablesJS.typeDefault === "selfBusiness") {
            if (window.variablesJS.actionDefault === "netBuy") {
                return window.variablesJS.TOTAL_NET_BUY_TRADE_VALUE;
            } else {
                return window.variablesJS.TOTAL_NET_SELL_TRADE_VALUE;
            }
        } else {
            if (window.variablesJS.actionDefault === "netBuy") {
                return window.variablesJS.FOREIGN_NET_BUY_VALUE;
            } else {
                return window.variablesJS.FOREIGN_NET_SELL_VALUE;
            }
        }
    },

    getNetTradeValueColumnByActionValue :  function (action) {
        if (window.variablesJS.typeDefault === "selfBusiness") {
            if (action === "netBuy") {
                return window.variablesJS.TOTAL_NET_BUY_TRADE_VALUE;
            } else {
                return window.variablesJS.TOTAL_NET_SELL_TRADE_VALUE;
            }
        } else {
            if (action === "netBuy") {
                return window.variablesJS.FOREIGN_NET_BUY_VALUE;
            } else {
                return window.variablesJS.FOREIGN_NET_SELL_VALUE;
            }
        }
    },

    getUrlPreviousElementByDate :  function (date) {
        var fileName = `${window.commonJS.getDateInput(date)}.json`;
        var index = window.variablesJS.mappingDataJson.findIndex(x => x.name === fileName);
        if (index <= 0) return "";
        return window.variablesJS.mappingDataJson[index + 1].url;
    },
    
    showLoading : function (elementId) {
        var loadingElement = document.getElementById(elementId);
        loadingElement.style.display = "block";
    },
    
    hideLoading :  function (elementId) {
        var loadingElement = document.getElementById(elementId);
        loadingElement.style.setProperty("display", "none", "important");
    },
    
    getClassByValue :  function (value) {
        return value > 0 ? "up" : value < 0 ? "down" : "reference";
    },
    
    showTickerInfor :  function (code) {
        window.variablesJS.currentTicker = code;
        var loadingHTML = window.commonJS.getLoadingHTML();
        $("#btn-modal-action").attr("onclick","window.commonJS.refreshTickerDetailData()");
        $("#detailModalLabel").html(code);
        $("#detailModalContent").html(loadingHTML);
        window.commonJS.processTickerData(code);
        $("#detailModal").modal('show');
    },
    
    processTickerData :  function (code) {
        var currentDate = new Date();
        var prvDate = new Date();
        prvDate.setMonth(prvDate.getMonth() - 3);
        var toDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
        var fromDate = `${prvDate.getFullYear()}-${("0" + (prvDate.getMonth() + 1)).slice(-2)}-${("0" + prvDate.getDate()).slice(-2)}`;
    
        var RECOMMENDATIONS_URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V2_URL}${window.apiUrlDefined.FIALDA_GET_REPORT_PATH}?fromDate=${fromDate}&toDate=${toDate}&symbols=${code}`);
        var STOCK_INFO_URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V1_URL}${window.apiUrlDefined.FIALDA_GET_STOCK_INFO_PATH}`);
        Promise.all([
            window.commonJS.fetchContentByUrlWithCORSProxy(RECOMMENDATIONS_URL, "GET", ""),
            window.commonJS.fetchContentByUrlWithCORSProxy(STOCK_INFO_URL, "POST", [{ symbol: code }])
        ]).then((values) => {
            if (values && values.length > 0) {
                setTimeout(() => {
                    var content = window.commonJS.drawRecommendationsDataToHTML(values, code);
                    $("#detailModalContent").html(content);
                }, 50);
            }
        }).then(() => {
        }).catch((err) => {
            console.error(err);
        });
    },
    
    drawRecommendationsDataToHTML :  function (data, code) {
        var res = "";
        var recommendationsData = data[0];
        var tickerData = data[1];
        if (tickerData && tickerData["result"]) {
            var firstKey = Object.keys(tickerData["result"])[0];
            if (firstKey !== undefined) {
                var tickerObject = tickerData["result"][firstKey];
                var lastPrice = tickerObject.PriceInfo.lastPrice !== null ? tickerObject.PriceInfo.lastPrice * 1000 : tickerObject.BasicPriceInfo.prevClose * 1000;
                var pe = $.isNumeric(tickerObject.BasicInfo.eps_TTM) ? (lastPrice / tickerObject.BasicInfo.eps_TTM).toFixed(2) : "N/A";
                var pb = $.isNumeric(tickerObject.BasicInfo.bookValuePerShare) ? (lastPrice / tickerObject.BasicInfo.bookValuePerShare).toFixed(2) : "N/A";
                var ps = $.isNumeric(tickerObject.BasicInfo.salePerShare) ? (lastPrice / tickerObject.BasicInfo.salePerShare).toFixed(2) : "N/A";
                var valuePercentChange = $.isNumeric(tickerObject.PriceInfo.priceChangePercent) ? `(${(tickerObject.PriceInfo.priceChangePercent * 100).toFixed(2)}%)` : "";
                $("#detailModalLabel").html(`${code} - ${tickerObject.BasicInfo.name}`);
                res += `<div class="card mb-3">
                            <div class="row g-0">
                            <div class="col-md-3 text-center">
                                <div class="card-body ${tickerObject.PriceInfo.openPrice === null ? "bg-reference" : tickerObject.PriceInfo.priceChange > 0 ? "bg-up" : tickerObject.PriceInfo.priceChange < 0 ? "bg-down" : "bg-reference"}">
                                    <h5 class="card-title">${new Intl.NumberFormat(window.variablesJS.numberLocale).format(lastPrice)} ${valuePercentChange}</h5>
                                    <h6>Sàn: ${tickerObject.BasicInfo.exchange}</h6>
                                </div>               
                            </div>
                            <div class="col-md-9">
                                <div class="card-body price-info">
                                    <table class="table table-responsive" style="border: none">
                                        <tbody>
                                            <tr>
                                                <td><span class="font-weight-bold">Vốn hóa:</span> ${$.isNumeric(tickerObject.PriceInfo.marketCap) ? new Intl.NumberFormat(window.variablesJS.numberLocale).format(tickerObject.PriceInfo.marketCap) : "N/A"}</td>    
                                                <td><span class="font-weight-bold">EPS(TTM):</span> ${$.isNumeric(tickerObject.BasicInfo.eps_TTM) ? new Intl.NumberFormat(window.variablesJS.numberLocale).format(tickerObject.BasicInfo.eps_TTM.toFixed(0)) : "N/A"}</td>
                                                <td><span class="font-weight-bold">P/E:</span> ${pe}</td>
                                                <td><span class="font-weight-bold">P/S:</span> ${ps}</td>
                                                <td><span class="font-weight-bold">P/B:</span> ${pb} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>`;
            } else {
                res += "";
            }
        } else {
            res += "";
        }
        var recommendationBody = `<table class="table table-bordered table-responsive">
                                    <thead class="table-light">
                                        <tr><th>Ngày báo cáo</th><th>Đơn vị phát hành</th><th>Tiêu đề</th><th>#</th></tr>              
                                    </thead>
                                    <tbody>`;
        if (recommendationsData && recommendationsData["result"]) {
            var firstKey = Object.keys(recommendationsData["result"])[0];
            if (firstKey !== undefined) {
                recommendationsData["result"][firstKey].forEach(item => {
                    recommendationBody += `<tr><td>${new Date(item.reportDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td><b class="top10">${item.reporter}</b></td><td class="text-left">${item.title}</td><td><a href="${window.apiUrlDefined.FIALDA_ANALYSIS_REPORT_URL}${code}_-_${item.attachment}" target="_blank">Xem báo cáo</a></td></tr>`;
                });
            } else {
                recommendationBody += `<tr><td colspan="4">Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
            }
        } else {
            recommendationBody += `<tr><td colspan="4">Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
        }
        recommendationBody += `</tbody></table>`;
        res += `<ul class="nav nav-tabs tabs" id="tickerTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="recommendation-tab" data-bs-toggle="tab" data-bs-target="#recommendation" type="button" role="tab" aria-controls="recommendation" aria-selected="true">Báo Cáo Phân Tích</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="dividend-tab" data-bs-toggle="tab" data-bs-target="#dividend" type="button" role="tab" aria-controls="dividend" aria-selected="false" onclick="window.commonJS.loadDividendNews('${code}')">Tin Cổ Tức</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="volatility-tab" data-bs-toggle="tab" data-bs-target="#volatility" type="button" role="tab" aria-controls="volatility" aria-selected="false" onclick="window.commonJS.loadVolatilityData('${code}')">Biến động %</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="news-tab" data-bs-toggle="tab" data-bs-target="#news" type="button" role="tab" aria-controls="news" aria-selected="false" onclick="window.commonJS.loadNews('${code}')">Tin Doanh Nghiệp</button>
                    </li>
                </ul>
                <div class="tab-content" id="tickerTabContent">
                    <div class="tab-pane fade show active" id="recommendation" role="tabpanel" aria-labelledby="recommendation-tab">
                        <div class="grid-container">
                            ${recommendationBody}
                        </div>
                    </div>
                    <div class="tab-pane fade" id="dividend" role="tabpanel" aria-labelledby="dividend-tab">
                        <div class="grid-container" id="dividendContent">
                            
                        </div>
                    </div>
                    <div class="tab-pane fade" id="volatility" role="tabpanel" aria-labelledby="volatility-tab">
                        <div class="grid-container" id="volatilityContent">
                            
                        </div>
                    </div>
                    <div class="tab-pane fade" id="news" role="tabpanel" aria-labelledby="news-tab">
                        <div class="grid-container" id="newsContent">
                            
                        </div>
                    </div>
                </div>`;
        return res;
    },
    
    getLoadingHTML :  function () {
        return `<div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <span class="loadingTitle">Đang tải dữ liệu...</span>
                </div>`;
    },
    
    getSelectionFieldsHTML :  function (id) {
        var res = `<select class="form-select form-select-sm" aria-label=".form-select-sm example" id="${id}">
                        <option value="null" selected>Tất cả ngành</option>`;
        window.fieldsDataGlobal.forEach(field => {
            res += "<option value='" + field.icbCode + "'>" + field.icbName + "</option>";
        })
        res += "</select>";
        return res;
    },
    
    refreshTickerDetailData :  function () {
        var loadingHTML = window.commonJS.getLoadingHTML();
        $("#detailModalContent").html(loadingHTML);
        window.commonJS.processTickerData(window.variablesJS.currentTicker);
    },
    
    loadSynthesisData :  function () {
        window.summaryJS.initSummaryData();
    },
    
    initTooltips :  function () {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        })
        const $tooltip = $('[data-bs-toggle="tooltip"]');
        $tooltip.tooltip({
            html: true,
            trigger: 'click',
            placement: 'bottom',
        });
        $tooltip.on('show.bs.tooltip', () => {
            $('.tooltip').not(this).remove();
        });
    },
    
    loadDividendNews :  function (code) {
        $("#dividendContent").html(`</br>${window.commonJS.getLoadingHTML()}`);
        var contents = "";
        var FIALDA_STOCK_CASH_DIVIDEND_EVENT_URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V2_URL}${window.apiUrlDefined.FIALDA_STOCK_EVENT_PATH}?typeId=13&symbol=${code}&pageNumber=1&pageSize=1000&sortColumn=exrightDate&isDesc=true`);
        var FIALDA_STOCK_DIVIDEND_EVENT_URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V2_URL}${window.apiUrlDefined.FIALDA_STOCK_EVENT_PATH}?typeId=15&symbol=${code}&pageNumber=1&pageSize=1000&sortColumn=exrightDate&isDesc=true`);
        Promise.all([
            window.commonJS.fetchContentByUrlWithCORSProxy(FIALDA_STOCK_CASH_DIVIDEND_EVENT_URL, "GET", ""),
            window.commonJS.fetchContentByUrlWithCORSProxy(FIALDA_STOCK_DIVIDEND_EVENT_URL, "GET", "")
        ]).then((values) => {
            if (values && values.length > 0) {
                var dividendEventData1 = values[0];
                var dividendEventData2 = values[1];
                contents += `<table class="table table-bordered table-responsive">
                                <thead class="table-light">
                                    <tr><th colspan="6">Cổ Tức Bằng Tiền Mặt</th></tr>
                                    <tr><th>#</th><th>Ngày GDKHQ</th><th>Ngày ĐKCC</th><th>Ngày Thực Hiện</th><th>Tỷ lệ</th><th>Nội Dung Sự Kiện</th></tr>              
                                </thead>
                                <tbody>`;
                if (dividendEventData1 && dividendEventData1.result && dividendEventData1.result.items.length > 0) {
                    var i = 0;
                    dividendEventData1.result.items.forEach(item => {
                        contents += `<tr><td>${i + 1}</td><td>${new Date(item.exrightDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td>${new Date(item.recordDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td>${new Date(item.issuedDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td>${item.eventRatioStr}</td><td class="text-left">${item.eventName}</td></tr>`;
                        i++;
                    });
                } else {
                    contents += `<tr><td colspan='6'>Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
                }
                contents += "</tbody></table>";
                contents += `<table class="table table-bordered table-responsive">
                                <thead class="table-light">
                                    <tr><th colspan="6">Cổ Tức Bằng Cổ Phiếu</th></tr>
                                    <tr><th>#</th><th>Ngày GDKHQ</th><th>Ngày ĐKCC</th><th>Tỷ lệ</th><th>Khối Lượng</th><th>Nội Dung Sự Kiện</th></tr>              
                                </thead>
                            <tbody>`;
                if (dividendEventData2 && dividendEventData2.result && dividendEventData2.result.items.length > 0) {
                    var j = 0;
                    dividendEventData2.result.items.forEach(item => {
                        contents += `<tr><td>${j + 1}</td><td>${new Date(item.exrightDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td>${new Date(item.recordDate).toLocaleDateString(window.variablesJS.defaultLocale)}</td><td>${item.eventRatioStr}</td><td>${new Intl.NumberFormat(window.variablesJS.numberLocale).format(item.eventValue)}</td><td class="text-left">${item.eventName}</td></tr>`;
                        j++;
                    });
                } else {
                    contents += `<tr><td colspan='6'>Chưa có dữ liệu cho mã <b class="top10">${code}</b>. Vui lòng thử lại sau!</td></tr>`;
                }
                contents += "</tbody></table>";
                $("#dividendContent").html(contents);
            } else {
                $("#dividendContent").html("Không tìm thấy dữ liệu. Vui lòng thử lại sau!");
            }
        }).then(() => {
            //console.log('Done fetching content via JavaScript');
        }).catch((err) => {
            $("#dividendContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    },
    
    loadVolatilityData :  function (code) {
        $("#volatilityContent").html(`</br>${window.commonJS.getLoadingHTML()}`);
        var contents = `<table class="table table-bordered table-responsive">
                                <thead class="table-light">
                                    <tr><th colspan="9">% Thay đổi</th></tr>
                                    <tr><th>Ngày</th><th>1 Tuần</th><th>2 Tuần</th><th>1 Tháng</th><th>3 Tháng</th><th>6 Tháng</th><th>YTD</th><th>1 Năm</th><th>3 Năm</th></tr>              
                                </thead>
                                <tbody>`;
        setTimeout(() => {
            var URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V1_URL}${window.apiUrlDefined.FIALDA_GET_STOCK_INFO_PATH}`);
            $.ajax({
                url: `${window.apiUrlDefined.CORS_PROXY_URL}/${URL}`,
                method: "POST",
                data: JSON.stringify([{ symbol: code }]),
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                }
            }).done(function (response) {
                if (response && response.result) {
                    var item = response.result[code] !== null ? response.result[code].RealtimeStatistic : null;
                    if (item) {
                        var day = $.isNumeric(response.result[code].PriceInfo.priceChangePercent) ? `${(response.result[code].PriceInfo.priceChangePercent * 100).toFixed(2)}` : "0";
                        var week = $.isNumeric(item.changePercent1W) ? (item.changePercent1W * 100).toFixed(2) : "N/A";
                        var week_2 = $.isNumeric(item.changePercent2W) ? (item.changePercent2W * 100).toFixed(2) : "N/A";
                        var month_1 = $.isNumeric(item.changePercent1M) ? (item.changePercent1M * 100).toFixed(2) : "N/A";
                        var month_3 = $.isNumeric(item.changePercent3M) ? (item.changePercent3M * 100).toFixed(2) : "N/A";
                        var month_6 = $.isNumeric(item.changePercent6M) ? (item.changePercent6M * 100).toFixed(2) : "N/A";
                        var ytd = $.isNumeric(item.changePercentYTD) ? (item.changePercentYTD * 100).toFixed(2) : "N/A";
                        var year = $.isNumeric(item.changePercent52W) ? (item.changePercent52W * 100).toFixed(2) : "N/A";
                        var year_3 = $.isNumeric(item.changePercent3Yr) ? (item.changePercent3Yr * 100).toFixed(2) : "N/A";
                        contents += `<tr>
                                        <td class="${day > 0 ? 'up' : day < 0 ? 'down' : 'reference'} bold">${day}%</td>
                                        <td class="${week > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week}%</td>
                                        <td class="${week_2 > 0 ? 'up' : week < 0 ? 'down' : 'reference'} bold">${week_2}%</td>
                                        <td class="${month_1 > 0 ? 'up' : month_1 < 0 ? 'down' : 'reference'} bold">${month_1}%</td>
                                        <td class="${month_3 > 0 ? 'up' : month_3 < 0 ? 'down' : 'reference'} bold">${month_3}%</td>
                                        <td class="${month_6 > 0 ? 'up' : month_6 < 0 ? 'down' : 'reference'} bold">${month_6}%</td>
                                        <td class="${ytd > 0 ? 'up' : ytd < 0 ? 'down' : 'reference'} bold">${ytd}%</td>
                                        <td class="${year > 0 ? 'up' : year < 0 ? 'down' : 'reference'} bold">${year}%</td>
                                        <td class="${year_3 > 0 ? 'up' : year_3 < 0 ? 'down' : 'reference'} bold">${year_3}%</td>
                                    </tr>`;
                    } else {
                        contents += `<tr><td colspan="9">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
                    }
                } else {
                    contents += `<tr><td colspan="9">Không có dữ liệu. Vui lòng thử lại sau!</td></tr>`;
                }
                contents += `<tbody></table>`;
                $("#volatilityContent").html(contents);
                window.commonJS.initTooltips();
            }).fail(function (jqXHR, textStatus, error) {
                $("#volatilityContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
            });
        }, 100);
    },
    
    loadNews :  function (code) {
        var loadingHTML = window.commonJS.getLoadingHTML();
        $("#newsContent").html(`</br>${loadingHTML}`);
        setTimeout(() => {
            var URL = encodeURIComponent(`${window.apiUrlDefined.FIALDA_API_V1_URL}${window.apiUrlDefined.FIALDA_STOCK_COMPANY_NEWS}?symbol=${code}&pageNumber=1&pageSize=30`);
            var res = "";
            $.ajax({
                url: `${window.apiUrlDefined.CORS_PROXY_URL}/${URL}`,
                async: false,
                dataType: "json"
            }).done(function (response) {
                if (response && response.result && response.result.items.length > 0) {
                    res += `<div class="row">`;
                    response.result.items.forEach(item => {
                        res += `<div class="col">
                                        <div class="news-item style-no1 mb-px" onclick="window.commonJS.viewArticleDetail(${item.id})" title="${item.title}">
                                            <div class="news-item-image logo blur border-2">
                                                <div style="background-image:url('${window.apiConfigs.IMAGE_NEWS_URL}${item.imageUrl}');"></div>
                                                <div style="background-image:url('${window.apiConfigs.IMAGE_NEWS_URL}${item.imageUrl}');"></div>
                                            </div>
                                            <div class="news-item-content">
                                                <div class="news-item-title ellipse">${item.title}</div>
                                                <div class="des ellipse color2">${item.shortContent}</div>
                                                <div class="flex-row b">
                                                    <div class="news-item-more">
                                                        <div class="news-item-soure color2">${item.source}</div>
                                                        <div class="news-item-date color2">
                                                            <i class="ico ico-date color2" style="margin-right: 5px;"></i> ${new Date(item.publishedTime).toLocaleDateString(window.variablesJS.defaultLocale)} 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                    });
                } else {
                    res += `<p><b class="top10">Không có dữ liệu. Vui lòng thử lại sau!</b></p>`;
                }
                res += `</div>`;
                $("#newsContent").html(res);
                window.commonJS.initTooltips();
            }).fail(function (jqXHR, textStatus, error) {
                $("#newsContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
            });
        }, 100);
    },
    
    viewArticleDetail :  function (id) {
        window.open(`news.html?id=${id}`, '_blank');
    },
    
    getValueByCandleStickType : function (value, type) {
        return value.replaceAll("$$", type);
    },
    
    showDisconnectionMessageToast : function () {
        var disconnectionMessageToast = $("#disconnectionMessageToast");
        if (disconnectionMessageToast.css("display") !== "block") {
            disconnectionMessageToast.toast({
                autohide: false
            }).show(); 
        }
    },
    
    reconnectWS :  function () {
        window.webSocketConfigs.liveboard.Result = -1;
        window.webSocketApp.initWebsocket();
        window.timeServerJS.StartWS();
        window.commonJS.hideDisconnectionMessageToast();
    },
    
    hideDisconnectionMessageToast :  function () {
        var disconnectionMessageToast = $("#disconnectionMessageToast");
        disconnectionMessageToast.toast().hide();
    },
    
    initSymbolAutocomple :  function (id) {
        var data = window.stockData.map(x => {
            let obj = {}; 
            obj["label"] = `${x.symbol} - ${x.name} - ${x.exchange}`; 
            obj["value"] = x.symbol; 
            return obj;
        });
        VirtualSelect.init({
            ele: `#${id}`,
            options: data,
            multiple: false,
            search: true,
            placeholder: 'Nhập mã cổ phiếu...',
            searchPlaceholderText: 'Tìm kiếm mã cổ phiếu...', 
            noSearchResultsTex: 'Không tìm thấy Mã',
            selectAllText: 'Chọn tất cả',
            optionSelectedText: 'mã được chọn',
            optionsSelectedText: 'mã được chọn',
            allOptionsSelectedText: 'Tất cả',
            disableSelectAll: true,
            dropboxWidth: "600px",
            maxValue: 10,
            optionsCount: 8
          });
    },
    
    initIndustriesAutocomple : function (id, dataSource, actionFunction) {
        var data = dataSource.map(x => {
            let obj = {}; 
            obj["label"] = `${x}`; 
            obj["value"] = x.toLocaleLowerCase(); 
            return obj;
        });
        VirtualSelect.init({
            ele: `#${id}`,
            options: data,
            multiple: true,
            search: true,
            selectedValue: data.map(x => x.value),
            placeholder: 'Chọn ngành cần lọc...',
            searchPlaceholderText: 'Tìm kiếm ngành cần lọc...', 
            noSearchResultsTex: 'Không tìm thấy Ngành',
            selectAllText: 'Chọn tất cả',
            optionSelectedText: 'ngành được chọn',
            optionsSelectedText: 'ngành được chọn',
            allOptionsSelectedText: 'Tất cả',
            disableSelectAll: false,
            dropboxWidth: "400px",
            maxValue: 19,
            optionsCount: 8
        });
        if (actionFunction) {
            $(`#${id}`).change(function() {
                actionFunction(this.value)
            });
        }
    },
    
    getSymbolInfor : function (symbol) {
        var symbolInfo = {}
        symbolInfo = window.stockData.find(x => x.symbol === symbol);
        symbolInfo.icbName = window.fieldsDataGlobal.find(x => x.icbCode === symbolInfo.icbCode).icbName;
        return symbolInfo;
    },
    
    
    getTotalItems : function (val1, val2) {
        let total = 0;
        if (val1 !== null && val1 > 0) {
            total += 1;
        }
        if (val2 !== null && val2 > 0) {
            total += 1;
        }
        return total;
    },
    
    getIcbNameBySymbol : function (symbol) {
        var symbolInfo = window.stockData.find(x => x.symbol.toLowerCase() === symbol.toLowerCase());
        if (symbolInfo) {
            var icbInfo = window.fieldsDataGlobal.find(x => x.icbCode === symbolInfo.icbCode)
            if (icbInfo && icbInfo.hasOwnProperty('icbName')) {
                return window.fieldsDataGlobal.find(x => x.icbCode === symbolInfo.icbCode).icbName;
            }
        }
        return "N/A";
    },
    
    initIndustriesSelectionPopover : function (id) {
        $(`#${id}`).popover({
            html: true,
            placement: 'top',
            title : '<span class="font-weight-bold">Lọc theo ngành</span> <a href="javascript:void(0)" class="close popover-close-btn" data-dismiss="alert" type="button"><i class="vscomp-clear-icon"></i></a>',
            content: function() {
                return `<div id="symbol-name-${id}-autocomplete"></div>`;
            }
        });
        $(`#${id}`).on("click", () => {
            var checkExist = $(`#symbol-name-${id}-autocomplete`);
            if (checkExist != null && typeof(checkExist) !== undefined && checkExist.val() !== "") {
                return;
            }
            var industriesData = $(`#table-${id} tr`).map(function() { return $(this).find("td:eq(2)").text()});
            const dataSource = Array.from(new Set(industriesData));
            window.commonJS.initIndustriesAutocomple(`symbol-name-${id}-autocomplete`, dataSource, (values) => {
                $(`#table-${id} tr`).filter(function() {
                    $(this).toggle(values.indexOf($(this).find("td:eq(2)").text().toLowerCase()) > -1)
                });
            });
        })
    },

    closePopover : function () {
        $('.popover').popover('hide');
    }
}

