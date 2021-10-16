var typeDefault = "selfBusiness";
var actionDefault = "netBuy";
var actionSummaryDefault = "netBuy";
var currentPeriod = "today";
var currentSummaryPeriod = "today";
var dataJson = null;
var summaryDataJson = null;
var mappingDataJson = null;
var currentTicker = "";
var olderItem = null;
const statisticsCols = ["order", "ticker", "valueChange", "totalNetBuyTradeValue", "priceChange", "percentPriceChange"];
const statisticsHeadTitle = ["#", "Mã CP", "Tổng khối lượng", "Tổng giá trị", "Giá đóng cửa", "Thay đổi giá", "% Thay đổi giá", "Giá vốn"];
// const subStatisticsHeadTitle = ["Khối lượng", "Giá trị"];
const summaryHeadTitle = ["#", "Mã CP", "Tự doanh", "Khối ngoại", "Tổng giá trị"];
const subSummaryHeadTitle = ["Giá trị", "Giá đóng cửa", "Thay đổi giá", "% Thay đổi giá", "Giá vốn", "Giá trị", "Giá đóng cửa", "Thay đổi giá", "% Thay đổi giá", "Giá vốn"];
const locale = 'en-GB';
const FOREIGN_NET_BUY_VALUE = "foreignNetBuyValue";
const FOREIGN_NET_SELL_VALUE = "foreignNetSellValue";
const TOTAL_NET_BUY_TRADE_VALUE = "totalNetBuyTradeValue";
const TOTAL_NET_SELL_TRADE_VALUE = "totalNetSellTradeValue";
const MATCH_PRICE = "matchPrice";
const REFERENCE_PRICE = "referencePrice";
const TOTAL_NET_BUY_TRADE_VOLUME = "totalNetBuyTradeVolume";
const TOTAL_NET_SELL_TRADE_VOLUME = "totalNetSellTradeVolume";
const TU_DOANH = "tudoanh";
const KHOI_NGOAI = "khoingoai";
const DATA_URL = "http://data-statistics-api.herokuapp.com";
// const DATA_URL = "http://localhost:3001";
const API_DATA_SERVER_1 = "https://fwtapi1.fialda.com";
const API_DATA_SERVER_2 = "https://fwtapi2.fialda.com";
const FILES_DATA_URL = `${DATA_URL}/files`;
const UPLOAD_DATA_URL = `${DATA_URL}/upload`;
const CORS_PROXY_URL = `${DATA_URL}/fetch`;
const SYNTHESIS_DATA_URL = `${DATA_URL}/synthesis`;
const STATISTICS_DATA_URL = `${DATA_URL}/statistics`;
const STOCK_INFOR_DATA_OF_FIELD_URL = `${DATA_URL}/fields/symbols`;
const STOCK_FILTERS_URL = `${DATA_URL}/filters`;
const STOCK_LIVE_BOARD_URL = `${DATA_URL}/boards`;
const FIALDA_API_V1_URL = `${API_DATA_SERVER_1}/api/services/app`;
const FIALDA_API_V2_URL = `${API_DATA_SERVER_2}/api/services/app`;
const FIALDA_GET_STOCK_INFO_PATH = "/Common/GetStockInfos";
const FIALDA_GET_REPORT_PATH = "/AnalysisReport/GetByFilter";
const FIALDA_GET_FIELDS_REPORT_PATH = "/Market/GetICBInfos";
const FIALDA_STOCK_TA_RATINGS_PATH = "/TechnicalAnalysis/GetStockTARatings";
const FIALDA_STOCK_FILTERS_PATH = "/Stock/GetByFilter";
const FIALDA_STOCK_DEVIDENT_PATH = "/Stock/GetBonusEvents";
const FIALDA_STOCK_EVENT_PATH = "/Event/GetAll";
const FIALDA_STOCK_COMPANY_NEWS = "/StockInfo/GetCompanyNews";
const FIALDA_ANALYSIS_REPORT_URL = "https://cdn.fialda.com/Attachment/AnalysisReport/";
const IMAGE_NEWS_URL = "https://cdn.fialda.com/Images/News/";
const CHART_URL_V1 = "https://chart.vps.com.vn/tv/";
const CHART_URL_V2 = "https://iboard.ssi.com.vn/chart/";

// $(document).on("contextmenu", function (e) {        
//     e.preventDefault();
// });

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

function fetchContentByUrl(url) {
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
};

function fetchContentByUrlWithCORSProxy(url, method, body) {
    return new Promise((resolve, reject) => {
        if (method === "GET") {
            fetch(`${CORS_PROXY_URL}/${url}`)
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
            fetch(`${CORS_PROXY_URL}/${url}`, {
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
}

function getDateInput(date) {
    const dateInput = new Date(date);
    var dateInputStr = `${dateInput.getFullYear()}_${("0" + (dateInput.getMonth() + 1)).slice(-2)}_${("0" + dateInput.getDate()).slice(-2)}`;
    return dateInputStr;
}

function checkUrlExists(fileName) {
    var http = new XMLHttpRequest();
    http.open('HEAD', getRequestUrl(fileName), false);
    http.send();
    if (http.status != 404)
        return true;
    else
        return false;
}

function getFirstItemData(date) {
    var res = null;
    var url = getUrlPreviousElementByDate(date);
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
}

function addCell(tr, cellData) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = cellData;
}

function getPositionIcon(prvPosition, currentPosition) {
    var iconString = "<span class='reference'> &#8722;</span>";
    if (currentPosition < prvPosition) {
        iconString = "<span class='up'> &#8593;(" + Number(prvPosition + 1) + ")</span>";
    } else if (currentPosition > prvPosition) {
        iconString = "<span class='down'> &#8595;(" + Number(prvPosition + 1) + ")</span>";
    }
    return iconString;
}

function getColumnName() {
    if (typeDefault === "selfBusiness") {
        return TOTAL_NET_BUY_TRADE_VALUE;
        // if (actionDefault === "netBuy") {
        //     return TOTAL_NET_BUY_TRADE_VALUE;
        // } else {
        //     return TOTAL_NET_SELL_TRADE_VALUE;
        // }
    } else {
        return FOREIGN_NET_BUY_VALUE;
        // if (actionDefault === "netBuy") {
        //     return FOREIGN_NET_BUY_VALUE;
        // } else {
        //     return FOREIGN_NET_SELL_VALUE;
        // }
    }
}

function getVolumeColumnName() {
    if (typeDefault === "selfBusiness") {
        return TOTAL_NET_BUY_TRADE_VOLUME;
        // if (actionDefault === "netBuy") {
        //     return TOTAL_NET_BUY_TRADE_VOLUME;
        // } else {
        //     return TOTAL_NET_SELL_TRADE_VOLUME;
        // }
    } else {
        return "";
    }
}

function getVolatilityValue(data) {
    if (typeDefault === "selfBusiness") {
        return Intl.NumberFormat().format(data["totalBuyTradeValue"] - data["totalSellTradeValue"]);
    } else {
        return Intl.NumberFormat().format(data["foreignBuyValue"] - data["foreignSellValue"]);
    }
}

function getNetTradeValueColumn() {
    if (typeDefault === "selfBusiness") {
        if (actionDefault === "netBuy") {
            return TOTAL_NET_BUY_TRADE_VALUE;
        } else {
            return TOTAL_NET_SELL_TRADE_VALUE;
        }
    } else {
        if (actionDefault === "netBuy") {
            return FOREIGN_NET_BUY_VALUE;
        } else {
            return FOREIGN_NET_SELL_VALUE;
        }
    }
}

function getUrlPreviousElementByDate(date) {
    var fileName = `${getDateInput(date)}.json`;
    var index = mappingDataJson.findIndex(x => x.name === fileName);
    if (index <= 0) return "";
    return mappingDataJson[index + 1].url;
}

function showLoading(elementId) {
    var loadingElement = document.getElementById(elementId);
    loadingElement.style.display = "block";
}

function hideLoading(elementId) {
    var loadingElement = document.getElementById(elementId);
    loadingElement.style.setProperty("display", "none", "important");
}

function getClassByValue(value) {
    return value > 0 ? "up" : value < 0 ? "down" : "reference";
}

function showTickerInfor(code) {
    currentTicker = code;
    var loadingHTML = getLoadingHTML();
    $("#btn-modal-action").attr("onclick","refreshTickerDetailData()");
    $("#detailModalLabel").html(code);
    $("#detailModalContent").html(loadingHTML);
    processTickerData(code);
    $("#detailModal").modal('show');
}

function processTickerData(code) {
    var currentDate = new Date();
    var prvDate = new Date();
    prvDate.setMonth(prvDate.getMonth() - 3);
    var toDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    var fromDate = `${prvDate.getFullYear()}-${("0" + (prvDate.getMonth() + 1)).slice(-2)}-${("0" + prvDate.getDate()).slice(-2)}`;

    var RECOMMENDATIONS_URL = encodeURIComponent(`${FIALDA_API_V2_URL}${FIALDA_GET_REPORT_PATH}?fromDate=${fromDate}&toDate=${toDate}&symbols=${code}`);
    var STOCK_INFO_URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_STOCK_INFO_PATH}`);
    Promise.all([
        fetchContentByUrlWithCORSProxy(RECOMMENDATIONS_URL, "GET", ""),
        fetchContentByUrlWithCORSProxy(STOCK_INFO_URL, "POST", [{ symbol: code }])
    ]).then((values) => {
        if (values && values.length > 0) {
            setTimeout(() => {
                var content = drawRecommendationsDataToHTML(values, code);
                $("#detailModalContent").html(content);
            }, 50);
        }
    }).then(() => {
        //console.log('Done fetching content via JavaScript');
    }).catch((err) => {
        console.error(err);
    });
}

function drawRecommendationsDataToHTML(data, code) {
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
                                <h5 class="card-title">${new Intl.NumberFormat().format(lastPrice)} ${valuePercentChange}</h5>
                                <h6>Sàn: ${tickerObject.BasicInfo.exchange}</h6>
                            </div>               
                        </div>
                        <div class="col-md-9">
                            <div class="card-body price-info">
                                <table class="table table-responsive" style="border: none">
                                    <tbody>
                                        <tr>
                                            <td><span class="font-weight-bold">Vốn hóa:</span> ${$.isNumeric(tickerObject.PriceInfo.marketCap) ? new Intl.NumberFormat().format(tickerObject.PriceInfo.marketCap) : "N/A"}</td>    
                                            <td><span class="font-weight-bold">EPS(TTM):</span> ${$.isNumeric(tickerObject.BasicInfo.eps_TTM) ? new Intl.NumberFormat().format(tickerObject.BasicInfo.eps_TTM.toFixed(0)) : "N/A"}</td>
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
                recommendationBody += `<tr><td>${new Date(item.reportDate).toLocaleDateString(locale)}</td><td><b class="top10">${item.reporter}</b></td><td class="text-left">${item.title}</td><td><a href="${FIALDA_ANALYSIS_REPORT_URL}${code}_-_${item.attachment}" target="_blank">Xem báo cáo</a></td></tr>`;
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
                    <button class="nav-link" id="dividend-tab" data-bs-toggle="tab" data-bs-target="#dividend" type="button" role="tab" aria-controls="dividend" aria-selected="false" onclick="loadDividendNews('${code}')">Tin Cổ Tức</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="volatility-tab" data-bs-toggle="tab" data-bs-target="#volatility" type="button" role="tab" aria-controls="volatility" aria-selected="false" onclick="loadVolatilityData('${code}')">Biến động %</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="news-tab" data-bs-toggle="tab" data-bs-target="#news" type="button" role="tab" aria-controls="news" aria-selected="false" onclick="loadNews('${code}')">Tin Doanh Nghiệp</button>
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
}

function getLoadingHTML() {
    return `<div class="d-flex justify-content-center">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="loadingTitle">Đang tải dữ liệu...</span>
            </div>`;
}

function getSelectionFieldsHTML(id) {
    var res = `<select class="form-select form-select-sm" aria-label=".form-select-sm example" id="${id}">
                    <option value="null" selected>Tất cả ngành</option>`;
    fieldsDataGlobal.forEach(field => {
        res += "<option value='" + field.icbCode + "'>" + field.icbName + "</option>";
    })
    res += "</select>";
    return res;
}

function refreshTickerDetailData() {
    var loadingHTML = getLoadingHTML();
    $("#detailModalContent").html(loadingHTML);
    processTickerData(currentTicker);
}

function loadSynthesisData() {
    initSummaryData();
}

function initTooltips() {
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
}

function loadDividendNews(code) {
    $("#dividendContent").html(`</br>${getLoadingHTML()}`);
    var contents = "";
    var FIALDA_STOCK_CASH_DIVIDEND_EVENT_URL = encodeURIComponent(`${FIALDA_API_V2_URL}${FIALDA_STOCK_EVENT_PATH}?typeId=13&symbol=${code}&pageNumber=1&pageSize=1000&sortColumn=exrightDate&isDesc=true`);
    var FIALDA_STOCK_DIVIDEND_EVENT_URL = encodeURIComponent(`${FIALDA_API_V2_URL}${FIALDA_STOCK_EVENT_PATH}?typeId=15&symbol=${code}&pageNumber=1&pageSize=1000&sortColumn=exrightDate&isDesc=true`);
    Promise.all([
        fetchContentByUrlWithCORSProxy(FIALDA_STOCK_CASH_DIVIDEND_EVENT_URL, "GET", ""),
        fetchContentByUrlWithCORSProxy(FIALDA_STOCK_DIVIDEND_EVENT_URL, "GET", "")
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
                    contents += `<tr><td>${i + 1}</td><td>${new Date(item.exrightDate).toLocaleDateString(locale)}</td><td>${new Date(item.recordDate).toLocaleDateString(locale)}</td><td>${new Date(item.issuedDate).toLocaleDateString(locale)}</td><td>${item.eventRatioStr}</td><td class="text-left">${item.eventName}</td></tr>`;
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
                    contents += `<tr><td>${j + 1}</td><td>${new Date(item.exrightDate).toLocaleDateString(locale)}</td><td>${new Date(item.recordDate).toLocaleDateString(locale)}</td><td>${item.eventRatioStr}</td><td>${new Intl.NumberFormat().format(item.eventValue)}</td><td class="text-left">${item.eventName}</td></tr>`;
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
}

function loadVolatilityData(code) {
    $("#volatilityContent").html(`</br>${getLoadingHTML()}`);
    var contents = `<table class="table table-bordered table-responsive">
                            <thead class="table-light">
                                <tr><th colspan="9">% Thay đổi</th></tr>
                                <tr><th>Ngày</th><th>1 Tuần</th><th>2 Tuần</th><th>1 Tháng</th><th>3 Tháng</th><th>6 Tháng</th><th>YTD</th><th>1 Năm</th><th>3 Năm</th></tr>              
                            </thead>
                            <tbody>`;
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_GET_STOCK_INFO_PATH}`);
        $.ajax({
            url: `${CORS_PROXY_URL}/${URL}`,
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
            initTooltips();
        }).fail(function (jqXHR, textStatus, error) {
            $("#volatilityContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

function loadNews(code) {
    var loadingHTML = getLoadingHTML();
    $("#newsContent").html(`</br>${loadingHTML}`);
    setTimeout(() => {
        var URL = encodeURIComponent(`${FIALDA_API_V1_URL}${FIALDA_STOCK_COMPANY_NEWS}?symbol=${code}&pageNumber=1&pageSize=30`);
        var res = "";
        $.ajax({
            url: `${CORS_PROXY_URL}/${URL}`,
            async: false,
            dataType: "json"
        }).done(function (response) {
            if (response && response.result && response.result.items.length > 0) {
                res += `<div class="row">`;
                response.result.items.forEach(item => {
                    res += `<div class="col">
                                    <div class="news-item style-no1 mb-px" onclick="viewArticleDetail(${item.id})" title="${item.title}">
                                        <div class="news-item-image logo blur border-2">
                                            <div style="background-image:url('${IMAGE_NEWS_URL}${item.imageUrl}');"></div>
                                            <div style="background-image:url('${IMAGE_NEWS_URL}${item.imageUrl}');"></div>
                                        </div>
                                        <div class="news-item-content">
                                            <div class="news-item-title ellipse">${item.title}</div>
                                            <div class="des ellipse color2">${item.shortContent}</div>
                                            <div class="flex-row b">
                                                <div class="news-item-more">
                                                    <div class="news-item-soure color2">${item.source}</div>
                                                    <div class="news-item-date color2">
                                                        <i class="ico ico-date color2" style="margin-right: 5px;"></i> ${new Date(item.publishedTime).toLocaleDateString(locale)} 
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
            initTooltips();
        }).fail(function (jqXHR, textStatus, error) {
            $("#newsContent").html("Có lỗi khi tải dữ liệu. Vui lòng thử lại sau!");
        });
    }, 100);
}

function viewArticleDetail(id) {
    window.open(`news.html?id=${id}`, '_blank');
}


$(".filter-title,.filter-title-default").click(function(){
    var $input = $(this);
    var prevElement = $input.prev().find("input");
    if (prevElement.prop( "checked")) {     
        prevElement.prop( "checked", false ).change();
    } else {
        prevElement.prop( "checked", true ).change();
    }
});

function getValueByCandleStickType(value, type) {
    return value.replaceAll("$$", type);
}

function showDisconnectionMessageToast() {
    var disconnectionMessageToast = $("#disconnectionMessageToast");
    if (disconnectionMessageToast.css("display") !== "block") {
        disconnectionMessageToast.toast({
            autohide: false
        }).show(); 
    }
}

function reconnectWS() {
    global.liveboard.Result = -1;
    initWebsocket();
    StartWS();
    hideDisconnectionMessageToast();
}

function hideDisconnectionMessageToast() {
    var disconnectionMessageToast = $("#disconnectionMessageToast");
    disconnectionMessageToast.toast().hide();
}